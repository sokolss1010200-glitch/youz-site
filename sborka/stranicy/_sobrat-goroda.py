# Страницы «Купить iPhone в <город/посёлок ХМАО>» с доставкой из магазина в Ханты-Мансийске + общая страница /dostavka-hmao.
# Запуск:  python3 _sobrat-goroda.py <папка клона youz-site>   (после _sobrat-seo-kategorii-modeli.py — он перезаписывает seo-stranicy.json)
# Что делает:
#   1) pages/<адрес>.html — страница населённого пункта (основа — pages/dostavka.html: шапка, подвал, «Популярные запросы»);
#   2) pages/dostavka-hmao.html — все города и посёлки округа по районам со ссылками;
#   3) ../zagruzchiki/seo/<адрес>.txt — блоки T123 с готовым текстом (разметка ElectronicsStore + BreadcrumbList + FAQPage);
#   4) дописывает страницы в seo-stranicy.json (kind = city) — заголовки и описания для Тильды.
# Цены берутся из снимка data/products.csv. Факты о доставке — только те, что есть на странице /dostavka.
import csv, json, pathlib, re, sys, html as H

REPO = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else '.')
HERE = pathlib.Path(__file__).parent
ZAG = HERE.parent / 'zagruzchiki'

src = (ZAG / '_sobrat-zagruzchiki-seo.py').read_text(encoding='utf-8')
head = src.split('for name, (page, model) in PAGES.items():')[0]
ns = {'__file__': str(ZAG / '_sobrat-zagruzchiki-seo.py')}
_argv = sys.argv; sys.argv = [sys.argv[0], str(REPO)]
exec(compile(head, 'seo-head', 'exec'), ns)
sys.argv = _argv
TPL, hs, STORE, SHA, REPO_NAME = ns['TPL'], ns['hs'], ns['STORE'], ns['SHA'], ns['REPO']

# --- населённые пункты: (именительный, где — «в …», откуда — «из …», куда — «в …», район) ---
# район None — город окружного значения
T = [
    ('Сургут', 'в Сургуте', 'из Сургута', 'в Сургут', None),
    ('Нижневартовск', 'в Нижневартовске', 'из Нижневартовска', 'в Нижневартовск', None),
    ('Нефтеюганск', 'в Нефтеюганске', 'из Нефтеюганска', 'в Нефтеюганск', None),
    ('Нягань', 'в Нягани', 'из Нягани', 'в Нягань', None),
    ('Когалым', 'в Когалыме', 'из Когалыма', 'в Когалым', None),
    ('Мегион', 'в Мегионе', 'из Мегиона', 'в Мегион', None),
    ('Урай', 'в Урае', 'из Урая', 'в Урай', None),
    ('Лангепас', 'в Лангепасе', 'из Лангепаса', 'в Лангепас', None),
    ('Пыть-Ях', 'в Пыть-Яхе', 'из Пыть-Яха', 'в Пыть-Ях', None),
    ('Радужный', 'в Радужном', 'из Радужного', 'в Радужный', None),
    ('Югорск', 'в Югорске', 'из Югорска', 'в Югорск', None),
    ('Покачи', 'в Покачах', 'из Покачей', 'в Покачи', None),
    ('Высокий', 'в Высоком', 'из Высокого', 'в Высокий', None),
    # Ханты-Мансийский район
    ('Горноправдинск', 'в Горноправдинске', 'из Горноправдинска', 'в Горноправдинск', 'Ханты-Мансийский'),
    ('Луговской', 'в Луговском', 'из Луговского', 'в Луговской', 'Ханты-Мансийский'),
    ('Кедровый', 'в Кедровом', 'из Кедрового', 'в Кедровый', 'Ханты-Мансийский'),
    ('Красноленинский', 'в Красноленинском', 'из Красноленинского', 'в Красноленинский', 'Ханты-Мансийский'),
    ('Сибирский', 'в Сибирском', 'из Сибирского', 'в Сибирский', 'Ханты-Мансийский'),
    ('Цингалы', 'в Цингалах', 'из Цингал', 'в Цингалы', 'Ханты-Мансийский'),
    ('Шапша', 'в Шапше', 'из Шапши', 'в Шапшу', 'Ханты-Мансийский'),
    ('Выкатной', 'в Выкатном', 'из Выкатного', 'в Выкатной', 'Ханты-Мансийский'),
    ('Селиярово', 'в Селиярово', 'из Селиярово', 'в Селиярово', 'Ханты-Мансийский'),
    ('Бобровский', 'в Бобровском', 'из Бобровского', 'в Бобровский', 'Ханты-Мансийский'),
    ('Нялинское', 'в Нялинском', 'из Нялинского', 'в Нялинское', 'Ханты-Мансийский'),
    ('Кышик', 'в Кышике', 'из Кышика', 'в Кышик', 'Ханты-Мансийский'),
    ('Согом', 'в Согоме', 'из Согома', 'в Согом', 'Ханты-Мансийский'),
    # Нефтеюганский район
    ('Пойковский', 'в Пойковском', 'из Пойковского', 'в Пойковский', 'Нефтеюганский'),
    ('Салым', 'в Салыме', 'из Салыма', 'в Салым', 'Нефтеюганский'),
    ('Сингапай', 'в Сингапае', 'из Сингапая', 'в Сингапай', 'Нефтеюганский'),
    ('Каркатеевы', 'в Каркатеевах', 'из Каркатеев', 'в Каркатеевы', 'Нефтеюганский'),
    ('Куть-Ях', 'в Куть-Яхе', 'из Куть-Яха', 'в Куть-Ях', 'Нефтеюганский'),
    ('Чеускино', 'в Чеускино', 'из Чеускино', 'в Чеускино', 'Нефтеюганский'),
    ('Усть-Юган', 'в Усть-Югане', 'из Усть-Югана', 'в Усть-Юган', 'Нефтеюганский'),
    ('Лемпино', 'в Лемпино', 'из Лемпино', 'в Лемпино', 'Нефтеюганский'),
    ('Юганская Обь', 'в Юганской Оби', 'из Юганской Оби', 'в Юганскую Обь', 'Нефтеюганский'),
    ('Сентябрьский', 'в Сентябрьском', 'из Сентябрьского', 'в Сентябрьский', 'Нефтеюганский'),
    # Сургутский район
    ('Лянтор', 'в Лянторе', 'из Лянтора', 'в Лянтор', 'Сургутский'),
    ('Фёдоровский', 'в Фёдоровском', 'из Фёдоровского', 'в Фёдоровский', 'Сургутский'),
    ('Белый Яр', 'в Белом Яре', 'из Белого Яра', 'в Белый Яр', 'Сургутский'),
    ('Барсово', 'в Барсово', 'из Барсово', 'в Барсово', 'Сургутский'),
    ('Солнечный', 'в Солнечном', 'из Солнечного', 'в Солнечный', 'Сургутский'),
    ('Нижнесортымский', 'в Нижнесортымском', 'из Нижнесортымского', 'в Нижнесортымский', 'Сургутский'),
    ('Русскинская', 'в Русскинской', 'из Русскинской', 'в Русскинскую', 'Сургутский'),
    ('Ульт-Ягун', 'в Ульт-Ягуне', 'из Ульт-Ягуна', 'в Ульт-Ягун', 'Сургутский'),
    ('Локосово', 'в Локосово', 'из Локосово', 'в Локосово', 'Сургутский'),
    ('Сытомино', 'в Сытомино', 'из Сытомино', 'в Сытомино', 'Сургутский'),
    ('Угут', 'в Угуте', 'из Угута', 'в Угут', 'Сургутский'),
    # Нижневартовский район
    ('Излучинск', 'в Излучинске', 'из Излучинска', 'в Излучинск', 'Нижневартовский'),
    ('Новоаганск', 'в Новоаганске', 'из Новоаганска', 'в Новоаганск', 'Нижневартовский'),
    ('Ваховск', 'в Ваховске', 'из Ваховска', 'в Ваховск', 'Нижневартовский'),
    ('Покур', 'в Покуре', 'из Покура', 'в Покур', 'Нижневартовский'),
    ('Ларьяк', 'в Ларьяке', 'из Ларьяка', 'в Ларьяк', 'Нижневартовский'),
    ('Аган', 'в Агане', 'из Агана', 'в Аган', 'Нижневартовский'),
    ('Охтеурье', 'в Охтеурье', 'из Охтеурья', 'в Охтеурье', 'Нижневартовский'),
    ('Зайцева Речка', 'в Зайцевой Речке', 'из Зайцевой Речки', 'в Зайцеву Речку', 'Нижневартовский'),
    ('Корлики', 'в Корликах', 'из Корликов', 'в Корлики', 'Нижневартовский'),
    ('Варьёган', 'в Варьёгане', 'из Варьёгана', 'в Варьёган', 'Нижневартовский'),
    ('Вата', 'в Вате', 'из Ваты', 'в Вату', 'Нижневартовский'),
    # Октябрьский район
    ('Октябрьское', 'в Октябрьском', 'из Октябрьского', 'в Октябрьское', 'Октябрьский'),
    ('Андра', 'в Андре', 'из Андры', 'в Андру', 'Октябрьский'),
    ('Приобье', 'в Приобье', 'из Приобья', 'в Приобье', 'Октябрьский'),
    ('Талинка', 'в Талинке', 'из Талинки', 'в Талинку', 'Октябрьский'),
    ('Унъюган', 'в Унъюгане', 'из Унъюгана', 'в Унъюган', 'Октябрьский'),
    ('Перегрёбное', 'в Перегрёбном', 'из Перегрёбного', 'в Перегрёбное', 'Октябрьский'),
    ('Шеркалы', 'в Шеркалах', 'из Шеркал', 'в Шеркалы', 'Октябрьский'),
    ('Карымкары', 'в Карымкарах', 'из Карымкар', 'в Карымкары', 'Октябрьский'),
    ('Сергино', 'в Сергино', 'из Сергино', 'в Сергино', 'Октябрьский'),
    # Советский район
    ('Советский', 'в Советском', 'из Советского', 'в Советский', 'Советский'),
    ('Пионерский', 'в Пионерском', 'из Пионерского', 'в Пионерский', 'Советский'),
    ('Агириш', 'в Агирише', 'из Агириша', 'в Агириш', 'Советский'),
    ('Зеленоборск', 'в Зеленоборске', 'из Зеленоборска', 'в Зеленоборск', 'Советский'),
    ('Малиновский', 'в Малиновском', 'из Малиновского', 'в Малиновский', 'Советский'),
    ('Таёжный', 'в Таёжном', 'из Таёжного', 'в Таёжный', 'Советский'),
    ('Коммунистический', 'в Коммунистическом', 'из Коммунистического', 'в Коммунистический', 'Советский'),
    ('Алябьевский', 'в Алябьевском', 'из Алябьевского', 'в Алябьевский', 'Советский'),
    # Кондинский район
    ('Междуреченский', 'в Междуреченском', 'из Междуреченского', 'в Междуреченский', 'Кондинский'),
    ('Кондинское', 'в Кондинском', 'из Кондинского', 'в Кондинское', 'Кондинский'),
    ('Мортка', 'в Мортке', 'из Мортки', 'в Мортку', 'Кондинский'),
    ('Куминский', 'в Куминском', 'из Куминского', 'в Куминский', 'Кондинский'),
    ('Луговой', 'в Луговом', 'из Лугового', 'в Луговой', 'Кондинский'),
    ('Половинка', 'в Половинке', 'из Половинки', 'в Половинку', 'Кондинский'),
    ('Мулымья', 'в Мулымье', 'из Мулымьи', 'в Мулымью', 'Кондинский'),
    ('Шугур', 'в Шугуре', 'из Шугура', 'в Шугур', 'Кондинский'),
    ('Леуши', 'в Леушах', 'из Леуш', 'в Леуши', 'Кондинский'),
    ('Ягодный', 'в Ягодном', 'из Ягодного', 'в Ягодный', 'Кондинский'),
    ('Болчары', 'в Болчарах', 'из Болчар', 'в Болчары', 'Кондинский'),
    # Берёзовский район
    ('Берёзово', 'в Берёзово', 'из Берёзово', 'в Берёзово', 'Берёзовский'),
    ('Игрим', 'в Игриме', 'из Игрима', 'в Игрим', 'Берёзовский'),
    ('Саранпауль', 'в Саранпауле', 'из Саранпауля', 'в Саранпауль', 'Берёзовский'),
    ('Светлый', 'в Светлом', 'из Светлого', 'в Светлый', 'Берёзовский'),
    ('Хулимсунт', 'в Хулимсунте', 'из Хулимсунта', 'в Хулимсунт', 'Берёзовский'),
    ('Приполярный', 'в Приполярном', 'из Приполярного', 'в Приполярный', 'Берёзовский'),
    ('Сосьва', 'в Сосьве', 'из Сосьвы', 'в Сосьву', 'Берёзовский'),
    # Белоярский район
    ('Белоярский', 'в Белоярском', 'из Белоярского', 'в Белоярский', 'Белоярский'),
    ('Сосновка', 'в Сосновке', 'из Сосновки', 'в Сосновку', 'Белоярский'),
    ('Лыхма', 'в Лыхме', 'из Лыхмы', 'в Лыхму', 'Белоярский'),
    ('Верхнеказымский', 'в Верхнеказымском', 'из Верхнеказымского', 'в Верхнеказымский', 'Белоярский'),
    ('Полноват', 'в Полновате', 'из Полновата', 'в Полноват', 'Белоярский'),
    ('Казым', 'в Казыме', 'из Казыма', 'в Казым', 'Белоярский'),
]
# Районные центры, которые сами — города района (для текста «районный центр»)
CENTER = {'Советский': 'Советский', 'Белоярский': 'Белоярский', 'Октябрьский': 'Октябрьское', 'Кондинский': 'Междуреченский',
          'Берёзовский': 'Берёзово', 'Сургутский': 'Сургут', 'Нефтеюганский': 'Нефтеюганск', 'Нижневартовский': 'Нижневартовск',
          'Ханты-Мансийский': 'Ханты-Мансийск'}
# Подсказка рядом: ближайший крупный город округа (для текста про район)
CITY_OF = {'Сургутский': 'Сургут', 'Нефтеюганский': 'Нефтеюганск', 'Нижневартовский': 'Нижневартовск'}

# Координаты, тип и численность — из OpenStreetMap (goroda-geo.json, собрано один раз, в сборке сеть не нужна).
import math
GEO = json.loads((HERE / 'goroda-geo.json').read_text(encoding='utf-8'))
def dist_km(n):
    a, b = GEO.get('Ханты-Мансийск'), GEO.get(n)
    if not a or not b:
        return None
    p1, p2 = math.radians(a['lat']), math.radians(b['lat']); dl = math.radians(b['lon'] - a['lon'])
    return round(2 * 6371 * math.asin(math.sqrt(math.sin((p2 - p1) / 2) ** 2 + math.cos(p1) * math.cos(p2) * math.sin(dl / 2) ** 2)))
def people(n):
    try:
        v = int(re.sub(r'\D', '', str((GEO.get(n) or {}).get('population') or '')))
    except ValueError:
        return ''
    if v >= 10000:
        return 'около %d тыс. жителей' % round(v / 1000)
    if v >= 1000:
        return 'около %s тыс. жителей' % (('%.1f' % (v / 1000)).replace('.', ',').replace(',0', ''))
    return 'около %d жителей' % (round(v / 50) * 50) if v else ''

TR = dict(zip('абвгдеёжзийклмнопрстуфхцчшщъыьэюя', ['a', 'b', 'v', 'g', 'd', 'e', 'e', 'zh', 'z', 'i', 'y', 'k', 'l', 'm', 'n', 'o', 'p', 'r', 's', 't', 'u', 'f',
                                                     'kh', 'ts', 'ch', 'sh', 'sch', '', 'y', '', 'e', 'yu', 'ya']))
def translit(s):
    s = ''.join(TR.get(c, c) for c in s.lower())
    return re.sub(r'[^a-z0-9]+', '-', s).strip('-')

def esc(s):
    return H.escape(str(s), quote=True)

def rub(v):
    return '{:,}'.format(int(v)).replace(',', ' ') + ' ₽'

# --- цены ---
rows = [r for r in csv.DictReader(open(REPO / 'data/products.csv', encoding='utf-8'))
        if r['Цена'].strip() and r['Наличие'].strip().lower() != 'нет']
def num(x):
    x = re.sub(r'[^\d]', '', x or '')
    return int(x) if x else 0
MIN, CATMIN = {}, {}
for r in rows:
    p = num(r['Цена'])
    if not p:
        continue
    MIN[r['Модель']] = min(MIN.get(r['Модель'], p), p)
    if p >= 5000:  # без копеечных аксессуаров (плёнки, подставки) — цена «от» по технике
        CATMIN[r['Категория']] = min(CATMIN.get(r['Категория'], p), p)
SEO = json.loads((HERE / 'seo-stranicy.json').read_text(encoding='utf-8'))
SEO = [p for p in SEO if p.get('kind') not in ('city', 'info', 'blog')]
MURL = {p['name']: p['slug'] for p in SEO if p.get('kind') == 'model'}
PRICE_ROWS = [n for n in ['iPhone 18 Pro', 'iPhone 18 Pro Max', 'iPhone 17 Pro Max', 'iPhone 17 Pro', 'iPhone 17', 'iPhone Air', 'iPhone 16',
                          'iPhone 15', 'Samsung Galaxy S26 Ultra', 'Samsung Galaxy S26', 'Samsung Galaxy A57', 'AirPods Pro 3', 'AirPods 4',
                          'Apple Watch Series 11', 'MacBook Air 13 M5', 'iPad 11', 'Стайлер Dyson Airwrap HS09'] if n in MIN]
CAT_ROWS = [('Android-смартфоны: Xiaomi, Honor, Huawei, Pixel', 'Android', '/smartfony-android'), ('Игровые приставки и геймпады', 'Консоли', '/igrovye-pristavki'),
            ('Камеры DJI, GoPro, Insta360, Instax', 'Фото и видео', '/foto-i-video')]
IPH_MIN = min(v for k, v in MIN.items() if k.startswith('iPhone'))

base = (REPO / 'pages' / 'dostavka.html').read_text(encoding='utf-8')
i0, i1 = base.index('<main'), base.index('</main>') + len('</main>')
HEAD, TAIL = base[:i0], base[i1:]
def page_shell(main, title):
    h = re.sub(r'<title>.*?</title>', '<title>%s</title>' % esc(title), HEAD, count=1, flags=re.S)
    return h + main + TAIL

def faq_html(q):
    return '<div class="qa">' + ''.join('<details%s><summary>%s<i></i></summary><p>%s</p></details>' % (' open' if i == 0 else '', esc(a), b)
                                        for i, (a, b) in enumerate(q)) + '</div>'

def town_main(t, others):
    nom, gde, otkuda, kuda, rayon = t
    lead = ('Магазин ЮZ в Ханты-Мансийске доставляет оригинальные iPhone, Samsung, AirPods, Apple Watch, MacBook и другую технику %s%s. '
            'Оформите заказ на сайте или по телефону, менеджер перезвонит за 15 минут, а технику отправим транспортной компанией с трек-номером.') % (
        kuda, (' (%s район)' % rayon) if rayon else '')
    side = ('<aside class="pg-side"><div><span>Доставка %s</span><b>транспортной компанией</b></div><div><span>Бесплатно</span><b>от 50 000 ₽</b></div>'
            '<div><span>Гарантия</span><b>12 месяцев</b></div><div><span>Рассрочка</span><b>до 36 месяцев</b></div></aside>') % esc(kuda)
    hero = ('<section class="pg-hero"><div class="wrap pg-hero-in has-side"><div class="pg-hero-copy">'
            '<div class="crumbs"><a href="/">Главная</a><span>/</span><a href="/dostavka-hmao">Доставка по ХМАО</a><span>/</span>%s</div>'
            '<span class="eyebrow">Доставка %s</span><h1>Купить iPhone и технику %s</h1><p class="pg-lead">%s</p>'
            '<div class="cta-row"><a class="btn btn-lime" href="#" data-lead="call" data-eyebrow="Доставка %s" data-title="Заказ с доставкой %s" data-source="Город: %s">'
            'Заказать с доставкой <span class="arr">→</span></a><a class="btn btn-ghost" href="/catalog">Выбрать в каталоге</a></div></div>%s</div></section>') % (
        esc(nom), esc(kuda), esc(gde), esc(lead), esc(kuda), esc(kuda), esc(nom), side)
    d = dist_km(nom); pp = people(nom)
    if d is None:
        about = ''
    elif d <= 60:
        about = ('%s — совсем рядом с Ханты-Мансийском: около %d км по прямой%s. Технику удобно забрать самому в магазине на Комсомольской, 49 '
                 'в день заказа — проверим её при вас и настроим, — или заказать доставку.') % (nom, d, (', ' + pp) if pp else '')
    elif d <= 200:
        about = ('От Ханты-Мансийска до %s около %d км по прямой%s. Если планируете поездку в окружную столицу, оставьте заявку заранее: '
                 'отложим нужную модель к вашему приезду. Или отправим заказ СДЭК с трек-номером.') % (otkuda[3:], d, ('; %s — %s' % (nom, pp)) if pp else '')
    else:
        about = ('%s находится примерно в %d км от Ханты-Мансийска по прямой%s, поэтому заказ удобнее оформить дистанционно: '
                 'выберите технику на сайте, менеджер всё уточнит по телефону, а заказ отправим СДЭК с трек-номером. '
                 'Рассрочку тоже можно обсудить по телефону.') % (nom, d, (' (' + pp + ')') if pp else '')
    if rayon and CENTER.get(rayon) and CENTER[rayon] != nom:
        about += ' %s входит в %s район, районный центр — %s.' % (nom, rayon[:-2] + 'ий', CENTER[rayon])
    elif rayon and CENTER.get(rayon) == nom:
        about += ' %s — районный центр %s района.' % (nom, rayon[:-2] + 'ого')
    elif not rayon:
        about += ' %s — город окружного значения Югры.' % nom
    about_html = ('<section class="pg-sec"><div class="wrap"><h2 class="pg-h2">Доставка %s: что важно знать</h2><p class="pg-sub">%s</p></div></section>') % (esc(kuda), esc(about)) if about else ''
    trs = ''.join('<tr><td>%s</td><td>от %s</td></tr>' % (('<a href="/%s">%s</a>' % (MURL[n], esc(n))) if n in MURL else esc(n), rub(MIN[n])) for n in PRICE_ROWS)
    trs += ''.join('<tr><td><a href="%s">%s</a></td><td>от %s</td></tr>' % (u, esc(t_), rub(CATMIN[c])) for t_, c, u in CAT_ROWS if c in CATMIN)
    prices = ('<section class="pg-sec"><div class="wrap"><h2 class="pg-h2">Цены на технику с доставкой %s</h2>'
              '<p class="pg-sub">Цены те же, что в магазине на Комсомольской, 49. Точную цену нужного цвета и памяти смотрите в каталоге.</p>'
              '<div class="pg-table-w"><table class="pg-table"><thead><tr><th>Модель</th><th>Цена</th></tr></thead><tbody>%s</tbody></table></div></div></section>') % (esc(kuda), trs)
    steps = ('<section class="pg-sec"><div class="wrap"><h2 class="pg-h2">Как заказать %s</h2><ol class="pg-steps">'
             '<li><b>Выберите технику</b><span>Добавьте товар в корзину на сайте или оставьте заявку.</span></li>'
             '<li><b>Подтвердим заказ</b><span>Менеджер перезвонит в течение 15 минут, уточнит модель, цвет, адрес, срок и стоимость доставки %s.</span></li>'
             '<li><b>Отправим</b><span>Упакуем и отправим транспортной компанией с трек-номером.</span></li></ol></div></section>') % (esc(otkuda), esc(kuda))
    why = ('<section class="pg-sec"><div class="wrap"><h2 class="pg-h2">Почему заказывают в ЮZ</h2><div class="pg-cards">'
           '<div class="pg-card"><b>Только оригинал</b><p>Новая техника, серийный номер можно проверить на сайте Apple.</p></div>'
           '<div class="pg-card"><b>Гарантия 12 месяцев</b><p>Та же гарантия магазина, что и при покупке в Ханты-Мансийске. <a href="/garantiya">Подробнее</a></p></div>'
           '<div class="pg-card"><b>Рассрочка 0%</b><p>Без первого взноса, до 36 месяцев. <a href="/rassrochka">Посчитать платёж</a></p></div></div></div></section>')
    near = ''
    if others:
        near = ('<section class="pg-sec"><div class="wrap"><h2 class="pg-h2">%s</h2><p class="pg-sub">%s</p></div></section>') % (
            esc('Доставка по %s району' % (rayon[:-2] + 'ому') if rayon else 'Доставка в другие города ХМАО'),
            ', '.join('<a href="/%s">%s</a>' % (translit(o[0]), esc(o[0])) for o in others) + '. <a href="/dostavka-hmao">Все города и посёлки ХМАО</a>')
    faq = [('Доставляете ли вы технику %s?' % kuda,
            'Да. Отправляем %s транспортной компанией с трек-номером. Срок и стоимость доставки назовёт менеджер при подтверждении заказа.' % esc(kuda)),
           ('Сколько стоит доставка %s?' % kuda, 'Бесплатно при заказе от 50 000 ₽. Стоимость доставки меньших заказов назовёт менеджер.'),
           ('Можно купить iPhone в рассрочку, если я живу %s?' % gde, 'Да, рассрочка без первого взноса до 36 месяцев действует и для заказов с доставкой. <a href="/rassrochka">Подробнее о рассрочке</a>.'),
           ('Как оплатить заказ %s?' % otkuda, 'Способ оплаты при доставке согласуем с менеджером. В магазине можно оплатить наличными или картой.'),
           ('Есть ли гарантия на технику с доставкой?', 'Да, гарантия магазина 12 месяцев, как и при покупке в магазине. <a href="/garantiya">Условия гарантии</a>.'),
           ('Можно забрать заказ самому?', 'Да, в магазине ЮZ в Ханты-Мансийске на Комсомольской, 49. Проверим технику при вас и настроим.')]
    if d is not None:
        if d <= 60:
            faq.insert(1, ('Можно забрать технику в день заказа, если я %s?' % gde.replace('в ', 'живу в ', 1),
                           'Да. До магазина на Комсомольской, 49 около %d км. Оставьте заявку — отложим модель, и заберёте её в тот же день.' % d))
        else:
            faq.insert(1, ('Как далеко %s до магазина ЮZ?' % otkuda.replace('из ', 'от ', 1),
                           'Около %d км по прямой до Ханты-Мансийска. Приезжать не обязательно: оформим заказ по телефону и отправим СДЭК с трек-номером.' % d))
    qa = '<section class="pg-sec"><div class="wrap faq"><div style="display:grid;gap:16px;align-content:start"><h2>Вопросы о доставке %s</h2><p style="color:var(--muted)">Не нашли ответ? Позвоните: <a href="tel:+73467362404">+7 (3467) 36-24-04</a></p></div>%s</div></section>' % (esc(kuda), faq_html(faq))
    return '<main id="top" class="pg">' + hero + about_html + prices + steps + why + near + qa + '</main>', faq

def ld_tags(objs):
    return ''.join('<script type="application/ld+json">%s</script>\n' % json.dumps(o, ensure_ascii=False).replace('</', '<\\/') for o in objs)
def txt(x):
    return re.sub(r'\s+', ' ', H.unescape(re.sub(r'<[^>]+>', ' ', x))).strip()

OUT = ZAG / 'seo'; OUT.mkdir(exist_ok=True)
manifest = []
def emit(slug, page_html, title, descr, crumbs, faq):
    (REPO / 'pages' / (slug + '.html')).write_text(page_html, encoding='utf-8')
    lds = [STORE, {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
        {"@type": "ListItem", "position": i + 1, "name": t_, **({"item": "https://youz.store" + u} if u else {})} for i, (t_, u) in enumerate(crumbs)]}]
    if faq:
        lds.append({"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
            {"@type": "Question", "name": a, "acceptedAnswer": {"@type": "Answer", "text": txt(b)}} for a, b in faq]})
    blk = TPL.format(name=slug, repo=REPO_NAME, page='pages/%s.html' % slug, model='', sha=SHA, s7=SHA[:7], html=page_html.strip(), h=hs(page_html), ld=ld_tags(lds))
    (OUT / (slug + '.txt')).write_text(blk, encoding='utf-8')
    manifest.append({'slug': slug, 'kind': 'city', 'title': title, 'descr': descr})

slugs = [translit(t[0]) for t in T]
assert len(set(slugs)) == len(slugs), 'повтор адреса'
clash = {p['slug'] for p in SEO} & set(slugs + ['dostavka-hmao'])
assert not clash, clash
for t in T:
    rayon = t[4]
    others = [o for o in T if o[4] == rayon and o is not t] if rayon else [o for o in T if o[4] is None and o is not t]
    main, faq = town_main(t, others)
    title = 'Купить iPhone %s — цены от %s, доставка | ЮZ Store' % (t[1], rub(IPH_MIN))
    dk = dist_km(t[0])
    descr = 'iPhone, Samsung, AirPods и другая техника с доставкой %s%s. Оригинал, гарантия 12 мес, рассрочка 0%% до 36 мес, бесплатная доставка от 50 000 ₽.' % (
        t[3], (' (%d км от Ханты-Мансийска)' % dk) if dk else '')
    emit(translit(t[0]), page_shell(main, title), title, descr, [('Главная', '/'), ('Доставка по ХМАО', '/dostavka-hmao'), (t[0], '')], faq)

# --- общая страница: все города и посёлки ---
groups = [('Города округа', [t for t in T if t[4] is None])] + \
         [('%s район' % r, [t for t in T if t[4] == r]) for r in dict.fromkeys(t[4] for t in T if t[4])]
lists = ''.join('<div class="pg-card"><b>%s</b><p>%s</p></div>' % (esc(g), ', '.join('<a href="/%s">%s</a>' % (translit(t[0]), esc(t[0])) for t in ts)) for g, ts in groups)
hub_faq = [('Доставляете ли вы по всему ХМАО?', 'Да. По Ханты-Мансийску привезём в день заказа, в остальные города и посёлки округа отправим транспортной компанией с трек-номером.'),
           ('Сколько стоит доставка?', 'По Ханты-Мансийску бесплатно от 10 000 ₽, в другие города бесплатно от 50 000 ₽. Стоимость остальных доставок назовёт менеджер.'),
           ('Можно купить с доставкой в рассрочку?', 'Да, рассрочка без первого взноса до 36 месяцев.')]
hub_main = ('<main id="top" class="pg"><section class="pg-hero"><div class="wrap pg-hero-in"><div class="pg-hero-copy">'
            '<div class="crumbs"><a href="/">Главная</a><span>/</span><a href="/dostavka">Доставка</a><span>/</span>Доставка по ХМАО</div>'
            '<span class="eyebrow">Доставка по Югре</span><h1>Доставка iPhone и техники по ХМАО</h1>'
            '<p class="pg-lead">Магазин ЮZ в Ханты-Мансийске отправляет оригинальные iPhone, Samsung, AirPods, Apple Watch, MacBook, Dyson и другую технику во все города и посёлки Ханты-Мансийского автономного округа. Бесплатно при заказе от 50 000 ₽.</p>'
            '<div class="cta-row"><a class="btn btn-lime" href="#" data-lead="call" data-eyebrow="Доставка по ХМАО" data-title="Заказ с доставкой" data-source="Доставка по ХМАО">Заказать с доставкой <span class="arr">→</span></a>'
            '<a class="btn btn-ghost" href="/catalog">Выбрать в каталоге</a></div></div></div></section>'
            '<section class="pg-sec"><div class="wrap"><h2 class="pg-h2">Куда доставляем</h2><div class="pg-cards">%s</div></div></section>'
            '<section class="pg-sec"><div class="wrap faq"><div style="display:grid;gap:16px;align-content:start"><h2>Вопросы о доставке</h2></div>%s</div></section></main>') % (lists, faq_html(hub_faq))
hub_title = 'Доставка iPhone и техники по ХМАО — все города и посёлки | ЮZ Store'
emit('dostavka-hmao', page_shell(hub_main, hub_title), hub_title,
     'Доставка iPhone, Samsung, AirPods и другой техники из Ханты-Мансийска во все города и посёлки ХМАО. Оригинал, гарантия 12 мес, рассрочка 0%, бесплатно от 50 000 ₽.',
     [('Главная', '/'), ('Доставка', '/dostavka'), ('Доставка по ХМАО', '')], hub_faq)

# --- «Сколько стоит iPhone»: все модели и объёмы памяти с ценами из прайса ---
import datetime, collections
MES = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь']
today = datetime.date.today(); mes = '%s %d' % (MES[today.month - 1], today.year)
IV = collections.OrderedDict()
for r in rows:
    if r['Категория'] != 'iPhone' or not num(r['Цена']):
        continue
    k = (r['Память'].strip() or '—')
    d = IV.setdefault(r['Модель'], collections.OrderedDict())
    p_, c_ = num(r['Цена']), num(r.get('Цена по карте', ''))
    if k not in d or p_ < d[k][0]:
        d[k] = (p_, c_)
def memkey(m):
    mm = re.match(r'(\d+)\s*(ГБ|ТБ|GB|TB)', m, re.I)
    return int(mm.group(1)) * (1024 if mm and mm.group(2).upper() in ('ТБ', 'TB') else 1) if mm else 0
order = sorted(IV, key=lambda n: -min(v[0] for v in IV[n].values()))
rows_html = ''
for n in order:
    mems = sorted(IV[n].items(), key=lambda kv: memkey(kv[0]))
    link = ('<a href="/%s">%s</a>' % (MURL[n], esc(n))) if n in MURL else esc(n)
    for i, (m, (pr, cd)) in enumerate(mems):
        rows_html += '<tr><td>%s</td><td>%s</td><td>от %s</td></tr>' % (link if i == 0 else '', esc(m), rub(pr))
allmin = min(min(v[0] for v in d.values()) for d in IV.values()); allmax = max(max(v[0] for v in d.values()) for d in IV.values())
cheap = min(order, key=lambda n: min(v[0] for v in IV[n].values()))
top5 = [n for n in order if n in MURL][:6]
price_faq = [('Сколько стоит самый дешёвый iPhone в Ханты-Мансийске?', 'Сейчас самый доступный — %s, от %s.' % (cheap, rub(min(v[0] for v in IV[cheap].values()))))] + \
            [('Сколько стоит %s?' % n, 'От %s за %s. Цена зависит от объёма памяти и цвета.' % (rub(min(v[0] for v in IV[n].values())), sorted(IV[n], key=memkey)[0])) for n in top5] + \
            [('Можно купить iPhone в рассрочку?', 'Да, без первого взноса до 36 месяцев. <a href="/rassrochka">Посчитать платёж</a>.'),
             ('Как часто меняются цены?', 'Цены на сайте обновляются каждый день по прайсу поставщика. Точную цену нужного цвета смотрите в карточке модели.')]
info_main = ('<main id="top" class="pg"><section class="pg-hero"><div class="wrap pg-hero-in"><div class="pg-hero-copy">'
             '<div class="crumbs"><a href="/">Главная</a><span>/</span><a href="/iphone">iPhone</a><span>/</span>Сколько стоит iPhone</div>'
             '<span class="eyebrow">Цены на %s</span><h1>Сколько стоит iPhone в Ханты-Мансийске</h1>'
             '<p class="pg-lead">Цены на все iPhone в магазине ЮZ на Комсомольской, 49: от %s до %s. В таблице — каждая модель и объём памяти. '
             'Только новые оригинальные iPhone, гарантия 12 месяцев, рассрочка 0%% до 36 месяцев, trade-in.</p>'
             '<div class="cta-row"><a class="btn btn-lime" href="/iphone">Выбрать iPhone <span class="arr">→</span></a>'
             '<a class="btn btn-ghost" href="#" data-lead="call" data-eyebrow="Цены на iPhone" data-title="Уточнить цену" data-source="Сколько стоит iPhone">Уточнить цену</a></div></div></div></section>'
             '<section class="pg-sec"><div class="wrap"><h2 class="pg-h2">Цены на iPhone, %s</h2>'
             '<p class="pg-sub">Цена — минимальная для этого объёма памяти, у разных цветов она может отличаться.</p>'
             '<div class="pg-table-w"><table class="pg-table"><thead><tr><th>Модель</th><th>Память</th><th>Цена</th></tr></thead><tbody>%s</tbody></table></div></div></section>'
             '<section class="pg-sec"><div class="wrap faq"><div style="display:grid;gap:16px;align-content:start"><h2>Вопросы о ценах на iPhone</h2>'
             '<p style="color:var(--muted)">Позвоните: <a href="tel:+73467362404">+7 (3467) 36-24-04</a></p></div>%s</div></section></main>') % (
    esc(mes), rub(allmin), rub(allmax), esc(mes), rows_html, faq_html(price_faq))
info_title = 'Сколько стоит iPhone в Ханты-Мансийске — цены на все модели, %s | ЮZ Store' % mes
emit('skolko-stoit-iphone', page_shell(info_main, info_title), info_title,
     'Цены на все iPhone в Ханты-Мансийске (%s): от %s до %s. Таблица по моделям и памяти, оригинал, гарантия 12 мес, рассрочка 0%%. Магазин ЮZ, Комсомольская, 49.' % (mes, rub(allmin), rub(allmax)),
     [('Главная', '/'), ('iPhone', '/iphone'), ('Сколько стоит iPhone', '')], price_faq)
manifest[-1]['kind'] = 'info'

# статьи блога — заголовки и описания для новых страниц в Тильде
for a_ in json.loads((HERE / 'stati.json').read_text(encoding='utf-8')):
    manifest.append({'slug': a_['slug'], 'kind': 'blog', 'title': a_['title'], 'descr': a_['descr']})

(HERE / 'seo-stranicy.json').write_text(json.dumps(SEO + manifest, ensure_ascii=False, indent=1), encoding='utf-8')
print('городов и посёлков', len(T), '+ /dostavka-hmao | commit', SHA[:7])
