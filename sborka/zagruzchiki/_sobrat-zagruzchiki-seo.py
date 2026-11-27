# Собирает блоки T123 «с готовым текстом» для поисковиков.  Запуск: python3 _sobrat-zagruzchiki-seo.py <папка-клона-youz-site>
# Отличие от _sobrat-zagruzchiki.py: HTML страницы лежит прямо в блоке (робот Яндекса видит текст без скриптов).
# Блок помнит коммит S, из которого взят текст. При открытии страницы загрузчик узнаёт последний коммит main:
#   совпадает с S  → просто запускает youz.js этого коммита (страница уже на месте, ничего не мигает);
#   новее          → берёт свежий HTML страницы; если он отличается от вставленного (сверка по хешу H) — подменяет,
#                    иначе только подключает свежие стили и youz.js (ежедневный коммит прайса текст не «старит»);
#   GitHub API недоступен → остаётся на S (а не на устаревшем @main).
# После крупных правок текста — пересобрать и заново вставить блоки в Тильду, чтобы поисковик видел свежий текст.
import pathlib, subprocess, sys
sys.path.insert(0, str(pathlib.Path(__file__).parent))

HERE = pathlib.Path(__file__).parent
OUT = HERE / 'seo'
REPO = 'sokolss1010200-glitch/youz-site'
SRC = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else '.')

src = (HERE / '_sobrat-zagruzchiki.py').read_text(encoding='utf-8')
PAGES = {}
exec(src.split('TPL =')[0], {'pathlib': pathlib, '__file__': str(HERE / '_sobrat-zagruzchiki.py')}, ns := {})
PAGES = ns['PAGES']

SHA = subprocess.check_output(['git', '-C', str(SRC), 'rev-parse', 'HEAD'], text=True).strip()

TPL = """<!-- ЮZ: страница «{name}» с готовым текстом для поисковиков (снимок коммита {s7}). Код сайта: github.com/{repo} -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preconnect" href="https://cdn.jsdelivr.net">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Unbounded:wght@500;700;800&family=Onest:wght@400;500;600;700&display=swap">
<link id="yz-css0" rel="stylesheet" href="https://cdn.jsdelivr.net/gh/{repo}@{sha}/youz.css?v={s7}">
{ld}<div id="yz-root">
{html}
</div>
<script>
(function(){{{model}var R='{repo}',P='{page}',K='yz-ref',S='{sha}',H={h};
function hs(t){{var h=0;for(var i=0;i<t.length;i++)h=(Math.imul(h,31)+t.charCodeAt(i))>>>0;return h}}
function js(B,q){{window.YZ_BASE=B;var s=document.createElement('script');s.src=B+'youz.js'+q;document.body.appendChild(s)}}
function go(ref){{var B='https://cdn.jsdelivr.net/gh/'+R+'@'+ref+'/',q='?v='+ref.slice(0,7);
if(ref===S)return js(B,q);
var css=new Promise(function(ok){{var l=document.createElement('link');l.rel='stylesheet';l.href=B+'youz.css'+q;l.onload=l.onerror=ok;document.head.appendChild(l)}});
Promise.all([fetch(B+P+q).then(function(r){{if(!r.ok)throw r.status;return r.text()}}),css]).then(function(a){{
if(hs(a[0])!==H)document.getElementById('yz-root').innerHTML=a[0];var o=document.getElementById('yz-css0');if(o)o.remove();js(B,q)}})
.catch(function(){{go(S)}})}}
var c;try{{c=JSON.parse(sessionStorage.getItem(K))}}catch(e){{}}
if(c&&c.r&&Date.now()-c.t<300000)return go(c.r);
fetch('https://api.github.com/repos/'+R+'/commits/main',{{headers:{{Accept:'application/vnd.github.sha'}}}})
.then(function(r){{if(!r.ok)throw 0;return r.text()}}).then(function(t){{t=t.trim();if(!/^[0-9a-f]{{40}}$/.test(t))throw 0;
try{{sessionStorage.setItem(K,JSON.stringify({{r:t,t:Date.now()}}))}}catch(e){{}}go(t)}})
.catch(function(){{go(S)}});
}})();
</script>
"""

OUT.mkdir(exist_ok=True)
import json
OPIS = json.loads((HERE / 'model-opisaniya.json').read_text(encoding='utf-8'))
def hs(t):
    h = 0
    b = t.encode('utf-16-le')
    for i in range(0, len(b), 2):
        h = (h * 31 + int.from_bytes(b[i:i+2], 'little')) & 0xffffffff
    return h
def nm(slug):
    return {'iphone-duo': 'iPhone Duo', 'iphone-air': 'iPhone Air'}.get(slug) or slug.replace('iphone', 'iPhone').replace('-pro', ' Pro').replace('-max', ' Max').replace('-', ' ')
import html as _h, re as _re
STORE = {
    "@context": "https://schema.org", "@type": "ElectronicsStore", "@id": "https://youz.store/#store",
    "name": "ЮZ Store", "url": "https://youz.store", "telephone": "+7 (3467) 36-24-04",
    "image": "https://static.tildacdn.com/tila3739-3731-4033-a132-373738613036/iphone-18-pro-burgun.webp",
    "address": {"@type": "PostalAddress", "streetAddress": "ул. Комсомольская, 49", "addressLocality": "Ханты-Мансийск",
                "addressRegion": "Ханты-Мансийский автономный округ — Югра", "addressCountry": "RU"},
    "openingHoursSpecification": [
        {"@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], "opens": "10:00", "closes": "20:00"},
        {"@type": "OpeningHoursSpecification", "dayOfWeek": ["Saturday", "Sunday"], "opens": "10:00", "closes": "18:00"}],
    "sameAs": ["https://yandex.ru/maps/org/yuz/103143665209/", "https://2gis.ru/kh_mansiysk/firm/70000001042751106",
               "https://vk.com/youz.ru_hm", "https://t.me/uzstorehm"]}
def txt(x):
    return _re.sub(r'\s+', ' ', _h.unescape(_re.sub(r'<[^>]+>', ' ', x))).strip()
def ld_for(html_text):
    out = [STORE]
    qa = _re.findall(r'<details[^>]*>\s*<summary>(.*?)</summary>(.*?)</details>', html_text, _re.S)
    qa = [(txt(q), txt(a)) for q, a in qa if txt(q) and txt(a)]
    if qa:
        out.append({"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
            {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in qa]})
    return ''.join('<script type="application/ld+json">%s</script>\n' % json.dumps(o, ensure_ascii=False).replace('</', '<\\/') for o in out)
for name, (page, model) in PAGES.items():
    if not (SRC / page).exists():  # страница ещё не залита в репозиторий
        print('нет файла', page); continue
    raw = (SRC / page).read_text(encoding='utf-8')
    html = raw.strip()
    if model and model in OPIS:  # страница модели: до загрузки цен робот видит заголовок и описание
        pre = '<div id="yzModel"><section class="wrap" style="padding:32px 0"><h1>%s в Ханты-Мансийске</h1><p>%s</p></section></div>' % (nm(model), OPIS[model])
        assert html.count('<div id="yzModel"></div>') == 1
        html = html.replace('<div id="yzModel"></div>', pre)
    m = "window.YZ_MODEL='%s';" % model if model else ''
    t = TPL.format(name=name, repo=REPO, page=page, model=m, sha=SHA, s7=SHA[:7], html=html, h=hs(raw), ld=ld_for(raw))
    (OUT / (name + '.txt')).write_text(t, encoding='utf-8')
    print('ok', name, len(t))
print('commit', SHA)
