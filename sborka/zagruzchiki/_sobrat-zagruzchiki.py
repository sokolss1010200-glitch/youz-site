# Собирает загрузчики для блоков T123 в Тильде.  Запуск: python3 _sobrat-zagruzchiki.py
# Загрузчик узнаёт последний коммит ветки main через GitHub API и берёт youz.css, страницу и youz.js
# с jsDelivr именно по этому коммиту — такие адреса не устаревают (в отличие от @main, который jsDelivr кеширует до 12 ч).
# Коммит запоминается в sessionStorage на 5 минут. Если GitHub API недоступен — грузится @main.
import pathlib

HERE = pathlib.Path(__file__).parent
REPO = 'sokolss1010200-glitch/youz-site'

PAGES = {  # файл загрузчика: (страница из репозитория, модель или None)
    'glavnaya': ('main.html', None),
    'catalog': ('catalog.html', None),
    'model': ('model.html', None),
    'iphone-18-pro': ('model.html', 'iphone-18-pro'),
    'iphone-18-pro-max': ('model.html', 'iphone-18-pro-max'),
    'iphone-duo': ('model.html', 'iphone-duo'),
    'iphone-17': ('model.html', 'iphone-17'),
    'iphone-17-pro': ('model.html', 'iphone-17-pro'),
    'iphone-17-pro-max': ('model.html', 'iphone-17-pro-max'),
    'iphone-air': ('model.html', 'iphone-air'),
}
# Инфостраницы и блог (собираются в ../stranicy/_sobrat-stranicy.py → pages/<адрес>.html)
for _s in ['o-magazine', 'garantiya', 'rassrochka', 'trade-in', 'remont', 'dostavka', 'otzyvy', 'kontakty', 'blog',
           'blog-kak-proverit-iphone', 'blog-trade-in-ili-avito', 'blog-perenos-dannyh',
           'politika', 'soglasie', 'blog-iphone-18-pro-obzor', 'blog-iphone-18-pro-ili-17-pro', 'blog-iphone-duo-obzor', 'blog-iphone-18-pro-ili-pro-max',
           'blog-kak-vybrat-airpods', 'blog-apple-watch-kak-vybrat', 'blog-dyson-kak-vybrat', 'blog-skolko-pamyati-iphone', 'blog-esim-ili-sim', 'blog-akkumulyator-iphone',
           'zamena-ekrana-iphone', 'zamena-akkumulyatora-iphone', 'remont-iphone-posle-vody']:
    PAGES[_s] = ('pages/%s.html' % _s, None)
# Все статьи блога из ../stranicy/stati.json (новая статья подхватывается сама)
import json as _json
for _a in _json.loads((HERE.parent / 'stranicy' / 'stati.json').read_text(encoding='utf-8')):
    PAGES.setdefault(_a['slug'], ('pages/%s.html' % _a['slug'], None))

TPL = """<!-- ЮZ: загрузчик «{name}». Код сайта: github.com/{repo} (файлы с jsDelivr по последнему коммиту main) -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preconnect" href="https://cdn.jsdelivr.net">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Unbounded:wght@500;700;800&family=Onest:wght@400;500;600;700&display=swap">
<div id="yz-root"></div>
<script>
(function(){{{model}var R='{repo}',P='{page}',K='yz-ref';
function go(ref){{var B='https://cdn.jsdelivr.net/gh/'+R+'@'+ref+'/',q='?v='+ref.slice(0,7);window.YZ_BASE=B;
var css=new Promise(function(ok){{var l=document.createElement('link');l.rel='stylesheet';l.href=B+'youz.css'+q;l.onload=l.onerror=ok;document.head.appendChild(l)}});
Promise.all([fetch(B+P+q).then(function(r){{if(!r.ok)throw r.status;return r.text()}}),css]).then(function(a){{
document.getElementById('yz-root').innerHTML=a[0];var s=document.createElement('script');s.src=B+'youz.js'+q;document.body.appendChild(s)}})
.catch(function(){{if(ref!=='main')go('main')}})}}
var c;try{{c=JSON.parse(sessionStorage.getItem(K))}}catch(e){{}}
if(c&&c.r&&Date.now()-c.t<300000)return go(c.r);
fetch('https://api.github.com/repos/'+R+'/commits/main',{{headers:{{Accept:'application/vnd.github.sha'}}}})
.then(function(r){{if(!r.ok)throw 0;return r.text()}}).then(function(t){{t=t.trim();if(!/^[0-9a-f]{{40}}$/.test(t))throw 0;
try{{sessionStorage.setItem(K,JSON.stringify({{r:t,t:Date.now()}}))}}catch(e){{}}go(t)}})
.catch(function(){{go('main')}});
}})();
</script>
"""

for name, (page, model) in PAGES.items():
    m = "window.YZ_MODEL='%s';" % model if model else ''
    (HERE / (name + '.txt')).write_text(TPL.format(name=name, repo=REPO, page=page, model=m), encoding='utf-8')
    print('ok', name)
