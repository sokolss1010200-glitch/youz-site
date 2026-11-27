# SEO-страницы: категории (/iphone, /airpods …) и страницы всех моделей (/iphone-16, /macbook-air-13-m5 …).
# Запуск:  python3 _sobrat-seo-kategorii-modeli.py <папка клона youz-site>
# Что делает:
#   1) pages/<категория>.html — копия catalog.html с H1, вводным текстом, списком моделей с ценами и FAQ категории
#      (атрибут data-cat у #yzCat — каталог сразу открывает нужный раздел);
#   2) блок «Популярные запросы» (ссылки на категории и модели) перед подвалом во всех страницах репозитория;
#   3) ../zagruzchiki/seo/<адрес>.txt — блоки T123 с готовым текстом для поисковиков (модели: текст, таблица цен, FAQ,
#      разметка Product + AggregateOffer + BreadcrumbList + FAQPage; категории: ItemList + BreadcrumbList + FAQPage);
#   4) seo-stranicy.json — заголовки, описания и адреса страниц для Тильды.
# Цены берутся из снимка data/products.csv (на сайте посетитель всё равно видит живые цены — их подставляет youz.js).
import csv, json, pathlib, re, sys, html as H, collections

REPO = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else '.')
HERE = pathlib.Path(__file__).parent
ZAG = HERE.parent / 'zagruzchiki'

# --- общие части сборщика блоков (шаблон загрузчика, хеш, разметка магазина) ---
src = (ZAG / '_sobrat-zagruzchiki-seo.py').read_text(encoding='utf-8')
head = src.split('for name, (page, model) in PAGES.items():')[0]
ns = {'__file__': str(ZAG / '_sobrat-zagruzchiki-seo.py')}
_argv = sys.argv; sys.argv = [sys.argv[0], str(REPO)]
exec(compile(head, 'seo-head', 'exec'), ns)
sys.argv = _argv
TPL, hs, STORE, SHA = ns['TPL'], ns['hs'], ns['STORE'], ns['SHA']
REPO_NAME = ns['REPO']

def slugify(n):
    return re.sub(r'[^a-z0-9а-я]+', '-', n.lower()).strip('-')

def rub(v):
    return '{:,}'.format(int(v)).replace(',', ' ') + ' ₽'

def esc(s):
    return H.escape(str(s), quote=True)

# --- данные прайса ---
rows = [r for r in csv.DictReader(open(REPO / 'data/products.csv', encoding='utf-8'))
        if r['Цена'].strip() and r['Наличие'].strip().lower() != 'нет']
def num(x):
    x = re.sub(r'[^\d]', '', x or '')
    return int(x) if x else 0
M = collections.OrderedDict()
for r in rows:
    p = num(r['Цена'])
    if not p:
        continue
    m = M.setdefault(r['Модель'], {'cat': r['Категория'], 'grp': r['Группа'], 'v': [], 'photo': ''})
    m['v'].append({'mem': r['Память'].strip(), 'opt': r['Опция'].strip(), 'col': r['Цвет'].strip(), 'price': p,
                   'card': num(r.get('Цена по карте', ''))})
    if not m['photo']:
        mm = re.search(r'yz-a(\d{3})', r['Фото'] or '')
        if mm:
            m['photo'] = 'https://cdn.jsdelivr.net/gh/%s@main/img/yz-h%s.webp' % (REPO_NAME, mm.group(1))

# --- аксессуары: свой прайс data/accessories.csv (собирается из склада, aksessuary-2026-11/acc_csv.py) ---
# Цены Apple-аксессуаров — в products.csv, а тип и совместимость («Подходит к») — в accessories.csv.
ACC = 'Аксессуары'
ACC_TYPE, ACC_FITS = {}, collections.defaultdict(list)
for r in csv.DictReader(open(REPO / 'data/accessories.csv', encoding='utf-8')):
    n = r['Модель'].strip()
    if not n:
        continue
    if r.get('Тип'):
        ACC_TYPE[n] = r['Тип'].strip()
    for t in re.split(r'[;\n]', r.get('Подходит к') or ''):
        if t.strip() and t.strip() not in ACC_FITS[n]:
            ACC_FITS[n].append(t.strip())
    pr = num(r['Цена'])
    if not pr or (r['Наличие'] or '').strip().lower() == 'нет':
        continue
    m = M.setdefault(n, {'cat': ACC, 'grp': '', 'v': [], 'photo': ''})
    m['v'].append({'mem': '', 'opt': '', 'col': (r['Цвет'] or '').strip(), 'price': pr, 'card': 0})
    if not m['photo'] and r['Фото']:
        m['photo'] = r['Фото'] if r['Фото'].startswith('http') else 'https://cdn.jsdelivr.net/gh/%s@main/%s' % (REPO_NAME, r['Фото'])
for n, m in M.items():
    if m['cat'] == ACC:
        m['grp'] = ACC_TYPE.get(n) or ('Стилусы' if 'Pencil' in n else 'Зарядки' if 'Power Adapter' in n else m['grp'])
        m['fits'] = ACC_FITS.get(n, [])

# --- категории ---
CATS = [  # адрес, категория в прайсе, H1, название во мн. ч., вводный текст (2 абзаца), FAQ
    ('iphone', 'iPhone', 'Купить iPhone в Ханты-Мансийске', 'iPhone',
     ['В магазине ЮZ на Комсомольской, 49 в наличии все актуальные iPhone: iPhone 18 Pro и 18 Pro Max, складной iPhone Duo, iPhone 17, 17 Pro, Air, 16 и 15. Каждый айфон оригинальный и новый, серийный номер проверяем при вас.',
      'Купить айфон можно за наличные, картой или в рассрочку до 36 месяцев без первого взноса. Старый телефон примем в trade-in и зачтём в счёт нового. К каждому iPhone идёт подарок, бесплатный перенос данных и установка банковских приложений.'],
     [('Какие iPhone есть в наличии?', 'iPhone 18 Pro, 18 Pro Max, iPhone Duo, iPhone 17, 17 Pro, 17 Pro Max, 17e, Air, 16, 16 Pro, 16 Pro Max и 15, в разных цветах и объёмах памяти. Если нужного варианта нет на витрине, привезём под заказ.'),
      ('Айфоны оригинальные?', 'Да. Продаём только новые оригинальные iPhone. Серийный номер проверяем на сайте Apple вместе с вами, телефон активируется при вас.'),
      ('Можно купить iPhone в рассрочку?', 'Да, до 36 месяцев без первого взноса. Нужен только паспорт, решение банка приходит за 5–10 минут.'),
      ('Сколько дадут за мой старый iPhone в trade-in?', 'До 99 000 ₽, зависит от модели, памяти и состояния. Оценим при вас за 15 минут, предварительно можно посчитать на главной странице.')]),
    ('airpods', 'AirPods', 'Купить AirPods в Ханты-Мансийске', 'AirPods',
     ['Оригинальные наушники Apple AirPods в магазине ЮZ: AirPods 4 и AirPods 4 с шумоподавлением, AirPods 5, AirPods Pro 3 и полноразмерные AirPods Max.',
      'Поможем выбрать модель под ваш iPhone, подключим и настроим прямо в магазине. Гарантия магазина 12 месяцев, доставка по Ханты-Мансийску в день заказа.'],
     [('Какие AirPods выбрать?', 'Для звонков и музыки в дороге, AirPods 4 или 5. С активным шумоподавлением: AirPods 4 ANC или AirPods Pro 3. Для дома и полёта, AirPods Max.'),
      ('AirPods оригинальные?', 'Да, только новые оригинальные наушники Apple. Серийный номер можно проверить при покупке.'),
      ('Есть доставка AirPods?', 'Да, по Ханты-Мансийску привезём в день заказа, в другие города отправим транспортной компанией.')]),
    ('apple-watch', 'Apple Watch', 'Купить Apple Watch в Ханты-Мансийске', 'Apple Watch',
     ['Apple Watch Series 12 и 11, Ultra 4 и Ultra 3, Apple Watch SE 3 в магазине ЮZ на Комсомольской, 49. Разные размеры корпуса и ремешки, подберём под руку прямо в магазине.',
      'Настроим часы и свяжем с вашим iPhone, перенесём данные. Гарантия 12 месяцев, рассрочка до 36 месяцев, доставка по городу в день заказа.'],
     [('Какие Apple Watch выбрать?', 'Series: для большинства, Ultra: для спорта и путешествий (большая батарея и прочный титановый корпус), SE: самый доступный вариант.'),
      ('Какой размер корпуса выбрать?', 'Меньший размер подходит для тонкого запястья, на большем удобнее читать. Приходите примерить в магазин.'),
      ('Можно купить Apple Watch в рассрочку?', 'Да, до 36 месяцев без первого взноса, нужен только паспорт.')]),
    ('macbook', 'Mac', 'Купить MacBook в Ханты-Мансийске', 'MacBook',
     ['Ноутбуки Apple в магазине ЮZ: MacBook Air 13 и 15 на M4 и M5, MacBook Pro 14 на M5 и новый MacBook Neo. Разные объёмы памяти и накопителя.',
      'Поможем выбрать конфигурацию под учёбу, работу или монтаж, перенесём данные со старого компьютера. Гарантия 12 месяцев, рассрочка до 36 месяцев.'],
     [('Какой MacBook выбрать?', 'MacBook Air: лёгкий и тихий, подходит для учёбы и офиса. MacBook Pro: для монтажа, графики и разработки.'),
      ('MacBook оригинальные?', 'Да, только новые оригинальные ноутбуки Apple с проверкой серийного номера при вас.'),
      ('Можно купить MacBook в рассрочку?', 'Да, до 36 месяцев без первого взноса.')]),
    ('ipad', 'iPad', 'Купить iPad в Ханты-Мансийске', 'iPad',
     ['Планшеты Apple iPad в магазине ЮZ: iPad 11, iPad Air 11 и 13 на M4, iPad Pro 11 и 13 на M4 и M5. Wi-Fi и версии с сотовой связью.',
      'Подберём модель и аксессуары, Apple Pencil, клавиатуру, чехол. Гарантия магазина 12 месяцев, доставка по Ханты-Мансийску в день заказа.'],
     [('Какой iPad выбрать?', 'iPad: для учёбы и видео, iPad Air: для рисования и работы, iPad Pro: максимальная производительность и лучший экран.'),
      ('Есть iPad с SIM-картой?', 'Да, есть версии Wi-Fi + Cellular, уточняйте наличие нужного цвета и памяти.')]),
    ('samsung', 'Samsung', 'Купить Samsung Galaxy в Ханты-Мансийске', 'Samsung Galaxy',
     ['Смартфоны Samsung Galaxy в магазине ЮZ: флагманы Galaxy S26, S26+, S26 Ultra и S25, складные Galaxy Z Fold и Z Flip, доступные Galaxy A.',
      'Перенесём данные со старого телефона, примем ваш смартфон в trade-in. Гарантия магазина 12 месяцев, рассрочка до 36 месяцев.'],
     [('Какие Samsung есть в наличии?', 'Galaxy S26 Ultra, S26+, S26, S26 FE, S25 Ultra, S25, Z Fold 8, Z Fold 8 Ultra, Z Fold 7, Z Flip 8 и линейка Galaxy A.'),
      ('Можно сдать старый телефон в trade-in?', 'Да, оценим при вас за 15 минут и зачтём в стоимость нового Samsung.')]),
    ('dyson', 'Dyson', 'Купить Dyson в Ханты-Мансийске', 'Dyson',
     ['Оригинальная техника Dyson для волос в магазине ЮZ: стайлеры Airwrap, фен Supersonic, выпрямитель Airstrait.',
      'Покажем, как пользоваться насадками, и поможем выбрать комплект под ваш тип волос. Гарантия магазина 12 месяцев.'],
     [('Dyson оригинальный?', 'Да, продаём только оригинальную технику Dyson.'),
      ('Что выбрать: Airwrap или Supersonic?', 'Airwrap: сушит и укладывает (локоны, объём). Supersonic: быстрый фен. Airstrait выпрямляет и сушит одновременно.')]),
    ('smartfony-android', 'Android', 'Купить Android-смартфон в Ханты-Мансийске', 'Android-смартфоны',
     ['Смартфоны на Android в магазине ЮZ: Google Pixel, Honor, Huawei, Xiaomi и другие бренды, от доступных моделей до флагманов.',
      'Поможем перенести данные, примем старый телефон в trade-in. Гарантия магазина 12 месяцев.'],
     [('Какие бренды Android есть?', 'Google Pixel, Honor, Huawei, Xiaomi, Realme и другие. Актуальное наличие смотрите в каталоге выше.')]),
    ('igrovye-pristavki', 'Консоли', 'Купить игровую приставку в Ханты-Мансийске', 'игровые приставки',
     ['PlayStation 5 Slim и PS5 Pro, Nintendo Switch 2 и Switch OLED, Steam Deck OLED, Xbox и VR-шлемы в магазине ЮZ.',
      'Геймпады DualSense, зарядные станции и аксессуары. Гарантия магазина 12 месяцев, доставка по Ханты-Мансийску в день заказа.'],
     [('Какие приставки есть в наличии?', 'PS5 Slim, PS5 Pro, Nintendo Switch 2, Switch OLED и Lite, Steam Deck OLED, Xbox Series X, Meta Quest 3 и 3S.')]),
    ('foto-i-video', 'Фото и видео', 'Купить DJI и экшн-камеры в Ханты-Мансийске', 'камеры и стабилизаторы',
     ['DJI Osmo Pocket, Osmo Action, Osmo 360, Osmo Mobile и стабилизаторы RS, компактные камеры есть в магазине ЮZ.',
      'Подберём технику для влогов, путешествий и съёмки на телефон. Гарантия магазина 12 месяцев.'],
     [('Что выбрать для влога?', 'DJI Osmo Pocket: компактная камера со стабилизатором, Osmo Mobile: стабилизатор для смартфона, Osmo Action: для спорта и экстрима.')]),
]

# --- страницы брендов Android (группа в прайсе → отдельная страница) ---
BRAND_FAQ = lambda b: [('%s оригинальные?' % b, 'Да, продаём только новые оригинальные смартфоны %s. Гарантия магазина 12 месяцев.' % b),
                       ('Можно купить %s в рассрочку?' % b, 'Да, до 36 месяцев без первого взноса, нужен только паспорт.'),
                       ('Можно сдать старый телефон в trade-in?', 'Да, оценим при вас за 15 минут и зачтём в стоимость нового смартфона.'),
                       ('Есть доставка?', 'По Ханты-Мансийску привезём в день заказа, в другие города ХМАО отправим транспортной компанией.')]
BRANDS = [
    ('xiaomi', 'Android', 'Купить Xiaomi, Redmi и POCO в Ханты-Мансийске', 'Xiaomi',
     ['Смартфоны Xiaomi в магазине ЮZ: флагманы Xiaomi 18 Pro и 17 Ultra, недорогие Redmi и Redmi Note, игровые POCO F и X. Все модели новые и оригинальные.',
      'Поможем выбрать Xiaomi под бюджет, перенесём данные со старого телефона и настроим. Гарантия магазина 12 месяцев, рассрочка до 36 месяцев.'], BRAND_FAQ('Xiaomi'), 'Xiaomi'),
    ('honor', 'Android', 'Купить Honor в Ханты-Мансийске', 'Honor',
     ['Смартфоны Honor в магазине ЮZ: Honor Magic 8 Pro, Honor 600 и 600 Pro, Honor 400 и доступные Honor X. Все модели новые и оригинальные.',
      'Перенесём данные со старого телефона, примем ваш смартфон в trade-in. Гарантия магазина 12 месяцев, рассрочка до 36 месяцев.'], BRAND_FAQ('Honor'), 'Honor'),
    ('huawei', 'Android', 'Купить Huawei в Ханты-Мансийске', 'Huawei',
     ['Смартфоны Huawei в магазине ЮZ: Huawei Mate 80 Pro, Pura 90S Pro и Pura 80 Ultra, линейка Nova. Все модели новые и оригинальные.',
      'Поможем настроить Huawei и установить нужные приложения, перенесём данные. Гарантия магазина 12 месяцев, рассрочка до 36 месяцев.'], BRAND_FAQ('Huawei'), 'Huawei'),
    ('google-pixel', 'Android', 'Купить Google Pixel в Ханты-Мансийске', 'Google Pixel',
     ['Смартфоны Google Pixel в магазине ЮZ: Pixel 11, 11 Pro, 11 Pro XL, складной Pixel 11 Pro Fold и прошлые поколения.',
      'Pixel получают обновления Android первыми и славятся камерой. Гарантия магазина 12 месяцев, рассрочка до 36 месяцев.'], BRAND_FAQ('Google Pixel'), 'Google Pixel'),
    ('realme', 'Android', 'Купить Realme в Ханты-Мансийске', 'Realme',
     ['Смартфоны Realme в магазине ЮZ: Realme GT, 16 Pro и 16 Pro+, доступные Realme C и P. Все модели новые и оригинальные.',
      'Подберём модель под бюджет и перенесём данные. Гарантия магазина 12 месяцев, рассрочка до 36 месяцев.'], BRAND_FAQ('Realme'), 'Realme'),
    ('oneplus', 'Android', 'Купить OnePlus в Ханты-Мансийске', 'OnePlus',
     ['Смартфоны OnePlus в магазине ЮZ: OnePlus 16, 15, 15T, 15R и компактный 13S. Все модели новые и оригинальные.',
      'Перенесём данные и настроим телефон. Гарантия магазина 12 месяцев, рассрочка до 36 месяцев.'], BRAND_FAQ('OnePlus'), 'OnePlus'),
    ('yandeks-stantsiya', 'Аудио', 'Купить Яндекс Станцию в Ханты-Мансийске', 'Яндекс Станция',
     ['Умные колонки с Алисой в магазине ЮZ: Яндекс Станция Мини 3 и Яндекс Станция Стрит в разных цветах.',
      'Покажем, как подключить Станцию к телефону и умному дому. Гарантия магазина 12 месяцев, доставка по Ханты-Мансийску в день заказа.'],
     [('Какую Яндекс Станцию выбрать?', 'Станция Мини 3 — компактная колонка для комнаты или кухни. Станция Стрит — портативная, с защитой от воды и аккумулятором, можно брать с собой.'),
      ('Станция оригинальная?', 'Да, новая оригинальная техника Яндекса. Гарантия магазина 12 месяцев.')], 'Яндекс'),
    ('marshall', 'Аудио', 'Купить наушники Marshall в Ханты-Мансийске', 'Marshall',
     ['Накладные беспроводные наушники Marshall Major V в магазине ЮZ: чёрные, синие, коричневые и кремовые.',
      'Major V работают больше 100 часов без подзарядки. Гарантия магазина 12 месяцев, доставка по Ханты-Мансийску в день заказа.'],
     BRAND_FAQ('Marshall')[:2], 'Marshall'),
    ('garmin', 'Умные часы', 'Купить Garmin в Ханты-Мансийске', 'Garmin',
     ['Устройства Garmin в магазине ЮZ: умные часы Cirqa в разных размерах и цветах и велокомпьютер Edge 540.',
      'Garmin выбирают для бега, велосипеда и походов: точный GPS и долгая работа без зарядки. Гарантия магазина 12 месяцев.'],
     BRAND_FAQ('Garmin')[:2], 'Garmin'),
    ('samsung-galaxy-watch', 'Умные часы', 'Купить Samsung Galaxy Watch в Ханты-Мансийске', 'Samsung Galaxy Watch',
     ['Часы Samsung Galaxy Watch 9, Watch 8, Watch 8 Classic и Watch 8 Ultra, а также умное кольцо Galaxy Ring в магазине ЮZ.',
      'Подключим часы к вашему смартфону и настроим. Гарантия магазина 12 месяцев, рассрочка до 36 месяцев.'],
     BRAND_FAQ('Samsung Galaxy Watch')[:2], 'Samsung'),
    ('ray-ban-meta', 'Умные очки', 'Купить очки Ray-Ban Meta в Ханты-Мансийске', 'Ray-Ban Meta',
     ['Умные очки Ray-Ban Meta второго поколения в магазине ЮZ: Blayzer Optics, Headliner и Scriber Optics. Камера, динамики и микрофоны в оправе Ray-Ban.',
      'Поможем подключить очки к телефону. Гарантия магазина 12 месяцев, доставка по Ханты-Мансийску в день заказа.'],
     BRAND_FAQ('Ray-Ban Meta')[:2], 'Ray-Ban Meta'),
    ('playstation-5', 'Консоли', 'Купить PlayStation 5 в Ханты-Мансийске', 'PlayStation 5',
     ['PlayStation 5 Slim с дисководом и Digital, PS5 Pro, шлем PS VR2, геймпады DualSense и DualSense Edge в магазине ЮZ.',
      'Поможем настроить приставку и учётную запись. Гарантия магазина 12 месяцев, рассрочка до 36 месяцев, доставка по Ханты-Мансийску в день заказа.'],
     [('Какую PS5 выбрать?', 'PS5 Slim с дисководом — если покупаете игры на дисках. Digital — только цифровые игры. PS5 Pro — для 4K и максимальной графики.'),
      ('Можно купить PS5 в рассрочку?', 'Да, до 36 месяцев без первого взноса, нужен только паспорт.'),
      ('Приставка оригинальная?', 'Да, новая оригинальная PlayStation 5. Гарантия магазина 12 месяцев.')], 'PlayStation'),
    ('nintendo-switch', 'Консоли', 'Купить Nintendo Switch в Ханты-Мансийске', 'Nintendo Switch',
     ['Nintendo Switch 2, Switch OLED, Switch с увеличенной батареей и компактная Switch Lite в магазине ЮZ.',
      'Поможем выбрать модель для дома или поездок. Гарантия магазина 12 месяцев, доставка по Ханты-Мансийску в день заказа.'],
     [('Какую Nintendo Switch выбрать?', 'Switch 2 — новая и самая мощная. Switch OLED — с большим ярким экраном. Switch Lite — только портативная, самая лёгкая и доступная.'),
      ('Приставка оригинальная?', 'Да, новая оригинальная Nintendo. Гарантия магазина 12 месяцев.')], 'Nintendo'),
]
CATS += [
    ('naushniki', 'Аудио', 'Купить наушники и колонки в Ханты-Мансийске', 'наушники и колонки',
     ['Беспроводные наушники и колонки в магазине ЮZ: Samsung Galaxy Buds, Sony WH-1000XM6, Beats, Marshall Major V, умные колонки Яндекс Станция. AirPods — в отдельном разделе.',
      'Подключим наушники к телефону и поможем выбрать модель под звонки, спорт или шумоподавление. Гарантия магазина 12 месяцев, доставка по Ханты-Мансийску в день заказа.'],
     [('Какие наушники выбрать?', 'Для iPhone удобнее всего AirPods, для Samsung — Galaxy Buds. С шумоподавлением для дороги и офиса — Sony WH-1000XM6 или Galaxy Buds 4 Pro. Накладные с долгой батареей — Marshall Major V.'),
      ('Наушники оригинальные?', 'Да, продаём только новую оригинальную технику. Гарантия магазина 12 месяцев.'),
      ('Есть доставка?', 'По Ханты-Мансийску привезём в день заказа, в другие города ХМАО отправим транспортной компанией.')]),
    ('umnye-chasy', 'Умные часы', 'Купить умные часы в Ханты-Мансийске', 'умные часы',
     ['Умные часы и браслеты в магазине ЮZ: Samsung Galaxy Watch 9, Watch 8 и 8 Classic, Galaxy Watch 8 Ultra, кольцо Galaxy Ring, Garmin и Google Fitbit. Apple Watch — в отдельном разделе.',
      'Подключим часы к телефону и настроим уведомления и тренировки. Гарантия магазина 12 месяцев, рассрочка до 36 месяцев.'],
     [('Какие умные часы выбрать для Android?', 'Для Samsung и других Android — Galaxy Watch. Для бега, велосипеда и походов — Garmin. Для iPhone — Apple Watch.'),
      ('Часы оригинальные?', 'Да, только новая оригинальная техника. Гарантия магазина 12 месяцев.'),
      ('Есть доставка?', 'По Ханты-Мансийску привезём в день заказа, в другие города ХМАО отправим транспортной компанией.')]),
]
ACC_FAQ = [('Аксессуары оригинальные?', 'Да. Продаём только оригинальные аксессуары брендов uBear, Magssory, Airity, Remax и Apple, без копий.'),
           ('Поможете подобрать чехол и стекло к телефону?', 'Да. Скажите модель телефона — подберём по размеру, а стекло наклеим прямо в магазине.'),
           ('Есть доставка?', 'По Ханты-Мансийску привезём в день заказа, в другие города отправим СДЭК. Можно забрать самому на Комсомольской, 49.')]
CATS += [
    ('aksessuary', ACC, 'Купить аксессуары для iPhone в Ханты-Мансийске', 'аксессуары',
     ['Чехлы, защитные стёкла, стёкла на камеру, беспроводные зарядки, пауэрбанки, кабели, кардхолдеры и Apple Pencil в магазине ЮZ на Комсомольской, 49. Только оригинальные аксессуары uBear, Magssory, Airity, Remax и Apple.',
      'Подберём чехол и стекло под вашу модель iPhone и наклеим стекло при вас. По Ханты-Мансийску привезём в день заказа, в другие города отправим СДЭК.'],
     ACC_FAQ),
]
# Подразделы аксессуаров (тип в accessories.csv = группа на сайте) и страницы брендов аксессуаров (поиск по названию).
ACC_SUBS = [
    ('chehly-dlya-iphone', ACC, 'Купить чехол для iPhone в Ханты-Мансийске', 'чехлы для iPhone',
     ['Чехлы uBear, Magssory и Airity для iPhone 18 Pro, 17 Pro, 17 Pro Max, 17 и Air: силиконовые, кожаные, из арамида и поликарбоната, многие с магнитами MagSafe.',
      'Подберём чехол точно под вашу модель и покажем вживую на Комсомольской, 49.'], ACC_FAQ, 'Чехлы'),
    ('zashchitnye-stekla', ACC, 'Купить защитное стекло на iPhone в Ханты-Мансийске', 'защитные стёкла',
     ['Защитные стёкла Remax и uBear для iPhone от 11 до 18 Pro Max: прозрачные 3D и «антишпион», которые скрывают экран от соседей.',
      'Наклеим стекло в магазине ровно и без пузырей, пока вы ждёте.'], ACC_FAQ, 'Защитные стёкла'),
    ('stekla-na-kameru', ACC, 'Купить защитное стекло на камеру iPhone в Ханты-Мансийске', 'стёкла на камеру',
     ['Стёкла uBear Lens Shield на блок камер iPhone 18 Pro, 17 Pro, 17 Pro Max, 17 и Air: металлическая рамка или нано-покрытие, камера снимает без бликов.',
      'Поставим стекло на камеру при вас.'], ACC_FAQ, 'Стёкла на камеру'),
    ('besprovodnye-zaryadki', ACC, 'Купить беспроводную зарядку для iPhone в Ханты-Мансийске', 'беспроводные зарядки',
     ['Беспроводные зарядки uBear и Magssory с MagSafe и Qi2: станции 3 в 1 для iPhone, Apple Watch и AirPods, складные дорожные модели.',
      'Покажем, какая станция подойдёт к вашим устройствам.'], ACC_FAQ, 'Беспроводные зарядки'),
    ('pauerbanki', ACC, 'Купить пауэрбанк (внешний аккумулятор) в Ханты-Мансийске', 'пауэрбанки',
     ['Магнитные пауэрбанки uBear, Magssory и Airity с MagSafe и Qi2 на 5 000 и 10 000 мАч: крепятся к iPhone и заряжают без провода.',
      'Подберём ёмкость под ваш телефон.'], ACC_FAQ, 'Пауэрбанки'),
    ('zaryadnye-ustroystva', ACC, 'Купить зарядное устройство для iPhone и MacBook в Ханты-Мансийске', 'зарядные устройства',
     ['Оригинальные адаптеры Apple USB-C от 20 до 140 Вт для iPhone, iPad и MacBook, компактные GaN-зарядки Magssory и сетевые зарядки на два порта.',
      'Подскажем, какой мощности нужен адаптер для вашего устройства.'], ACC_FAQ, 'Зарядки'),
    ('kabeli', ACC, 'Купить кабель USB-C в Ханты-Мансийске', 'кабели',
     ['Кабели USB-C Apple и Magssory до 240 Вт, в том числе магнитные, для iPhone, iPad и MacBook.', 'Подберём длину и мощность.'], ACC_FAQ, 'Кабели'),
    ('kardkholdery-magsafe', ACC, 'Купить кардхолдер MagSafe в Ханты-Мансийске', 'кардхолдеры',
     ['Магнитные кардхолдеры uBear Split и Magssory из эко-кожи: крепятся к iPhone на MagSafe, держат карты и снимаются одним движением.', 'Покажем цвета вживую.'], ACC_FAQ, 'Кардхолдеры'),
    ('apple-pencil', ACC, 'Купить Apple Pencil в Ханты-Мансийске', 'Apple Pencil',
     ['Apple Pencil Pro, Apple Pencil USB-C и Apple Pencil 2 для iPad — оригинальные стилусы Apple.', 'Подскажем, какой Pencil подходит к вашему iPad.'],
     [('Какой Apple Pencil подойдёт к моему iPad?', 'Apple Pencil Pro — к iPad Air и iPad Pro на чипах M4 и M5. Apple Pencil USB-C — к большинству iPad с разъёмом USB-C. Назовите модель iPad — подскажем точно.')] + ACC_FAQ[2:], 'Стилусы'),
]
ACC_BRAND_PAGES = [
    ('ubear', ACC, 'Купить аксессуары uBear в Ханты-Мансийске', 'аксессуары uBear',
     ['Чехлы, стёкла на камеру, беспроводные зарядки, пауэрбанки и кардхолдеры uBear в магазине ЮZ.', 'Только оригинальная продукция uBear.'], ACC_FAQ, None, 'uBear', True),
    ('magssory', ACC, 'Купить аксессуары Magssory в Ханты-Мансийске', 'аксессуары Magssory',
     ['Магнитные зарядки, пауэрбанки, кабели, кардхолдеры, чехлы и метки Magssory с поддержкой MagSafe и Find My.', 'Только оригинальная продукция Magssory.'], ACC_FAQ, None, 'Magssory', True),
    ('airity', ACC, 'Купить чехлы Airity в Ханты-Мансийске', 'чехлы Airity',
     ['Чехлы Airity для iPhone 17 Pro, 17 Pro Max и 18 Pro Max: арамид, 600D и дизайнерские серии.', 'Только оригинальная продукция Airity.'], ACC_FAQ, None, 'Airity', True),
    ('remax', ACC, 'Купить защитные стёкла Remax в Ханты-Мансийске', 'стёкла Remax',
     ['Защитные стёкла Remax 3D и «антишпион» для iPhone от 11 до 18 Pro Max.', 'Наклеим стекло при вас.'], ACC_FAQ, None, 'Remax', True),
]
# Страницы серий (часть раздела по началу названия модели): адрес, категория, H1, название, вводный текст, FAQ, группа, префикс модели.
# На странице каталог сразу отфильтрован по префиксу (data-q у #yzCat). Запрос «айфон 18» — серия, обычного iPhone 18 в прайсе нет.
SERIES = [
    ('iphone-18', 'iPhone', 'Купить iPhone 18 в Ханты-Мансийске', 'iPhone 18',
     ['Вся линейка iPhone 18 в магазине ЮZ на Комсомольской, 49: iPhone 18 Pro и iPhone 18 Pro Max во всех цветах и объёмах памяти. Только новые оригинальные айфоны, серийный номер проверяем при вас.',
      'Купить айфон 18 можно в рассрочку до 36 месяцев без первого взноса, старый телефон зачтём в trade-in. По Ханты-Мансийску привезём в день заказа, в другие города ХМАО отправим транспортной компанией.'],
     [('Какие iPhone 18 есть в наличии?', 'iPhone 18 Pro и iPhone 18 Pro Max в разных цветах и объёмах памяти. Актуальные цены и наличие — в списке на этой странице. Если нужного варианта нет на витрине, привезём под заказ.'),
      ('Что выбрать: iPhone 18 Pro или 18 Pro Max?', 'Главное отличие — размер: у Pro Max больше экран и аккумулятор, Pro удобнее держать одной рукой. Подробное сравнение — в нашем блоге, а вживую обе модели можно сравнить в магазине.'),
      ('Можно купить iPhone 18 в рассрочку?', 'Да, до 36 месяцев без первого взноса. Нужен только паспорт, решение банка приходит за 5–10 минут.'),
      ('Сколько дадут за старый iPhone в trade-in?', 'До 99 000 ₽, зависит от модели, памяти и состояния. Оценим при вас за 15 минут и зачтём в стоимость iPhone 18.'),
      ('iPhone 18 оригинальные? Какая гарантия?', 'Да, только новые оригинальные iPhone. Серийный номер проверяем на сайте Apple вместе с вами. Гарантия магазина 12 месяцев.')],
     None, 'iPhone 18'),
]
CAT_OF = {c[1]: c for c in CATS}
MODEL_CATS = ['iPhone', 'Mac', 'iPad', 'Apple Watch', 'AirPods', 'Samsung', 'Dyson', 'Android', ACC]
TR = dict(zip('абвгдеёжзийклмнопрстуфхцчшщъыьэюя', ['a', 'b', 'v', 'g', 'd', 'e', 'e', 'zh', 'z', 'i', 'y', 'k', 'l', 'm', 'n', 'o', 'p', 'r',
              's', 't', 'u', 'f', 'kh', 'ts', 'ch', 'sh', 'shch', '', 'y', '', 'e', 'yu', 'ya']))
def acc_url(n):
    t = ''.join(TR.get(ch, ch) for ch in n.lower().replace('+', ' plus').replace('ё', 'е'))
    t = re.sub(r'[^a-z0-9]+', '-', t).strip('-')
    if len(t) > 80:
        t = t[:80].rsplit('-', 1)[0]
    return t
def low1(n):  # «Купить чехол …», а не «Купить Чехол …»
    return n[0].lower() + n[1:] if re.match('[А-ЯЁ][а-яё]', n) else n
ACC_BRAND_NAMES = ['uBear', 'Magssory', 'Airity', 'Remax', 'Apple']
def acc_brand(n):
    return next((b for b in ACC_BRAND_NAMES if b.lower() in n.lower()), '')
def fits_to(p, dev, dev_cat):
    for t in p.get('fits') or []:
        l = t.lower()
        if l == 'все' or l == dev.lower() or l == dev_cat.lower() or (l.endswith('*') and dev.lower().startswith(l[:-1].strip())):
            return True
    return False

def ru_list(xs):
    xs = [x for x in xs if x]
    return xs[0] if len(xs) == 1 else (', '.join(xs[:-1]) + ' и ' + xs[-1]) if xs else ''

def uniq(xs):
    out = []
    for x in xs:
        if x and x not in out:
            out.append(x)
    return out

# --- страницы моделей ---
MP = []
for name, m in M.items():
    if m['cat'] not in MODEL_CATS:
        continue
    v = m['v']
    mn = min(x['price'] for x in v); mx = max(x['price'] for x in v)
    mems = uniq(x['mem'] for x in v); cols = uniq(x['col'] for x in v); opts = uniq(x['opt'] for x in v)
    url = re.sub(r'^(стайлер|фен|выпрямитель)-', '', slugify(name.replace('+', ' plus')))  # адрес страницы — только латиница
    url = re.sub(r'[^a-z0-9-]+', '', url).strip('-')
    if m['cat'] == ACC:
        url = acc_url(name)
        while url in {x['url'] for x in MP}:
            url += '-2'
    MP.append({'name': name, 'slug': re.sub(r'[^a-z0-9а-я]+', '-', name.lower()), 'url': url, 'cat': m['cat'], 'grp': m.get('grp', ''), 'min': mn, 'max': mx, 'mems': mems,
               'cols': cols, 'opts': opts, 'v': v, 'photo': m['photo'], 'fits': m.get('fits', [])})

# --- страницы «модель + память» и «модель + цвет» для смартфонов: свои цены и варианты на каждой ---
VAR_CATS = ('iPhone', 'Samsung')
def var_slug(t):
    t = t.lower().replace(' гб', 'gb').replace(' тб', 'tb').replace('гб', 'gb').replace('тб', 'tb').replace('+', ' plus')
    t = re.sub(r'[^a-z0-9]+', '-', t).strip('-')
    return t
_taken = {p['url'] for p in MP}
KIDS = []
for p in list(MP):
    if p['cat'] not in VAR_CATS:
        continue
    kids = []
    for key, vals in (('mem', p['mems']), ('col', p['cols'])):
        vals = [x for x in vals if x]
        if len(vals) < 2:
            continue
        for val in vals:
            sl = var_slug(val)
            if not sl:
                continue
            url = p['url'] + '-' + sl
            if url in _taken:
                continue
            v = [x for x in p['v'] if x[key] == val]
            k = dict(p, name='%s %s' % (p['name'], val), url=url, v=v, parent=p, kids=[],
                     min=min(x['price'] for x in v), max=max(x['price'] for x in v),
                     mems=uniq(x['mem'] for x in v), cols=uniq(x['col'] for x in v), opts=uniq(x['opt'] for x in v))
            _taken.add(url); kids.append(k)
    p['kids'] = kids
    KIDS += kids
MP += KIDS

def ayfon(name):
    mm = re.match(r'iPhone\s+(.*)', name)
    return ('айфон ' + mm.group(1)) if mm else ''

def model_title(p):
    a = ayfon(p['name'])
    nm_ = ('%s (%s)' % (p['name'], a)) if a else low1(p['name']) if p['cat'] == ACC else p['name']
    return 'Купить %s в Ханты-Мансийске — цена от %s | ЮZ Store' % (nm_, rub(p['min']))

def cap(t, n=200):
    # режем целыми кусками: сначала убираем хвостовые фразы/пункты, а не слова посередине
    while len(t) > n:
        head, sep, tail = t.rstrip('.').rpartition('. ')
        if sep and len(head) > 60 and tail.startswith('Комсомольская'):
            t = head + '.'; continue
        head, sep, _ = t.rstrip('.').rpartition(', ')
        if not sep or len(head) < 60:
            return t[:n].rsplit(' ', 1)[0].rstrip(',;:.') + '…'
        t = head + '.'
    return t

def fits_txt(p):
    f = [x for x in (p.get('fits') or []) if x.lower() != 'все']
    return ru_list(f[:6]) if f else ''

def model_descr(p):
    if p['cat'] == ACC:
        cols = ', '.join(p['cols'][:3])
        return cap('%s в Ханты-Мансийске — цена от %s.%s%s Оригинал, в наличии в магазине ЮZ, Комсомольская, 49.' % (
            p['name'], rub(p['min']), (' Подходит к: %s.' % fits_txt(p)) if fits_txt(p) else '', (' Цвета: %s.' % cols) if cols else ''))
    mem = ''
    ms = [m for m in p['mems'] if m]
    if ms:
        mem = ms[0] if len(ms) == 1 else '%s – %s' % (ms[0], ms[-1])
    cols = ', '.join(p['cols'][:3]) + (' и другие' if len(p['cols']) > 3 else '')
    s = '%s в Ханты-Мансийске — цена от %s.%s%s Оригинал, гарантия 12 мес, рассрочка до 36 мес%s. Комсомольская, 49.' % (
        p['name'], rub(p['min']), (' Цвета: %s.' % cols) if cols else '', (' Память: %s.' % mem) if mem else '',
        ', trade-in' if p['cat'] in ('iPhone', 'Samsung') else '')
    return cap(s)

def variants_table(p):
    g = collections.OrderedDict()
    for x in sorted(p['v'], key=lambda x: x['price']):
        k = (x['mem'], x['opt'])
        e = g.setdefault(k, {'price': x['price'], 'cols': []})
        if x['col'] and x['col'] not in e['cols']:
            e['cols'].append(x['col'])
    head = '<tr><th>Вариант</th><th>Цвета</th><th>Цена</th></tr>'
    body = ''.join('<tr><td>%s</td><td>%s</td><td>от %s</td></tr>' % (esc(' · '.join(x for x in k if x) or p['name']), esc(', '.join(e['cols']) or '—'), rub(e['price']))
                   for k, e in g.items())
    return '<table class="seo-tab"><thead>%s</thead><tbody>%s</tbody></table>' % (head, body)

def model_faq(p):
    n = p['name']
    if p['cat'] == ACC:
        q = [('Сколько стоит %s?' % low1(n), 'От %s. Актуальная цена — в карточке на этой странице.' % rub(p['min']))]
        if fits_txt(p):
            q.append(('К каким устройствам подходит?', 'Подходит к: %s. Если сомневаетесь, напишите модель телефона — менеджер подскажет.' % fits_txt(p)))
        q += [('Это оригинал?', 'Да. Продаём только оригинальные аксессуары uBear, Magssory, Airity, Remax и Apple, без копий.'),
              ('Можно купить вместе с телефоном?', 'Да. При покупке смартфона в ЮZ подберём чехол и стекло и наклеим стекло сразу в магазине.'),
              ('Есть доставка?', 'По Ханты-Мансийску привезём в день заказа, в другие города отправим СДЭК. Можно забрать самому на Комсомольской, 49.')]
        return q
    q = [('Сколько стоит %s в Ханты-Мансийске?' % n,
          'От %s%s. Цена зависит от %s; актуальные цены смотрите в карточке на этой странице.' % (rub(p['min']), (' за ' + p['mems'][0]) if p['mems'] and p['mems'][0] else '',
                                                                                      ru_list([x for x, ok in [('объёма памяти', len(p['mems']) > 1), ('цвета', len(p['cols']) > 1), ('варианта', len(p['opts']) > 1)] if ok]) or 'комплектации')),
         ('Можно купить %s в рассрочку?' % n, 'Да, до 36 месяцев без первого взноса. Нужен только паспорт, решение банка приходит за 5–10 минут.'),
         ('%s оригинальный? Какая гарантия?' % n, 'Только новая оригинальная техника, серийный номер проверяем при вас. Гарантия магазина 12 месяцев.'),
         ('Есть доставка?', 'По Ханты-Мансийску привезём в день заказа, в другие города отправим транспортной компанией. Можно забрать самому на Комсомольской, 49.')]
    if p['cat'] in ('iPhone', 'Samsung'):
        q.insert(2, ('Можно сдать старый телефон в trade-in?', 'Да. Оценим при вас за 15 минут и зачтём до 99 000 ₽ в стоимость нового %s.' % n))
    return q

def faq_html(q):
    return '<div class="qa">' + ''.join('<details><summary>%s<i></i></summary><p>%s</p></details>' % (esc(a), esc(b)) for a, b in q) + '</div>'

def crumbs(items):
    return '<nav class="crumbs" aria-label="Хлебные крошки">' + '<span>/</span>'.join(
        ('<a href="%s">%s</a>' % (u, esc(t))) if u else '<span>%s</span>' % esc(t) for t, u in items) + '</nav>'

def ld_crumbs(items):
    return {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
        {"@type": "ListItem", "position": i + 1, "name": t, **({"item": "https://youz.store" + u} if u else {})} for i, (t, u) in enumerate(items)]}

def ld_faq(q):
    return {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
        {"@type": "Question", "name": a, "acceptedAnswer": {"@type": "Answer", "text": b}} for a, b in q]}

def ld_tags(objs):
    return ''.join('<script type="application/ld+json">%s</script>\n' % json.dumps(o, ensure_ascii=False).replace('</', '<\\/') for o in objs)

CAT_PATH = {c[1]: '/' + c[0] for c in CATS}
CAT_NAME = {c[1]: c[3] for c in CATS}
BRAND_OF = {b[6]: ('/' + b[0], b[3]) for b in BRANDS if b[1] == 'Android'}
ACC_SUB_OF = {c[6]: ('/' + c[0], c[3][:1].upper() + c[3][1:]) for c in ACC_SUBS}
def cat_crumb(p):  # для Android — страница бренда
    if p['cat'] == ACC and p.get('grp') in ACC_SUB_OF:
        u, n = ACC_SUB_OF[p['grp']]; return (n, u)
    if p['cat'] == 'Android' and p.get('grp') in BRAND_OF:
        u, n = BRAND_OF[p['grp']]; return (n, u)
    return (CAT_NAME.get(p['cat'], p['cat']), CAT_PATH.get(p['cat'], '/catalog'))

def model_crumbs(p):
    cr = [('Главная', '/'), cat_crumb(p)]
    if p['cat'] == ACC and cr[1][1] != '/aksessuary':
        cr.insert(1, ('Аксессуары', '/aksessuary'))
    if p.get('parent'):
        cr.append((p['parent']['name'], '/' + p['parent']['url']))
    return cr + [(p['name'], '')]

# --- «Аксессуары для iPhone 17 Pro» и т. п.: модели iPhone, к которым подходят хотя бы 3 аксессуара именно под эту модель ---
ACC_P = [x for x in MP if x['cat'] == ACC]
ACC_DEV = {}  # имя iPhone → адрес страницы «Аксессуары для …»
ACC_DEV_PAGES = []
for d in [x for x in MP if x['cat'] == 'iPhone' and not x.get('parent')]:
    exact = [a for a in ACC_P if any(t.lower() == d['name'].lower() for t in a['fits'])]
    if len(exact) < 3:
        continue
    u = 'aksessuary-dlya-' + d['url']
    ACC_DEV[d['name']] = u
    ACC_DEV_PAGES.append((u, ACC, 'Аксессуары для %s в Ханты-Мансийске' % d['name'], 'аксессуары для %s' % d['name'],
        ['Чехлы, защитные стёкла, стёкла на камеру, беспроводные зарядки и пауэрбанки, которые подходят к %s. Только оригинальные аксессуары uBear, Magssory, Airity, Remax и Apple.' % d['name'],
         'Купили %s в ЮZ — подберём чехол и наклеим стекло сразу в магазине. По Ханты-Мансийску доставим в день заказа.' % d['name']],
        ACC_FAQ, None, None, False, d['name']))

# --- Сургут: доставляем туда курьером, поэтому отдельные страницы «Купить … в Сургуте» по разделам и популярным моделям ---
SUR_FAQ = lambda what: [
    ('Как доставляете %s в Сургут?' % what, 'Курьером до двери: посылка из нашего магазина в Ханты-Мансийске приезжает в Сургут, курьер привозит её вам. Срок и время доставки менеджер согласует при подтверждении заказа.'),
    ('Сколько стоит доставка в Сургут?', 'Бесплатно при заказе от 50 000 ₽. Стоимость доставки меньших заказов назовёт менеджер.'),
    ('Можно проверить заказ при получении?', 'Да. Техника новая и в заводской упаковке, серийный номер можно проверить на сайте Apple или производителя.'),
    ('Можно купить в рассрочку из Сургута?', 'Да, рассрочка до 36 месяцев без первого взноса оформляется дистанционно, нужен только паспорт.'),
    ('Какая гарантия?', 'Гарантия магазина 12 месяцев, как при покупке в магазине на Комсомольской, 49 в Ханты-Мансийске.')]
def sur_intro(what):
    return ['Купить %s в Сургуте можно в магазине ЮZ: выберите модель на сайте или оставьте заявку, менеджер перезвонит за 15 минут, а заказ привезёт курьер прямо к вам домой или в офис в Сургуте.' % what,
            'Только новая оригинальная техника, цены те же, что в нашем магазине в Ханты-Мансийске. Доставка в Сургут бесплатно от 50 000 ₽, рассрочка до 36 месяцев без первого взноса, гарантия магазина 12 месяцев.']
SUR_PAGES = []
_cat_by_slug = {c[0]: c for c in CATS + SERIES}
for sl, what in [('iphone', 'iPhone'), ('iphone-18', 'iPhone 18'), ('samsung', 'Samsung Galaxy'), ('macbook', 'MacBook'), ('ipad', 'iPad'),
                 ('apple-watch', 'Apple Watch'), ('airpods', 'AirPods'), ('dyson', 'Dyson'), ('smartfony-android', 'смартфон на Android'),
                 ('naushniki', 'наушники'), ('igrovye-pristavki', 'игровую приставку'), ('aksessuary', 'аксессуары для iPhone')]:
    c = _cat_by_slug.get(sl)
    if not c:
        continue
    g = c[6] if len(c) > 6 else None; pr = c[7] if len(c) > 7 else None
    SUR_PAGES.append((sl + '-surgut', c[1], 'Купить %s в Сургуте' % what, what, sur_intro(what), SUR_FAQ(what), g, pr, False, None, 'Сургут', None))
for n in ['iPhone 18 Pro', 'iPhone 18 Pro Max', 'iPhone 17 Pro', 'iPhone 17 Pro Max', 'iPhone 17', 'iPhone Air', 'iPhone 17e', 'iPhone 16', 'iPhone 16 Pro',
          'iPhone 15', 'iPhone Duo', 'Samsung Galaxy S26 Ultra', 'Samsung Galaxy S26', 'Samsung Galaxy Z Fold 8', 'Samsung Galaxy Z Flip 8',
          'MacBook Air 13 M5', 'MacBook Air 15 M5', 'MacBook Pro 14 M5', 'MacBook Neo 13 A18', 'iPad 11', 'iPad Air 11 M4', 'iPad Pro 11 M5',
          'AirPods Pro 3', 'AirPods 4', 'AirPods Max 2', 'Apple Watch Series 12', 'Apple Watch Ultra 4', 'Apple Watch SE 3', 'Стайлер Dyson Airwrap HS09']:
    mp = next((x for x in MP if x['name'] == n and not x.get('parent')), None)
    if not mp:
        continue
    what = n.replace('Стайлер ', 'стайлер ')
    SUR_PAGES.append((mp['url'] + '-surgut', mp['cat'], 'Купить %s в Сургуте' % what, what, sur_intro(what), SUR_FAQ(what), None, None, False, None, 'Сургут', n))
SUR_LINKS = [(x[0], x[3]) for x in SUR_PAGES]

def kids_html(p):  # ссылки на страницы памяти и цвета этой модели
    ks = p.get('kids') or []
    if not ks:
        return ''
    return '<h2>%s по памяти и цвету</h2><ul class="seo-list">%s</ul>' % (esc(p['name']), ''.join(
        '<li><a href="/%s">%s</a> — от %s</li>' % (k['url'], esc(k['name']), rub(k['min'])) for k in ks))

def acc_link(p):
    base = (p.get('parent') or p)['name']
    u = ACC_DEV.get(base)
    return ('<h2>Аксессуары для %s</h2><p><a href="/%s">Чехлы, защитные стёкла и зарядки для %s</a> — в наличии в магазине ЮZ.</p>' % (
        esc(base), u, esc(base))) if u else ''

def model_pre(p):
    cat = p['cat']
    if cat == ACC:
        lead = ('%s в наличии в магазине ЮZ в Ханты-Мансийске%s. Цена от %s.%s Посмотреть и проверить можно на Комсомольской, 49; '
                'по городу привезём в день заказа, в другие города отправим СДЭК.') % (
            p['name'], (': ' + ru_list(p['cols'])) if p['cols'] and p['cols'][0] else '', rub(p['min']),
            (' Подходит к: %s.' % fits_txt(p)) if fits_txt(p) else '')
        return ('<div id="yzModel"><section class="wrap seo-pre" style="padding:32px 0">%s<h1>Купить %s в Ханты-Мансийске</h1>'
                '%s<p>%s</p><h2>Цены</h2>%s<h2>Вопросы и ответы</h2>%s</section></div>') % (
            crumbs(model_crumbs(p)), esc(low1(p['name'])),
            ('<img src="%s" alt="%s" width="560" height="560" loading="lazy">' % (esc(p['photo']), esc(p['name']))) if p['photo'] else '',
            esc(lead), variants_table(p), faq_html(model_faq(p)))
    cr = model_crumbs(p)
    a = ayfon(p['name'])
    lead = ('%s в наличии в магазине ЮZ в Ханты-Мансийске%s%s. Цена %s от %s. '
            'Можно посмотреть вживую на Комсомольской, 49, купить в рассрочку до 36 месяцев%s.') % (
        p['name'],
        (': ' + ru_list(p['cols'])) if p['cols'] else '',
        ('; память ' + ru_list(p['mems'])) if p['mems'] and p['mems'][0] else '',
        p['name'], rub(p['min']),
        ' или сдать старый телефон в trade-in' if cat in ('iPhone', 'Samsung') else '')
    extra = ('<p>Ищете, где купить %s в Ханты-Мансийске? В ЮZ продаём только оригинальные новые устройства: серийный номер проверяем при вас, '
             'настраиваем телефон, переносим данные и устанавливаем банковские приложения. К каждому iPhone идёт подарок.</p>' % a) if a else ''
    return ('<div id="yzModel"><section class="wrap seo-pre" style="padding:32px 0">%s<h1>Купить %s в Ханты-Мансийске</h1>'
            '%s<p>%s</p>%s<h2>Цены на %s</h2>%s%s<h2>Вопросы и ответы</h2>%s</section></div>') % (
        crumbs(cr), esc(p['name']),
        ('<img src="%s" alt="%s" width="560" height="560" loading="lazy">' % (esc(p['photo']), esc(p['name']))) if p['photo'] else '',
        esc(lead), extra, esc(p['name']), variants_table(p), kids_html(p) + acc_link(p), faq_html(model_faq(p)))

def model_ld(p):
    cat = p['cat']
    cr = model_crumbs(p)
    brand = acc_brand(p['name']) if cat == ACC else 'Apple' if cat in ('iPhone', 'Mac', 'iPad', 'Apple Watch', 'AirPods') else ('Samsung' if cat == 'Samsung' else 'Dyson' if cat == 'Dyson' else '')
    prod = {"@context": "https://schema.org", "@type": "Product", "name": p['name'],
            "description": model_descr(p), "url": "https://youz.store/" + p['url'],
            **({"image": p['photo']} if p['photo'] else {}),
            **({"brand": {"@type": "Brand", "name": brand}} if brand else {}),
            "offers": {"@type": "AggregateOffer", "priceCurrency": "RUB", "lowPrice": p['min'], "highPrice": p['max'],
                       "offerCount": len(p['v']), "availability": "https://schema.org/InStock",
                       "seller": {"@id": "https://youz.store/#store"}}}
    return ld_tags([STORE, prod, ld_crumbs(cr), ld_faq(model_faq(p))])

# --- «Популярные запросы» (во всех страницах перед подвалом) ---
TOP = ['iPhone 18 Pro', 'iPhone 18 Pro Max', 'iPhone Duo', 'iPhone 17', 'iPhone 17 Pro', 'iPhone 17 Pro Max', 'iPhone Air', 'iPhone 16',
       'iPhone 16 Pro', 'iPhone 16 Pro Max', 'iPhone 15', 'AirPods Pro 3', 'AirPods 4', 'Apple Watch Series 11', 'Apple Watch Ultra 3',
       'MacBook Air 13 M5', 'iPad Air 11 M4', 'Samsung Galaxy S26 Ultra', 'Samsung Galaxy Z Fold 8', 'Стайлер Dyson Airwrap HS09']
slugs_all = {p['name']: p['url'] for p in MP}
popq_links = [('/' + c[0], c[2].replace('Купить ', '')) for c in CATS] + [('/iphone-18', 'iPhone 18 в Ханты-Мансийске')] + \
             [('/' + slugs_all[n], 'Купить ' + n) for n in TOP if n in slugs_all] + \
             [('/xiaomi', 'Xiaomi в Ханты-Мансийске'), ('/honor', 'Honor в Ханты-Мансийске'), ('/huawei', 'Huawei в Ханты-Мансийске'), ('/skolko-stoit-iphone', 'Сколько стоит iPhone'), ('/trade-in', 'Trade-in iPhone'), ('/rassrochka', 'iPhone в рассрочку'), ('/dostavka-hmao', 'Доставка техники по ХМАО'), ('/remont', 'Ремонт iPhone'), ('/zamena-ekrana-iphone', 'Замена экрана iPhone')]
POPQ = ('<!--popq--><section class="popq" aria-label="Популярные запросы"><div class="wrap"><h2>Популярные запросы</h2><div class="popq-l">%s</div></div></section><!--/popq-->'
        % ''.join('<a href="%s">%s</a>' % (u, esc(t)) for u, t in popq_links))

def add_popq(html):
    html = re.sub(r'<!--popq-->.*?<!--/popq-->\n?', '', html, flags=re.S)
    return html  # 27.11.2026: блок «Популярные запросы» убран по решению владельца — функция теперь только вычищает его
    i = html.rfind('<footer')
    return html[:i] + POPQ + '\n' + html[i:] if i >= 0 else html

# --- страницы категорий ---
catalog = (REPO / 'catalog.html').read_text(encoding='utf-8')
CP = []
for c_ in CATS + BRANDS + SERIES + ACC_SUBS + ACC_BRAND_PAGES + ACC_DEV_PAGES + SUR_PAGES:
    slug, cat, h1, plural, intro, faq = c_[:6]; grp = c_[6] if len(c_) > 6 else None; pre = c_[7] if len(c_) > 7 else None
    inname = c_[8] if len(c_) > 8 else False; fit = c_[9] if len(c_) > 9 else None
    city = c_[10] if len(c_) > 10 else None; exact = c_[11] if len(c_) > 11 else None
    ms = sorted([p for p in MP if not p.get('parent') and p['cat'] == cat and (not grp or p['grp'] == grp)
                 and (not pre or (pre.lower() in p['name'].lower() if inname else p['name'].startswith(pre + ' ')))
                 and (not fit or fits_to(p, fit, 'iPhone')) and (not exact or p['name'] == exact)] if cat in MODEL_CATS else
                [{'name': n, 'min': min(x['price'] for x in m['v']), 'url': ''} for n, m in M.items()
                 if m['cat'] == cat and (not grp or m.get('grp') == grp) and not re.search(r'Charging Station|Vertical Stand|дисковод', n)],
                key=lambda p: -p['min'])
    if not ms:
        continue
    mn = min(p['min'] for p in ms)
    if city:
        cr = [('Главная', '/'), ('Доставка по ХМАО', '/dostavka-hmao'), (city, '/surgut'), (plural[:1].upper() + plural[1:], '')]
    elif cat == ACC and slug != 'aksessuary':
        cr = [('Главная', '/'), ('Каталог', '/catalog'), ('Аксессуары', '/aksessuary'), (plural[:1].upper() + plural[1:], '')]
    else:
        cr = [('Главная', '/'), ('Каталог', '/catalog')] + ([(CAT_NAME[cat], CAT_PATH[cat])] if pre else []) + [(plural, '')]
    page = catalog.replace('<div id="yzCat">', '<div id="yzCat" data-cat="%s"%s%s%s>' % (esc(cat), (' data-grp="%s"' % esc(grp)) if grp else '',
                                                                                    (' data-q="%s"' % esc(pre or exact or '')) if (pre or exact) else '',
                                                                                    (' data-fit="%s"' % esc(fit)) if fit else ''), 1)
    page = re.sub(r'<nav class="crumbs"[^>]*>.*?</nav>', crumbs(cr), page, count=1, flags=re.S)
    assert '<h1>Каталог техники в Ханты-Мансийске</h1>' in page, 'H1 каталога в catalog.html изменился: поправь строку ниже'
    page = page.replace('<h1>Каталог техники в Ханты-Мансийске</h1>',
                        '<h1>%s</h1>\n  <p class="cat-lead">%s</p>' % (esc(h1), esc(intro[0])), 1)
    lst = ''.join(('<li><a href="/%s">%s</a> — от %s</li>' % (p['url'], esc(p['name']), rub(p['min']))) if p.get('url') else
                  '<li>%s — от %s</li>' % (esc(p['name']), rub(p['min'])) for p in ms[:40])
    seo = ('<section class="seo-cat"><div class="wrap art-body"><h2>%s в магазине ЮZ</h2><p>%s</p><p>%s</p>'
           '<h2>Цены на %s %s</h2><ul class="seo-list">%s</ul><h2>Вопросы и ответы</h2>%s</div></section>') % (
        esc(plural), esc(intro[0]), esc(intro[1]), esc(plural), 'с доставкой в Сургут' if city else 'в Ханты-Мансийске', lst, faq_html(faq))
    if city:
        seo = seo.replace('<h2>%s в магазине ЮZ</h2>' % esc(plural), '<h2>%s с доставкой в Сургут</h2>' % esc(h1), 1)
    if city:  # ссылки на соседние страницы Сургута
        seo = seo.replace('<h2>Вопросы и ответы</h2>', '<h2>Ещё с доставкой в Сургут</h2><p>%s</p><h2>Вопросы и ответы</h2>' % ', '.join(
            '<a href="/%s">%s</a>' % (u, esc(t)) for u, t in SUR_LINKS if u != slug), 1)
    i = page.index('<section class="cat-list"'); j = page.index('</section>', page.index('</section>', i) + 1)
    # вставляем после всего блока каталога (до подвала)
    k = page.rfind('</main>')
    page = page[:k] + seo + '\n' + page[k:]
    page = add_popq(page)
    (REPO / 'pages' / (slug + '.html')).write_text(page, encoding='utf-8')
    title = '%s — цены от %s | ЮZ Store' % (h1, rub(mn))
    if cat == 'iPhone' and not pre:
        title = 'Купить iPhone (айфон) в Ханты-Мансийске — цены от %s | ЮZ Store' % rub(mn)
    if city:
        title = '%s — цены от %s, доставка курьером | ЮZ Store' % (h1, rub(mn))
    if slug == 'iphone-18':
        title = 'Купить iPhone 18 (айфон 18) в Ханты-Мансийске — цены от %s | ЮZ Store' % rub(mn)
    descr = cap('%s с доставкой курьером — цены от %s. Оригинал, гарантия 12 мес, рассрочка до 36 мес, доставка бесплатно от 50 000 ₽.' % (
        h1, rub(mn))) if city else \
        cap('%s в Ханты-Мансийске: %d товаров в наличии, цены от %s. Только оригинал uBear, Magssory, Airity, Remax и Apple. Доставка в день заказа, СДЭК по России.' % (
        (plural[0].upper() + plural[1:]), len(ms), rub(mn))) if cat == ACC else \
        cap('%s в Ханты-Мансийске от %s: %s и другие. Оригинал, гарантия 12 мес, рассрочка до 36 мес, доставка в день заказа. Комсомольская, 49.' % (
        (plural if plural[:1] == 'i' else plural[0].upper() + plural[1:]), rub(mn), ', '.join(p['name'] for p in ms[:3])))
    itemlist = {"@context": "https://schema.org", "@type": "ItemList", "name": h1, "itemListElement": [
        {"@type": "ListItem", "position": i + 1, "name": p['name'], **({"url": "https://youz.store/" + p['url']} if p.get('url') else {})} for i, p in enumerate(ms[:40])]}
    CP.append({'slug': slug, 'kind': 'cat', 'title': title, 'descr': descr, 'page': 'pages/%s.html' % slug,
               'ld': ld_tags([STORE, itemlist, ld_crumbs(cr), ld_faq(faq)])})

# --- «Популярные запросы» во все остальные страницы репозитория ---
for f in [REPO / 'main.html', REPO / 'catalog.html', REPO / 'model.html'] + sorted((REPO / 'pages').glob('*.html')):
    s = f.read_text(encoding='utf-8')
    s2 = add_popq(s)
    if s2 != s:
        f.write_text(s2, encoding='utf-8')

# --- блоки T123 и список страниц для Тильды ---
OUT = ZAG / 'seo'; OUT.mkdir(exist_ok=True)
model_full = (REPO / 'model.html').read_text(encoding='utf-8')
model_raw = model_full
assert model_raw.count('<div id="yzModel"></div>') == 1
manifest = []
for p in MP:
    html = model_raw.strip().replace('<div id="yzModel"></div>', model_pre(p))
    t = TPL.format(name=p['url'], repo=REPO_NAME, page='model.html', model="window.YZ_MODEL='%s';" % p['slug'],
                   sha=SHA, s7=SHA[:7], html=html, h=hs(model_full), ld=model_ld(p))
    (OUT / (p['url'] + '.txt')).write_text(t, encoding='utf-8')
    manifest.append({'slug': p['url'], 'model': p['slug'], 'kind': 'model', 'name': p['name'], 'title': model_title(p), 'descr': model_descr(p)})
for c in CP:
    raw = (REPO / c['page']).read_text(encoding='utf-8')
    t = TPL.format(name=c['slug'], repo=REPO_NAME, page=c['page'], model='', sha=SHA, s7=SHA[:7], html=raw.strip(), h=hs(raw), ld=c['ld'])
    (OUT / (c['slug'] + '.txt')).write_text(t, encoding='utf-8')
    manifest.append({'slug': c['slug'], 'kind': 'cat', 'title': c['title'], 'descr': c['descr']})
(HERE / 'seo-stranicy.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=1), encoding='utf-8')
print('models', len(MP), 'cats', len(CP), 'commit', SHA[:7])
