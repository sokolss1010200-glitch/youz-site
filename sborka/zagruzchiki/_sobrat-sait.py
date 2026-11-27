# Пересобирает страницы сайта на хостинге reg.ru (папка site/) из свежих блоков sborka/zagruzchiki/seo/*.txt.
# Запуск (из корня репозитория, после генераторов — см. .github/workflows/sborka.yml):
#   python3 sborka/zagruzchiki/_sobrat-sait.py .
# Страница перезаписывается, только если поменялось что-то кроме номера коммита в коде (цены, тексты, товары).
# Что делает для каждой страницы seo/<имя>.txt (glavnaya → index):
#   - тело страницы = содержимое блока (картинки с tildacdn скачиваются в site/t/, как при переезде);
#   - title/description/og/canonical — из ../stranicy/seo-stranicy.json, если страница там есть;
#     иначе шапка остаётся как была (инфостраницы, каталог, блог);
#   - новых страниц (их ещё нет в site/) шапку собирает из seo-stranicy.json; без описания — пропускает;
#   - sitemap.xml пересобирается по всем страницам (lastmod = сегодня у изменённых).
# В конце печатает список изменённых файлов site/.
import hashlib, html, json, pathlib, re, subprocess, sys, urllib.request, datetime

HERE = pathlib.Path(__file__).parent
REPO = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else '.').resolve()
SITE = REPO / 'site'
SEO = {p['slug']: p for p in json.load(open(HERE.parent / 'stranicy' / 'seo-stranicy.json'))}
SKIP = {'404', 'yandex_1435fb25a1123af9'}
TCDN = re.compile(r'https://(?:static|thb)\.tildacdn\.(?:com|net)/[^"\'\s)<>]+')
assets = json.load(open(SITE / 't' / 'assets.json'))

def local(url):
    if url not in assets:
        name = url.split('?')[0].rstrip('/').split('/')[-1]
        fn = hashlib.md5(url.encode()).hexdigest()[:8] + '-' + name
        p = SITE / 't' / fn
        if not p.exists():
            p.write_bytes(urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'}), timeout=60).read())
        assets[url] = '/t/' + fn
    return assets[url]

def localize(body):
    ABS = lambda m: 'https://youz.store' + local(m.group(0))
    body = re.sub(r'(<script type="application/ld\+json">)(.*?)(</script>)',
                  lambda m: m.group(1) + TCDN.sub(ABS, m.group(2)) + m.group(3), body, flags=re.S)
    return TCDN.sub(lambda m: local(m.group(0)), body)

def meta_block(slug, title, descr, og_image=None):
    url = 'https://youz.store/' + ('' if slug == 'index' else slug)
    e = lambda s: html.escape(s, quote=True)
    m = (f'<title>{e(title)}</title> <meta name="description" content="{e(descr)}" /> '
         f'<meta property="og:url" content="{url}" /> <meta property="og:title" content="{e(title)}" /> '
         f'<meta property="og:description" content="{e(descr)}" /> <meta property="og:type" content="website" /> ')
    if og_image:
        m += f'<meta property="og:image" content="{og_image}" /> '
    return m + f'<link rel="canonical" href="{url}">'

TEMPLATE = (SITE / 'iphone-18-pro.html').read_text(encoding='utf-8')
HEAD_RE = re.compile(r'(<meta name="viewport"[^>]*>\n)(.*?)(\n<meta name="format-detection")', re.S)
BODY_RE = re.compile(r'(<body>\n)(.*?)(\n<!-- Yandex\.Metrika)', re.S)

changed, new, skipped = [], [], []
# Раз в неделю (понедельник) и при ручном запуске (YZ_FULL=1) перезаписываем все страницы, чтобы в них обновился
# снимок кода (коммит S в загрузчике): он нужен, если у посетителя не отвечает GitHub API.
import os
FULL = os.environ.get('YZ_FULL') == '1' or datetime.datetime.utcnow().weekday() == 0
for f in sorted((HERE / 'seo').glob('*.txt')):
    slug = 'index' if f.stem == 'glavnaya' else f.stem
    if slug in SKIP:
        continue
    out = SITE / (slug + '.html')
    body = localize(f.read_text(encoding='utf-8').strip())
    if out.exists():
        page = out.read_text(encoding='utf-8')
    elif slug in SEO:
        page = TEMPLATE
        new.append(slug)
    else:
        skipped.append(slug); continue
    page2 = BODY_RE.sub(lambda m: m.group(1) + body + m.group(3), page, count=1)
    if slug in SEO:
        og = re.search(r'<meta property="og:image" content="([^"]+)"', page if slug not in new else (SITE / 'index.html').read_text(encoding='utf-8'))
        page2 = HEAD_RE.sub(lambda m: m.group(1) + meta_block(slug, SEO[slug]['title'], SEO[slug]['descr'],
                                                              og.group(1) if og else None) + m.group(3), page2, count=1)
    norm = lambda t: re.sub(r'[0-9a-f]{7,40}', '', re.sub(r'\s+', ' ', t))  # без хешей коммитов и переносов
    if slug in new or FULL or norm(page2) != norm(page):
        out.write_text(page2, encoding='utf-8')
        changed.append(slug)

json.dump(assets, open(SITE / 't' / 'assets.json', 'w'), indent=1)

# sitemap: все страницы, lastmod — из старой карты, у изменённых сегодня
old = dict(re.findall(r'<loc>https://youz\.store/?([^<]*)</loc>\s*<lastmod>([^<]+)</lastmod>', (SITE / 'sitemap.xml').read_text()))
now = datetime.datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%S+00:00')
slugs = sorted(p.stem for p in SITE.glob('*.html') if p.stem not in SKIP)
rows = []
for s in slugs:
    loc = '' if s == 'index' else s
    lm = now if s in changed else old.get(loc, now)
    rows.append(f'\t<url>\n\t\t<loc>https://youz.store/{loc}</loc>\n\t\t<lastmod>{lm}</lastmod>\n\t</url>')
(SITE / 'sitemap.xml').write_text('<?xml version="1.0" encoding="UTF-8"?>\n'
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + '\n'.join(rows) + '\n</urlset>\n')

st = subprocess.run(['git', '-C', str(REPO), 'status', '--short', '--', 'site'], capture_output=True, text=True).stdout
files = [l[3:] for l in st.splitlines()]
print('страниц обновлено:', len(changed), '| новых:', len(new), new, '| без описания (пропущены):', skipped)
print('файлов site/ к заливке в main:', len(files))
for x in files:
    print(' ', x)
