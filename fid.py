# Товарный фид для Яндекса (YML) из снимка прайса data/products.csv -> data/feed.yml.
# Запускается GitHub Actions вместе со снимком в 13:00 МСК (.github/workflows/fid.yml).
# Фото берутся так же, как на сайте: столбец «Фото», замены PHOTO_FIX и запасные PHOTO_EXTRA из youz.js.
# Ссылка товара ведёт на карточку с уже выбранной памятью/опцией/цветом (цена на странице = цена в фиде).
import csv, hashlib, html, json, re, datetime, urllib.parse

SITE = 'https://youz.store'
IMGBASE = 'https://cdn.jsdelivr.net/gh/sokolss1010200-glitch/youz-site@main/'
JS = open('youz.js', encoding='utf-8').read()

def obj(name):
    m = re.search(r'const ' + name + r'\s*=\s*(\{.*?\});', JS, re.S)
    if not m:
        return {}
    t = m.group(1).replace('YZB+"', '"' + IMGBASE)
    t = re.sub(r',\s*}', '}', t)
    return json.loads(t)

PHOTO_FIX, PHOTO_EXTRA = obj('PHOTO_FIX'), obj('PHOTO_EXTRA')
IMG = obj('IMG')
# слаги отдельных страниц моделей (MODELS[...].slug)
SLUGS = dict(re.findall(r"'([^']+)'\s*:\s*\{\s*slug\s*:\s*'([a-z0-9-]+)'", JS))

def photo(u, model, col):
    m = re.search(r'(yz-a\d{3})', u or '')
    if m and m.group(1) in PHOTO_FIX:
        return PHOTO_FIX[m.group(1)]
    if u and not u.startswith('http'):
        u = IMG.get(u, '')
    return u or PHOTO_EXTRA.get(model + '|' + col) or PHOTO_EXTRA.get(model + '|') or ''

def num(x):
    x = re.sub(r'[^\d]', '', x or '')
    return int(x) if x else 0

VENDORS = ['Apple', 'Samsung', 'Dyson', 'Xiaomi', 'Google', 'Sony', 'Nintendo', 'JBL', 'Marshall', 'GoPro', 'DJI',
           'Ray-Ban', 'Honor', 'Huawei', 'OnePlus', 'Nothing', 'Realme', 'Poco', 'Garmin', 'Яндекс', 'LEGO', 'Insta360']
def vendor(model, cat):
    for rx, v in ((r'(iphone|ipad|imac|mac|airpods|apple)', 'Apple'), (r'galaxy', 'Samsung'), (r'pixel', 'Google'),
                  (r'(playstation|ps5|dualsense)', 'Sony'), (r'xbox', 'Microsoft'), (r'(redmi|poco)', 'Xiaomi')):
        if re.match(rx, model, re.I):
            return v
    for v in VENDORS:
        if model.lower().startswith(v.lower()):
            return v
    if cat in ('Mac', 'iPad', 'iPhone', 'Apple Watch', 'AirPods'):
        return 'Apple'
    return model.split()[0]

rows = list(csv.DictReader(open('data/products.csv', encoding='utf-8-sig')))
cats, offers, seen = {}, [], set()
for r in rows:
    model = (r.get('Модель') or '').strip()
    price = num(r.get('Цена'))
    stock = (r.get('Наличие') or 'да').strip().lower()
    if not model or not price or stock == 'нет':
        continue
    cat = (r.get('Категория') or 'Другое').strip()
    mem, opt, col = (r.get('Память') or '').strip(), (r.get('Опция') or '').strip(), (r.get('Цвет') or '').strip()
    key = '|'.join([model, mem, opt, col])
    if key in seen:
        continue
    seen.add(key)
    pic = photo((r.get('Фото') or '').strip(), model, col)
    if not pic:
        continue  # Яндекс не принимает товары без фото
    cats.setdefault(cat, len(cats) + 1)
    q = {k: v for k, v in (('mem', mem), ('opt', opt), ('c', col)) if v}
    if model in SLUGS:
        url = SITE + '/' + SLUGS[model] + '?' + urllib.parse.urlencode(q)
    else:
        q = {'m': re.sub(r'[^a-z0-9а-я]+', '-', model.lower()), **q}
        url = SITE + '/model?' + urllib.parse.urlencode(q)
    name = ' '.join(x for x in (model, mem, opt, col) if x)
    old = num(r.get('Старая цена'))
    offers.append(dict(id=hashlib.md5(key.encode()).hexdigest()[:12], cat=cats[cat], url=url, price=price,
                       old=old if old > price else 0, pic=pic, name=name, vendor=vendor(model, cat), model=model))

e = lambda s: html.escape(str(s), quote=True)
now = datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=3))).strftime('%Y-%m-%dT%H:%M:%S+03:00')
out = ['<?xml version="1.0" encoding="UTF-8"?>', '<yml_catalog date="%s">' % now, '<shop>',
       '<name>ЮZ Store</name>', '<company>ЮZ Store</company>', '<url>%s</url>' % SITE,
       '<currencies><currency id="RUR" rate="1"/></currencies>', '<categories>']
out += ['<category id="%d">%s</category>' % (i, e(c)) for c, i in cats.items()]
out += ['</categories>', '<offers>']
for o in offers:
    out.append('<offer id="%s" available="true">' % o['id'])
    out.append('<url>%s</url><price>%d</price>' % (e(o['url']), o['price']))
    if o['old']:
        out.append('<oldprice>%d</oldprice>' % o['old'])
    out.append('<currencyId>RUR</currencyId><categoryId>%d</categoryId><picture>%s</picture>' % (o['cat'], e(o['pic'])))
    out.append('<store>true</store><pickup>true</pickup><delivery>true</delivery>')
    out.append('<name>%s</name><vendor>%s</vendor>' % (e(o['name']), e(o['vendor'])))
    out.append('<description>%s — новый, оригинал, гарантия 12 месяцев. Магазин ЮZ, Ханты-Мансийск, Комсомольская, 49. '
               'Рассрочка, trade-in.</description>' % e(o['name']))
    out.append('</offer>')
out += ['</offers>', '</shop>', '</yml_catalog>']
open('data/feed.yml', 'w', encoding='utf-8').write('\n'.join(out) + '\n')
print('товаров в фиде:', len(offers), 'из строк:', len(rows), 'категорий:', len(cats))
