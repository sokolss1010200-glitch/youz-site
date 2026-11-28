# Товары для ВКонтакте: линейка iPhone 17 и 18 — карточка-картинка на каждый цвет и YML-фид site/vk-feed.xml.
# Запуск: python3 sborka/vk/_sobrat-vk.py <папка клона youz-site> [--img]
#   --img   — перерисовать картинки site/vk/*.jpg (нужен Pillow; делается локально, когда меняется линейка или цвета).
#   без --img — только фид (цены из data/products.csv; картинки берутся готовые, если нет — фото с сайта).
# Карточка по правилам Маркета ВК: только фото телефона на белом фоне — без текста, плашек, цветов и адреса сайта
# (иначе ВК отклоняет товар как «коллаж / картинка с контактами»).
import csv, collections, hashlib, html, re, sys, pathlib, datetime, urllib.request, io

REPO = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else '.')
SITE = REPO / 'site'
OUT = SITE / 'vk'
FONT = pathlib.Path(__file__).with_name('Onest.ttf')
LINE = ['iPhone 18 Pro Max', 'iPhone 18 Pro', 'iPhone 17 Pro Max', 'iPhone 17 Pro', 'iPhone Air', 'iPhone 17', 'iPhone 17e']

def num(x):
    x = re.sub(r'[^\d]', '', x or '')
    return int(x) if x else 0
def slug(t):
    return re.sub(r'[^a-z0-9]+', '-', t.lower()).strip('-')
def memkey(m):
    mm = re.match(r'(\d+)\s*(ГБ|ТБ)', m)
    return int(mm.group(1)) * (1024 if mm and mm.group(2) == 'ТБ' else 1) if mm else 0

rows = [r for r in csv.DictReader(open(REPO / 'data/products.csv', encoding='utf-8'))
        if r['Модель'] in LINE and num(r['Цена']) and r['Наличие'].strip().lower() != 'нет']
HI = {}  # большое прозрачное фото, как на сайте (img/yz-hNNN.webp)
M = collections.OrderedDict((m, {'cols': collections.OrderedDict(), 'mem': set(), 'v': {}}) for m in LINE)
for r in rows:
    m = M[r['Модель']]; col = r['Цвет'].strip(); mem = r['Память'].strip(); p = num(r['Цена'])
    m['cols'].setdefault(col, r['Код цвета'].strip() or '#C9CBC3'); m['mem'].add(mem)
    hi = re.search(r'yz-a(\d{3})', r['Фото'] or '')
    if hi and (REPO / 'img' / ('yz-h%s.webp' % hi.group(1))).exists():
        HI.setdefault((r['Модель'], col), REPO / 'img' / ('yz-h%s.webp' % hi.group(1)))
    k = (mem, col)
    if k not in m['v'] or p < m['v'][k][0]:
        m['v'][k] = (p, r['Опция'].strip())
M = collections.OrderedDict((k, v) for k, v in M.items() if v['v'])

# фото цвета — из фида сайта (там уже наши копии картинок)
feed = (SITE / 'feed.xml').read_text(encoding='utf-8')
PH, URL = {}, {}
for o in re.finditer(r'<offer .*?</offer>', feed, re.S):
    b = o.group(0); name = html.unescape(re.search(r'<name>(.*?)</name>', b).group(1))
    for m in M:
        if name.startswith(m + ' ') and not any(name.startswith(x + ' ') for x in M if len(x) > len(m) and x.startswith(m)):
            for col in M[m]['cols']:
                if name.endswith(' ' + col):
                    PH.setdefault((m, col), re.search(r'<picture>(.*?)</picture>', b).group(1))
                    URL.setdefault(m, html.unescape(re.search(r'<url>(.*?)</url>', b).group(1)).split('?')[0])

def one_phone(im, model):
    """Из картинки «спина + экран» оставить один телефон."""
    import numpy as np
    from PIL import ImageDraw
    a = np.array(im)[:, :, 3] > 40; h, w = a.shape
    if 'Pro' in model or model == 'iPhone 17e':
        g = np.array(im.convert('L'), dtype=float)
        d = np.abs(np.diff(g[int(h * .15):int(h * .85)], axis=1)).sum(0)
        lo, hi = ((.45, .75) if 'Pro' in model else (.2, .5))
        x = int(w * lo) + int(np.argmax(d[int(w * lo):int(w * hi)])) + 1
        top = np.array([np.argmax(a[:, i]) if a[:, i].any() else h for i in range(w)])
        if 'Pro' in model:
            r = int(np.argmax(top <= top.min() + 1)); one = im.crop((0, 0, x, h))
        else:
            r = int(np.argmax(top[::-1] <= top.min() + 1)); one = im.crop((x, 0, w, h))
        mw, mh = one.size; mk = Image.new('L', (mw, mh), 0)
        ImageDraw.Draw(mk).rounded_rectangle([0, 0, mw - 1, mh - 1], radius=max(r, 8), fill=255)
        one.putalpha(Image.fromarray(np.minimum(np.array(one)[:, :, 3], np.array(mk))))
    else:  # iPhone 17, Air: экран справа, сверху; граница — где у верхнего/нижнего края просвет между углами
        top = np.array([np.argmax(a[:, i]) if a[:, i].any() else h for i in range(w)])
        bot = np.array([h - 1 - np.argmax(a[::-1, i]) if a[:, i].any() else 0 for i in range(w)])
        gp = top + (h - 1 - bot); lo, hi = ((.20, .55) if 'Air' in model else (.15, .55))
        x = int(w * lo) + int(np.argmax(gp[int(w * lo):int(w * hi)])); one = im.crop((x, 0, w, h))
    return one.crop(one.getbbox())

NEW_ID = {l.strip() for l in (pathlib.Path(__file__).with_name('vk-novye-id.txt')).read_text(encoding='utf-8').splitlines()
          if l.strip() and not l.startswith('#')}

def card_name(m, col):
    return '%s-%s-odin.jpg' % (slug(m), slug(col))

if '--img' in sys.argv:
    from PIL import Image, ImageDraw, ImageFont, ImageFilter
    OUT.mkdir(exist_ok=True)
    def font(sz, w='Medium'):
        f = ImageFont.truetype(str(FONT), sz); f.set_variation_by_name(w); return f
    W = H = 1080
    for m, d in M.items():
        mems = sorted(d['mem'], key=memkey)
        for col, hexc in d['cols'].items():
            src = PH.get((m, col))
            if (m, col) in HI:
                ph = Image.open(HI[(m, col)]).convert('RGBA')
            elif src:
                raw = urllib.request.urlopen(urllib.request.Request(src, headers={'User-Agent': 'Mozilla/5.0'}), timeout=60).read()
                ph = Image.open(io.BytesIO(raw)).convert('RGBA')
            else:
                print('нет фото', m, col); continue
            bb = ph.getbbox()
            if bb: ph = ph.crop(bb)
            ph = one_phone(ph, m)
            im = Image.new('RGB', (W, H), '#FFFFFF')
            box = 940
            k = min(box / ph.width, box / ph.height); ph = ph.resize((int(ph.width * k), int(ph.height * k)), Image.LANCZOS)
            sh = Image.new('RGBA', ph.size, (0, 0, 0, 0)); sh.putalpha(ph.split()[3].point(lambda a: int(a * 0.14)))
            sh = sh.filter(ImageFilter.GaussianBlur(16))
            px = int((W - ph.width) / 2); py = int((H - ph.height) / 2)
            im.paste((0, 0, 0), (px + 4, py + 12), sh); im.paste(ph, (px, py), ph)
            im.save(OUT / card_name(m, col), 'JPEG', quality=88, optimize=True)
            print('картинка', card_name(m, col))

# YML для ВКонтакте: товар = модель + память + цвет (минимальная цена по SIM), объединены по модели (group_id)
CAT = {m: i + 1 for i, m in enumerate(M)}
out = ['<?xml version="1.0" encoding="UTF-8"?>',
       '<yml_catalog date="%s">' % datetime.datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%S+00:00'),
       '<shop><name>ЮZ Store</name><company>ЮZ Store</company><url>https://youz.store</url>',
       '<currencies><currency id="RUR" rate="1"/></currencies><categories><category id="1">Смартфоны</category></categories><offers>']
n = 0
for gi, (m, d) in enumerate(M.items(), 1):
    for (mem, col), (p, opt) in sorted(d['v'].items(), key=lambda kv: (list(d['cols']).index(kv[0][1]), memkey(kv[0][0]))):
        salt = 'vk2|' if '%s %s %s' % (m, mem, col) in NEW_ID else 'vk|'
        oid = int(hashlib.md5((salt + '%s|%s|%s' % (m, mem, col)).encode()).hexdigest()[:10], 16) % 10**9
        img = ('https://youz.store/vk/' + card_name(m, col)) if (OUT / card_name(m, col)).exists() else PH.get((m, col), '')
        url = URL.get(m, 'https://youz.store/catalog') + '?' + 'mem=%s&c=%s' % (mem.replace(' ', '+'), col.replace(' ', '+'))
        sims = sorted({r['Опция'].strip() for r in rows if r['Модель'] == m and r['Память'].strip() == mem and r['Цвет'].strip() == col})
        descr = ('%s %s, цвет %s — новый, оригинал, гарантия магазина 12 месяцев. Варианты SIM: %s. '
                 'Магазин ЮZ, Ханты-Мансийск, Комсомольская, 49. Рассрочка до 36 месяцев, trade-in, доставка по городу в день заказа, '
                 'в другие города — СДЭК.') % (m, mem, col, ', '.join(sims))
        out.append('<offer id="%d" group_id="%d" available="true"><url>%s</url><price>%d</price><currencyId>RUR</currencyId>'
                   '<categoryId>1</categoryId><picture>%s</picture><name>%s</name><vendor>Apple</vendor>'
                   '<description>%s</description><param name="Цвет">%s</param><param name="Память">%s</param></offer>' % (
                       oid, gi, html.escape(url), p, html.escape(img), html.escape('%s %s %s' % (m, mem, col)), html.escape(descr),
                       html.escape(col), html.escape(mem)))
        n += 1
out.append('</offers></shop></yml_catalog>')
(SITE / 'vk-feed.xml').write_text('\n'.join(out) + '\n', encoding='utf-8')
print('фид ВК: моделей', len(M), 'товаров', n)
