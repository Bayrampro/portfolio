(() => {
    const STORAGE_KEY = 'badi-lang';
    const SUPPORTED_LANGS = ['en', 'ru', 'tk'];
    const DEFAULT_LANG = 'ru';
    let businessProjectDefaults = null;
    let businessTimelineDefaults = null;
    const PAGE_FILES = {
        index: 'index.html',
        students: 'for-students.html',
        business: 'for-business.html'
    };
    const LANG_TO_OG_LOCALE = {
        en: 'en_US',
        ru: 'ru_RU',
        tk: 'tk_TM'
    };
    const SOCIAL_LINKS = [
        'https://github.com/Bayrampro',
        'https://www.linkedin.com/in/bayram-annagurbanov-flutter',
        'https://t.me/byprogger'
    ];

    const BUSINESS_PROJECT_TRANSLATIONS = {
        ru: [
            {
                title: 'KAYAK: Авиабилеты, Отели и Авто',
                description: 'Приложение для путешествий: сравнение и бронирование авиабилетов, отелей и аренды авто с умными фильтрами, ценовыми подсказками и инструментами планирования.',
                actions: [''],
                problemTitle: 'Проблема',
                problemBody: 'Нужно было обеспечить быстрый и надежный опыт бронирования авиабилетов, отелей и авто на мобильных устройствах, сохраняя плавность поиска, фильтрации и оформления в условиях реальной нагрузки.',
                architectureTitle: 'Архитектура',
                architectureItems: [
                    'Мобильное приложение на Flutter с модульной feature-архитектурой',
                    'Backend-сервисы на Go с REST API',
                    'PostgreSQL для структурированных данных о поездках и бронированиях',
                    'Контейнеризация сервисов в Docker для стабильных окружений',
                    'Интеграции с провайдерами авиабилетов, отелей и авто'
                ],
                challengesTitle: 'Решенные задачи',
                challengesItems: [
                    'Высокий объем поисковых запросов — оптимизированы Go-обработчики и SQL-запросы',
                    'Большие списки результатов на мобильных — внедрены пагинация и lazy loading во Flutter',
                    'Агрегация данных из разных источников — унифицированы контракты ответов провайдеров'
                ],
                learnedTitle: 'Чему мы научились',
                learnedItems: [
                    'Строить production-уровень UX на Flutter',
                    'Проектировать поддерживаемые и быстрые API на Go',
                    'Оптимизировать индексы и запросы PostgreSQL для поисковых нагрузок',
                    'Выстраивать container-first процессы поставки и деплоя через Docker'
                ]
            },
            {
                title: 'Quotes & Video Maker Editor',
                description: 'Мобильное приложение для создания цитат и коротких видео: шаблоны, стилизация текста, медиатулзы и экспорт для соцсетей.',
                actions: ['Google Play'],
                problemTitle: 'Проблема',
                problemBody: 'Пользователям нужен был простой способ быстро создавать качественные визуалы с цитатами и короткие ролики без сложного софта и длинного экспорта.',
                architectureTitle: 'Архитектура',
                architectureItems: [
                    'Flutter-приложение с переиспользуемыми редакторными компонентами и template-driven UI',
                    'Go API для метаданных ассетов, профилей пользователей и лент контента',
                    'Пайплайн обработки медиа для рендера, сжатия и экспорта',
                    'Интеграция облачного хранилища для шаблонов, медиа и сгенерированных материалов'
                ],
                challengesTitle: 'Решенные задачи',
                challengesItems: [
                    'Медленный рендер на средних устройствах — оптимизирована генерация кадров и кодирование',
                    'Нестабильные результаты текста/макетов — внедрены строгие ограничения шаблонов',
                    'Слишком большие export-файлы — добавлены адаптивные пресеты сжатия под платформы'
                ],
                learnedTitle: 'Чему мы научились',
                learnedItems: [
                    'Делать creator-oriented UX, который остается быстрым при тяжелых медиа-операциях',
                    'Практически проектировать backend на Go для mobile-first контентных продуктов',
                    'Балансировать качество, скорость и размер файла при мобильном видео-экспорте',
                    'Строить переиспользуемые шаблонные системы под рост контентных категорий'
                ]
            },
            {
                title: 'Happy Birthday Wishes with AI',
                description: 'AI-приложение для поздравлений с днем рождения: персонализированные тексты, выбор тона и языка, быстрый шэринг красиво оформленных сообщений.',
                actions: ['Google Play'],
                problemTitle: 'Проблема',
                problemBody: 'Людям нужны содержательные поздравления, но часто сложно быстро придумать личный текст для разных отношений, тонов и языков.',
                architectureTitle: 'Архитектура',
                architectureItems: [
                    'Jetpack Compose UI с модульными экранами для промптов, результатов и шэринга',
                    'Go API для генерации, истории пользователей и шаблонов контента',
                    'Слой оркестрации промптов по тону, языку и типу повода',
                    'Кэширование и rate-контроль для стабильной работы при пиковом трафике'
                ],
                challengesTitle: 'Решенные задачи',
                challengesItems: [
                    'Повторяющиеся AI-ответы — улучшены prompt-стратегии и постобработка',
                    'Медленная генерация в пике — добавлены очереди и оптимизированы Go-обработчики',
                    'Разное качество по языкам — внедрены locale-specific правила шаблонов'
                ],
                learnedTitle: 'Чему мы научились',
                learnedItems: [
                    'Проектировать conversion-oriented AI UX на Jetpack Compose',
                    'Строить устойчивые генерационные пайплайны на Go',
                    'Балансировать персонализацию, задержку и стабильность качества на масштабе',
                    'Делать social-sharing фичи, повышающие retention и virality'
                ]
            },
            {
                title: 'Alumnin Contact Book',
                description: 'Сетевое сообщество для выпускников: поиск верифицированных контактов, организация профессиональных кругов и структурная коммуникация между потоками, факультетами и интересами.',
                actions: ['Google Play', 'App Store'],
                problemTitle: 'Проблема',
                problemBody: 'Сообщества выпускников теряют связи со временем, а обычные мессенджеры плохо подходят для верифицированных профилей, поиска по справочнику и долгосрочного нетворкинга.',
                architectureTitle: 'Архитектура',
                architectureItems: [
                    'Flutter-клиент с модульными фичами чата, справочника и профилей',
                    'Go-микросервисы для аутентификации, индексации контактов и messaging API',
                    'Role-based модель доступа для приватных групп и разделов только для верифицированных выпускников',
                    'Поисковый слой для быстрого поиска по потоку, компании, роли и локации'
                ],
                challengesTitle: 'Решенные задачи',
                challengesItems: [
                    'Дубли и устаревшие контакты — внедрены верификация профилей и merge-потоки',
                    'Низкая находка релевантных выпускников — добавлены smart-фильтры и ранжирование',
                    'Перегрузка уведомлениями в активных группах — внедрены гибкие настройки уведомлений'
                ],
                learnedTitle: 'Чему мы научились',
                learnedItems: [
                    'Проектировать мобильные networking-продукты с балансом privacy и discoverability',
                    'Строить масштабируемые directory/search API на Go',
                    'Повышать retention через onboarding, заполнение профиля и рекомендации',
                    'Структурировать коммуникационные фичи под социальные и профессиональные сценарии'
                ]
            },
            {
                title: 'Gerekli',
                description: 'Мультивендорный маркетплейс для поиска товаров, просмотра категорий и оформления заказов в чистом mobile-first интерфейсе.',
                actions: ['Google Play', 'App Store'],
                problemTitle: 'Проблема',
                problemBody: 'Покупателям нужно единое мобильное приложение для товаров от разных продавцов с консистентным UX, а продавцам — лучшая видимость и удобный поиск товаров.',
                architectureTitle: 'Архитектура',
                architectureItems: [
                    'Flutter-приложение с модульными экранами каталога, карточки товара и checkout',
                    'State-driven UI-подходы для предсказуемого рендера и навигации',
                    'Переиспользуемые виджеты карточек продавцов, товарных сеток и фильтров',
                    'Кроссплатформенная поставка на Android и iOS из единой кодовой базы'
                ],
                challengesTitle: 'Решенные задачи',
                challengesItems: [
                    'Большие каталоги тормозили прокрутку — оптимизированы списки и загрузка изображений',
                    'Сложные комбинации фильтров — улучшены состояния фильтров и сценарии сброса',
                    'Нестабильные макеты на разных устройствах — улучшены adaptive-правила и отступы'
                ],
                learnedTitle: 'Чему мы научились',
                learnedItems: [
                    'Масштабировать Flutter UI-архитектуру для e-commerce сценариев',
                    'Проектировать переиспользуемые компоненты для быстрой итерации фич',
                    'Балансировать производительность и визуальную консистентность на насыщенных экранах',
                    'Повышать мобильную конверсию через более четкую информационную иерархию'
                ]
            }
        ],
        tk: [
            {
                title: 'KAYAK: Uçuşlar, Myhmanhanalar we Awtoulaglar',
                description: 'Uçuşlary, myhmanhanalary we awtoulag kärendesini deňeşdirip bron etmäge mümkinçilik berýän syýahat programmasy.',
                actions: [''],
                problemTitle: 'Mesele',
                problemBody: 'Mobil enjamlarda uçuş, myhmanhana we awtoulag bronlamak üçin çalt hem ygtybarly tejribe döretmek, real trafikte gözleg we bron ädimlerini durnukly saklamak zerurdy.',
                architectureTitle: 'Arhitektura',
                architectureItems: [
                    'Flutter-de modully mobile arhitektura',
                    'REST API berýän Go backend hyzmatlary',
                    'Syýahat we bron maglumatlary üçin PostgreSQL',
                    'Durnukly gurşawlar üçin Docker konteýnerleşdirilen hyzmatlar',
                    'Uçuş, myhmanhana we awtoulag üpjün edijileri bilen integrasiýa'
                ],
                challengesTitle: 'Çözgüt berlen kynçylyklar',
                challengesItems: [
                    'Gözleg soraglarynyň ýokary mukdary — Go handler-leri we SQL soraglary optimizirlendi',
                    'Mobilde uly netije sanawlary — Flutter-de pagination we lazy loading goşuldy',
                    'Köp çeşmeden maglumat birleşdirmek — üpjün ediji jogap kontraktlary birleşdirildi'
                ],
                learnedTitle: 'Öwrenen zatlarymyz',
                learnedItems: [
                    'Flutter bilen production derejeli kross-platforma UX gurmak',
                    'Go-da goldanylýan we öndürijilikli API taslamak',
                    'Gözleg üçin PostgreSQL indeks we sorag optimizasiýasy',
                    'Docker arkaly container-first goýberiş we deploy prosesi'
                ]
            },
            {
                title: 'Quotes & Video Maker Editor',
                description: 'Şablonlar, tekst stilleri we media gurallary bilen sitata postlaryny we gysga wideolary döretmek üçin mobil programmasy.',
                actions: ['Google Play'],
                problemTitle: 'Mesele',
                problemBody: 'Ulanyjylara çylşyrymly programma üpjünçiligi bolmazdan, sitata wizualyny we gysga wideolary çalt taýýarlamak üçin ýönekeý ýol gerekdi.',
                architectureTitle: 'Arhitektura',
                architectureItems: [
                    'Gaýtadan ulanylýan redaktor komponentleri bilen Flutter proýekt',
                    'Aktiw metadata, profil we kontent feedleri üçin Go API',
                    'Render, gysyş we eksport üçin media işleme pipeline',
                    'Şablonlar we döredilen materiallar üçin bulut saklaýyş integrasiýasy'
                ],
                challengesTitle: 'Çözgüt berlen kynçylyklar',
                challengesItems: [
                    'Orta enjamlarda haýal render — frame we kodlama akymy optimizirlendi',
                    'Şablonlarda tekst/layout birmeňzeş däl — berk şablon çäklendirmeleri girizildi',
                    'Eksport faýllary uly — platforma görä adaptasiýaly gysyş presetleri goşuldy'
                ],
                learnedTitle: 'Öwrenen zatlarymyz',
                learnedItems: [
                    'Agyr media amallarynda hem çalt galýan creator UX gurmak',
                    'Mobile-first kontent önümleri üçin Go backend dizaýny',
                    'Mobil wideo eksportynda hil, tizlik we göwrümi deňagramlaşdyrmak',
                    'Täze kategoriýalara giňeýän gaýtadan ulanylýan şablon ulgamlaryny gurmak'
                ]
            },
            {
                title: 'Happy Birthday Wishes with AI',
                description: 'AI arkaly doglan gün gutlaglaryny şahsylaşdyryp döretmäge, ton we dili saýlamaga we çalt paýlaşmaga mümkinçilik berýän programmasy.',
                actions: ['Google Play'],
                problemTitle: 'Mesele',
                problemBody: 'Adamlara manyly gutlag gerek bolýar, emma dürli gatnaşyklara we dillere laýyk şahsy tekst tiz ýazmak köplenç kyn bolýar.',
                architectureTitle: 'Arhitektura',
                architectureItems: [
                    'Prompt, netije we paýlaşma üçin modully Jetpack Compose UI',
                    'Generasiýa soraglary we ulanyjy taryhy üçin Go API',
                    'Ton, dil we ýagdaý boýunça prompt orkestrasiýa gatlagy',
                    'Pik trafikte durnuklylyk üçin cache we rate-control'
                ],
                challengesTitle: 'Çözgüt berlen kynçylyklar',
                challengesItems: [
                    'Gaýtalanýan AI netijeleri — prompt strategiýasy we post-processing gowulandyryldy',
                    'Pikde haýal generasiýa — nobat ulgamy we Go handler optimizasiýasy goşuldy',
                    'Dile görä hiliň tapawudy — locale-specific şablon düzgünleri girizildi'
                ],
                learnedTitle: 'Öwrenen zatlarymyz',
                learnedItems: [
                    'Jetpack Compose-da conversion-oriented AI UX dizaýny',
                    'Go hyzmatlarynda durnukly generasiýa pipeline gurmak',
                    'Şahsylaşdyrma, latency we netijäniň durnuklylygyny deňagramlaşdyrmak',
                    'Retention we virality artdyrýan social-sharing funksiýalaryny goýbermek'
                ]
            },
            {
                title: 'Alumnin Contact Book',
                description: 'Okuwçylar üçin onlaýn community: tassyklanan gatnaşyklary tapmak, hünärmen toparlaryny guramak we ugurlaryň, fakultetleriň arasynda aragatnaşygy ýeňilleşdirmek.',
                actions: ['Google Play', 'App Store'],
                problemTitle: 'Mesele',
                problemBody: 'Uçurymlar wagtyň geçmegi bilen aragatnaşygyny ýitirýär, adaty messengerler bolsa tassyklanan profil we uzak möhletli networking üçin amatly däl.',
                architectureTitle: 'Arhitektura',
                architectureItems: [
                    'Chat, directory we profil üçin modully Flutter klient',
                    'Auth, indekslemek we messaging API üçin Go mikrohyzmatlar',
                    'Private toparlar we tassyklanan uçurymlar üçin role-based giriş modeli',
                    'Akym, kompaniýa, rol we ýerleşiş boýunça çalt gözleg gatlagy'
                ],
                challengesTitle: 'Çözgüt berlen kynçylyklar',
                challengesItems: [
                    'Gaýtalanýan we köne kontaktlar — profil tassyklama we birleşdirme akymlary goşuldy',
                    'Degişli uçurymlary tapmak pesdi — akylly filtr we reýting goşuldy',
                    'Işjeň toparlarda bildiriş köpdi — çeýe bildiriş sazlamalary girizildi'
                ],
                learnedTitle: 'Öwrenen zatlarymyz',
                learnedItems: [
                    'Privacy bilen discoverability arasynda deňagramly mobil networking önüm dizaýny',
                    'Go-da giňelýän directory we search API gurmak',
                    'Onboarding, profil doldurma we teklip akymlary bilen retention ýokarlandyrmak',
                    'Sosial we professional ulanylyş üçin aragatnaşyk funksiýalaryny gurluşdyrmak'
                ]
            },
            {
                title: 'Gerekli',
                description: 'Köp satyjaly marketplace goşundysy: harytlary tapmak, kategoriýalary gezmek we sargyt etmek üçin mobile-first programmasy.',
                actions: ['Google Play', 'App Store'],
                problemTitle: 'Mesele',
                problemBody: 'Alyjylara dürli satyjylaryň harytlary üçin bitewi mobil goşundy, satyjylara bolsa has gowy görünürlik we tapylmak gerekdi.',
                architectureTitle: 'Arhitektura',
                architectureItems: [
                    'Katalog, önüm we checkout üçin modully Flutter ekranlary',
                    'Öňünden çaklap bolýan render we nawigasiýa üçin state-driven UI',
                    'Satyjy kartlary, haryt gridleri we filtrler üçin gaýtadan ulanylýan widgetler',
                    'Bir kod bazasyndan Android we iOS üçin kross-platforma goýberiş'
                ],
                challengesTitle: 'Çözgüt berlen kynçylyklar',
                challengesItems: [
                    'Uly kataloglar scroll-y haýallatdy — sanaw renderi we surat ýüklemesi optimizirlendi',
                    'Çylşyrymly filtr kombinasiýalary — filtr ýagdaýlary we reset akymy düşnükli edildi',
                    'Enjamlarda layout birmeňzeş däldi — responsive düzgünler we aralyklar gowulandyryldy'
                ],
                learnedTitle: 'Öwrenen zatlarymyz',
                learnedItems: [
                    'Commerce görnüşli ekranlar üçin Flutter UI arhitekturasyny giňeltmek',
                    'Funksiýalary çalt iterasiýa etmek üçin gaýtadan ulanylýan komponentler taslamak',
                    'Önüm agyr ekranlarda öndürijilik bilen wizual yzygiderliligi deňagramlaşdyrmak',
                    'Has düşnükli maglumat ierarhiýasy arkaly mobil konwersiýany ýokarlandyrmak'
                ]
            }
        ]
    };

    const BUSINESS_TIMELINE_TRANSLATIONS = {
        ru: {
            frontend: [
                {
                    date: 'Авг 2025 – Настоящее время',
                    role: 'Flutter-разработчик — CRM Product Team',
                    body: 'Разработали кроссплатформенную CRM с нуля (iOS/Android/Web) с <strong>80%+ переиспользованием кода</strong>, запустили за <strong>5 месяцев</strong>, достигли <strong>4 500+ пользователей</strong> и рейтинга <strong>4.8</strong>.',
                    highlights: [
                        'Архитектура offline-sync (Drift + WebSockets + WorkManager): успех синхронизации <strong>99.2%</strong>, потери данных снижены на <strong>95%</strong>, стабильная работа до <strong>14 дней</strong> офлайн',
                        'Рефакторинг (Clean Architecture + Riverpod): cold start ускорен на <strong>40%</strong> (с 2.8с до 1.7с), падения снижены на <strong>75%</strong>, время CI/CD сборок сокращено на <strong>35%</strong>',
                        'Сделали 50+ адаптивных экранов и общую UI-библиотеку: покрытие тестами выросло до <strong>82%</strong>, регрессионные баги снижены на <strong>60%</strong>, скорость поставки фич выросла на <strong>30%</strong>'
                    ]
                },
                {
                    date: 'Ноя 2023 – Июл 2025',
                    role: 'Flutter-разработчик — KAYAK (Москва)',
                    body: 'Работал над кроссплатформенным приложением для бронирования поездок (авиабилеты/отели/авто) с аудиторией <strong>120 000+ MAU</strong> и <strong>500 000+ установок</strong>.',
                    highlights: [
                        'Оптимизация поиска и больших списков (pagination/caching/virtualization): время отклика снижено на <strong>40%</strong>, стабильные <strong>60 FPS</strong>, потребление RAM снижено на <strong>35%</strong>',
                        'Интеграция платежей и динамического ценообразования: доля неуспешных транзакций снижена на <strong>22%</strong>, конверсия бронирований выросла на <strong>15%</strong>',
                        'Миграция архитектуры + автоматизация релизов: количество support-тикетов снижено на <strong>30%</strong>, цикл релиза сокращен на <strong>65%</strong>, crash-free rate достиг <strong>99.6%</strong>'
                    ]
                },
                {
                    date: 'Янв 2022 – Ноя 2023',
                    role: 'Flutter-разработчик — Vade Apps',
                    body: 'Разрабатывал высоконагруженное образовательное приложение с AI-функциями для <strong>90 000+ MAU</strong> и рейтингом <strong>4.7</strong>.',
                    highlights: [
                        'AI-ассистент + стриминг ответов (WebSockets/SSE): время ответа снижено на <strong>45%</strong>, нагрузка на backend снижена на <strong>30%</strong>',
                        'Оптимизация рендера и производительности: стабильные <strong>60 FPS</strong>, потребление RAM снижено на <strong>40%</strong>, инициализация экранов ускорена на <strong>50%</strong>',
                        'Offline + качество релизов: успех sync <strong>99.8%</strong>, восстановление сессии менее чем за <strong>1с</strong>, crash-free users <strong>99.7%</strong>, время hotfix сокращено с <strong>3 дней до 4 часов</strong>, охват вырос на <strong>20%</strong> после i18n/a11y'
                    ]
                },
                {
                    date: 'Итог',
                    role: 'Результаты кроссплатформенной разработки',
                    body: '<strong>10+ релизов</strong> в App Store и Google Play, совокупная аудитория <strong>250 000+ MAU</strong>, с пиковым crash-free уровнем до <strong>99.6%</strong>.',
                    highlights: []
                }
            ],
            backend: [
                {
                    date: 'Дек 2024 – Мар 2026',
                    role: 'Golang-разработчик — Wabrum (Туркменистан)',
                    body: 'Работал над Go-backend маркетплейса Wabrum, поддерживал REST API на Gin и выпускал production-обновления для ключевых пользовательских и коммерческих сценариев.'
                },
                {
                    date: 'Янв 2025 – Апр 2026',
                    role: 'Преподаватель программирования (WEB-разработка) — «Академия ТОП» (Москва)',
                    body: 'Преподавал WEB-разработку (HTML, CSS, JavaScript и основы frontend), вел практические занятия и сопровождал студенческие проекты от идеи до итоговой презентации.'
                }
            ]
        },
        tk: {
            frontend: [
                {
                    date: 'Awg 2025 – Häzirki wagt',
                    role: 'Flutter programmist — CRM Product Team',
                    body: 'Kross-platforma CRM-ni (iOS/Android/Web) noldan gurduk: <strong>80%+ kod gaýtadan ulanylyşy</strong>, goýberiş möhleti <strong>5 aý</strong>, <strong>4 500+ ulanyjy</strong> we dükanda <strong>4.8</strong> bahasy.',
                    highlights: [
                        'Offline sync arhitekturasy (Drift + WebSockets + WorkManager): sync üstünlik derejesi <strong>99.2%</strong>, maglumat ýitgi <strong>95%</strong> azaldy, offline <strong>14 güne</strong> çenli durnukly işledi',
                        'Refaktor (Clean Architecture + Riverpod): cold start <strong>40%</strong> tizleşdi (2.8s-den 1.7s-e), crash sany <strong>75%</strong> azaldy, CI/CD build wagty <strong>35%</strong> gysgaldy',
                        '50+ adaptive ekran we umumy UI library: test coverage <strong>82%</strong>-e ýetdi, regressiw buglar <strong>60%</strong> azaldy, feature goýberiş tizligi <strong>30%</strong> artdy'
                    ]
                },
                {
                    date: 'Noý 2023 – Iýl 2025',
                    role: 'Flutter programmist — KAYAK (Moskwa)',
                    body: 'Uçuş/myhmanhana/awtoulag bronlamak üçin kross-platforma syýahat programmasynda işledim: <strong>120 000+ MAU</strong> we <strong>500 000+ install</strong>.',
                    highlights: [
                        'Gözleg we uly sanaw optimizasiýasy (pagination/caching/virtualization): jogap wagty <strong>40%</strong> azaldy, durnukly <strong>60 FPS</strong>, RAM ulanylyşy <strong>35%</strong> azaldy',
                        'Töleg we dynamic pricing integrasiýasy: şowsuz tranzaksiýalar <strong>22%</strong> azaldy, bron konwersiýasy <strong>15%</strong> artdy',
                        'Arhitektura migrasiýasy + release awtomatizasiýasy: support tiketi <strong>30%</strong> azaldy, release-a sarp edilen wagt <strong>65%</strong> gysgaldy, crash-free derejesi <strong>99.6%</strong>-e ýetdi'
                    ]
                },
                {
                    date: 'Ýan 2022 – Noý 2023',
                    role: 'Flutter programmist — Vade Apps',
                    body: 'AI funksiýaly ýokary ýükli bilim programmasyny işläp taýýarladym: <strong>90 000+ MAU</strong> we <strong>4.7</strong> baha.',
                    highlights: [
                        'AI assistant + streamed jogaplar (WebSockets/SSE): jogap wagty <strong>45%</strong> azaldy, backend ýüki <strong>30%</strong> peseldi',
                        'Render we öndürijilik optimizasiýasy: durnukly <strong>60 FPS</strong>, RAM ulanylyşy <strong>40%</strong> azaldy, ekran başlangyjy <strong>50%</strong> tizleşdi',
                        'Offline + release hili: sync üstünligi <strong>99.8%</strong>, sessiýa dikeldişi <strong>1s</strong>-den pes, crash-free users <strong>99.7%</strong>, hotfix wagty <strong>3 günden 4 sagada</strong> çenli azaldy, i18n/a11y-den soň reach <strong>20%</strong> artdy'
                    ]
                },
                {
                    date: 'Netije',
                    role: 'Kross-platforma goýberiş netijeleri',
                    body: 'App Store we Google Play-de <strong>10+ release</strong>, umumy <strong>250 000+ MAU</strong>, iň ýokary crash-free derejesi <strong>99.6%</strong>.',
                    highlights: []
                }
            ],
            backend: [
                {
                    date: 'Dek 2024 – Mar 2026',
                    role: 'Golang programmist — Wabrum (Türkmenistan)',
                    body: 'Wabrum marketplace-i üçin Go backend üstünde işledim, Gin-däki REST API-lary goldadym we esasy ulanyjy/commerce akymlary üçin production täzelenmeleri goýberdim.'
                },
                {
                    date: 'Ýan 2025 – Apr 2026',
                    role: 'Web programmirleme mugallymy — TOP Akademiýa (Moskwa)',
                    body: 'Web programmirleme (HTML, CSS, JavaScript we frontend esaslary) boýunça sapak berdim, praktiki okuwlary alyp bardym we talyp proýektlerini ideýadan ahyrky prezentasiýa çenli ugrukdyrdym.'
                }
            ]
        }
    };

    const COPY = {
        en: {
            common: {
                navToggleAria: 'Toggle navigation menu',
                switcherAria: 'Language switcher',
                contact: {
                    heading: "Let's Connect",
                    nameLabel: 'Your Name',
                    emailLabel: 'Email Address',
                    messageLabel: 'Your Message',
                    send: 'Send Message',
                    fallbackPrefix: 'If the button does not open your mail app, use',
                    successTitle: 'Message Sent Successfully!',
                    successSubtitle: "Thank you for reaching out. I'll get back to you shortly."
                },
                mail: {
                    subjectPrefix: 'Portfolio Contact from',
                    name: 'Name',
                    email: 'Email',
                    message: 'Message'
                }
            },
            index: {
                meta: {
                    title: 'BaDi Systems | Cross-Platform Product Engineering',
                    description: 'BaDi Systems builds cross-platform products with Flutter, Jetpack Compose, Jaspr, Go, PostgreSQL, and Docker.',
                    ogTitle: 'BaDi Systems | Cross-Platform Product Engineering',
                    ogDescription: 'Mobile, web, and backend engineering with a modern product stack.'
                },
                nav: {
                    home: 'Home',
                    students: 'Students',
                    business: 'Business',
                    about: 'About',
                    contact: 'Contact'
                },
                hero: {
                    greeting: "we're",
                    subtitle: 'Cross-Platform Product Engineering · Mobile · Web · Backend',
                    cta: "Let's Connect",
                    resume: 'Download Resume'
                },
                loader: {
                    loading: 'Loading 3D model...',
                    fail: '3D module failed to initialize. Please disable strict adblock/VPN and refresh.',
                    slow: '3D model is still loading... please wait a few seconds.'
                },
                about: {
                    title: 'About Us',
                    subtitle: 'Building reliable products across mobile, web, and backend',
                    p1: 'We are <span class="about-highlight">BaDi Systems</span>, a product engineering team focused on delivering fast, scalable digital products for startups and growing businesses.',
                    p2: 'Our frontend stack is built for cross-platform delivery with <span class="about-highlight">Flutter, Jetpack Compose, SwiftUI, and Jaspr</span>, allowing us to ship consistent user experiences across iOS, Android, and web.',
                    p3: 'On the backend, we build robust services using <span class="about-highlight">Go, PostgreSQL, and Docker</span>, with an emphasis on clean architecture, performance, and reliable production deployments.',
                    p4: 'We also support students through <span class="about-highlight">mentoring, consultations, and structured guidance</span> for essays, coursework, thesis projects, and lab assignments, helping them understand requirements and deliver stronger academic results.'
                },
                footer: '\u00a9 2026 BaDi Systems. All rights reserved.',
                typewriter: [
                    'Cross-Platform Product Engineering.',
                    'Flutter · Jetpack Compose · SwiftUI · Jaspr.',
                    'Go · PostgreSQL · Docker.',
                    'Student support: guidance on essays, coursework, thesis projects, lab reports, and more.'
                ]
            },
            students: {
                meta: {
                    title: 'For Students | BaDi Systems',
                    description: 'For Students: support for essays, theses, lab works, and coursework projects.',
                    ogTitle: 'For Students | BaDi Systems',
                    ogDescription: 'Student support: essays, theses, lab works, coursework projects, and more.'
                },
                nav: {
                    home: 'Home',
                    business: 'Business',
                    services: 'Services',
                    universities: 'Universities',
                    achievements: 'Achievements',
                    contact: 'Contact'
                },
                hero: {
                    title: 'For Students',
                    subtitle: 'Student support and guidance for academic work'
                },
                services: {
                    title: 'Services',
                    subtitle: 'Student support services and pricing',
                    thesis: 'Thesis',
                    thesisPrice: 'from 5 000 ₽',
                    coursework: 'Coursework Project',
                    courseworkPrice: 'from 1 000 ₽',
                    labs: 'Lab / Practical Assignments',
                    labsPrice: 'from 200 ₽',
                    presentations: 'Interactive Presentations',
                    presentationsPrice: 'from 300 ₽',
                    essay: 'Essay',
                    essayPrice: 'from 350 ₽',
                    reports: 'Reports',
                    reportsPrice: 'from 300 ₽',
                    internship: 'Internship Practice Reports',
                    internshipPrice: 'from 1 000 ₽'
                },
                universities: {
                    title: 'Universities We Supported',
                    subtitle: 'We have helped students from leading Russian universities complete academic projects and course assignments.',
                    names: [
                        'AGU',
                        'Belgorod State University',
                        'ITMO University',
                        'KBGU',
                        'KChGU',
                        'Kazan Federal University',
                        'Kuban State University',
                        'Lomonosov MSU',
                        'RUDN University',
                        'SKFU (NCFU)',
                        'Saint Petersburg State University',
                        'Voronezh State University',
                        'Volgograd State University'
                    ]
                },
                achievements: {
                    title: 'Achievements',
                    subtitle: 'Academic impact backed by real delivery metrics',
                    a1Title: '1,000+ Student Works Delivered',
                    a1Body: 'We helped students complete <strong>420+ essays</strong>, <strong>330+ lab assignments</strong>, <strong>190+ coursework projects</strong>, and <strong>85+ diploma theses</strong> with strong structure, research quality, and on-time delivery.',
                    a1Link: 'Discuss Your Task →',
                    a2Title: '95% Top-Grade Success Rate',
                    a2Body: '<strong>95%</strong> of submitted works were graded as <strong>5 / A-level</strong>. Our guidance focuses on clear methodology, correct formatting, and defense-ready materials that help students present confidently.'
                },
                typewriter: [
                    'Essays.',
                    'Diploma theses.',
                    'Lab reports.',
                    'Coursework projects.',
                    'And much more.'
                ]
            },
            business: {
                meta: {
                    title: 'For Business | BaDi Systems',
                    description: 'For Business: digital solutions for growth, automation, and scale.',
                    ogTitle: 'For Business | BaDi Systems',
                    ogDescription: 'Business solutions: automation, CRM, web/mobile platforms, integrations, and analytics.'
                },
                nav: {
                    home: 'Home',
                    students: 'Students',
                    skills: 'Skills',
                    projects: 'Projects',
                    experience: 'Experience',
                    contact: 'Contact'
                },
                hero: {
                    title: 'For Business',
                    subtitle: 'Business solutions for growth, automation, and scale'
                },
                skills: {
                    title: 'Technical Skills',
                    subtitle: 'Tools and technologies we work with',
                    frontend: 'Frontend',
                    backend: 'Backend',
                    databases: 'Databases',
                    cloud: 'Cloud / Tools',
                    concepts: 'Concepts'
                },
                projects: {
                    title: 'Featured Projects',
                    subtitle: 'Real products, real deployments'
                },
                timeline: {
                    title: 'Experience',
                    subtitle: 'Two development tracks across frontend and backend',
                    switcherAria: 'Experience tracks',
                    frontend: 'Frontend (Mob+Web) dev: Bayram Annagurbanov',
                    backend: 'Backend dev: Didar Kamiljanov'
                },
                typewriter: [
                    'Business process automation.',
                    'CRM systems and internal dashboards.',
                    'Corporate web and mobile platforms.',
                    'Integrations with APIs, ERP, and payments.',
                    'Analytics, reporting, and scalable growth.'
                ]
            }
        },
        ru: {
            common: {
                navToggleAria: 'Открыть или закрыть меню навигации',
                switcherAria: 'Переключатель языка',
                contact: {
                    heading: 'Связаться с нами',
                    nameLabel: 'Ваше имя',
                    emailLabel: 'Email адрес',
                    messageLabel: 'Ваше сообщение',
                    send: 'Отправить сообщение',
                    fallbackPrefix: 'Если кнопка не открыла почтовое приложение, используйте',
                    successTitle: 'Сообщение успешно отправлено!',
                    successSubtitle: 'Спасибо за обращение. Мы свяжемся с вами в ближайшее время.'
                },
                mail: {
                    subjectPrefix: 'Контакт с портфолио от',
                    name: 'Имя',
                    email: 'Email',
                    message: 'Сообщение'
                }
            },
            index: {
                meta: {
                    title: 'BaDi Systems | Кроссплатформенная продуктовая разработка',
                    description: 'BaDi Systems разрабатывает кроссплатформенные продукты на Flutter, Jetpack Compose, Jaspr, Go, PostgreSQL и Docker.',
                    ogTitle: 'BaDi Systems | Кроссплатформенная продуктовая разработка',
                    ogDescription: 'Мобильная, веб- и backend-разработка на современном стеке.'
                },
                nav: {
                    home: 'Главная',
                    students: 'Студентам',
                    business: 'Бизнесу',
                    about: 'О нас',
                    contact: 'Контакты'
                },
                hero: {
                    greeting: 'мы',
                    subtitle: 'Кроссплатформенная продуктовая разработка · Мобайл · Веб · Backend',
                    cta: 'Связаться',
                    resume: 'Скачать резюме'
                },
                loader: {
                    loading: 'Загружаем 3D модель...',
                    fail: 'Не удалось инициализировать 3D модуль. Отключите строгий adblock/VPN и обновите страницу.',
                    slow: '3D модель все еще загружается... подождите несколько секунд.'
                },
                about: {
                    title: 'О нас',
                    subtitle: 'Создаем надежные продукты для mobile, web и backend',
                    p1: 'Мы команда <span class="about-highlight">BaDi Systems</span>, которая помогает стартапам и развивающимся компаниям быстро запускать масштабируемые цифровые продукты.',
                    p2: 'Наш frontend-стек построен для кроссплатформенной разработки: <span class="about-highlight">Flutter, Jetpack Compose, SwiftUI и Jaspr</span>. Это позволяет выпускать единый качественный UX для iOS, Android и web.',
                    p3: 'На backend мы создаем надежные сервисы на <span class="about-highlight">Go, PostgreSQL и Docker</span>, делая упор на чистую архитектуру, производительность и стабильные продакшн-релизы.',
                    p4: 'Также мы поддерживаем студентов через <span class="about-highlight">менторство, консультации и структурированное сопровождение</span> по рефератам, курсовым, дипломным и лабораторным работам.'
                },
                footer: '\u00a9 2026 BaDi Systems. Все права защищены.',
                typewriter: [
                    'Кроссплатформенная продуктовая разработка.',
                    'Flutter · Jetpack Compose · SwiftUI · Jaspr.',
                    'Go · PostgreSQL · Docker.',
                    'Поддержка студентов: рефераты, курсовые, дипломные, лабораторные и другое.'
                ]
            },
            students: {
                meta: {
                    title: 'Для студентов | BaDi Systems',
                    description: 'Поддержка студентов: рефераты, дипломные, лабораторные и курсовые работы.',
                    ogTitle: 'Для студентов | BaDi Systems',
                    ogDescription: 'Помощь студентам: рефераты, дипломные, лабораторные, курсовые и многое другое.'
                },
                nav: {
                    home: 'Главная',
                    business: 'Бизнесу',
                    services: 'Услуги',
                    universities: 'Университеты',
                    achievements: 'Достижения',
                    contact: 'Контакты'
                },
                hero: {
                    title: 'Для студентов',
                    subtitle: 'Поддержка и сопровождение учебных работ'
                },
                services: {
                    title: 'Услуги',
                    subtitle: 'Форматы поддержки студентов и стоимость',
                    thesis: 'Дипломная работа',
                    thesisPrice: 'от 5 000 ₽',
                    coursework: 'Курсовой проект',
                    courseworkPrice: 'от 1 000 ₽',
                    labs: 'Лабораторные / Практические работы',
                    labsPrice: 'от 200 ₽',
                    presentations: 'Интерактивные презентации',
                    presentationsPrice: 'от 300 ₽',
                    essay: 'Реферат',
                    essayPrice: 'от 350 ₽',
                    reports: 'Отчеты',
                    reportsPrice: 'от 300 ₽',
                    internship: 'Отчет по практике',
                    internshipPrice: 'от 1 000 ₽'
                },
                universities: {
                    title: 'Университеты, с которыми мы работали',
                    subtitle: 'Мы помогали студентам ведущих российских вузов в подготовке учебных проектов и курсовых работ.',
                    names: [
                        'АГУ',
                        'Белгородский государственный университет',
                        'Университет ИТМО',
                        'КБГУ',
                        'КЧГУ',
                        'Казанский федеральный университет',
                        'Кубанский государственный университет',
                        'МГУ им. Ломоносова',
                        'РУДН',
                        'СКФУ',
                        'Санкт-Петербургский государственный университет',
                        'Воронежский государственный университет',
                        'Волгоградский государственный университет'
                    ]
                },
                achievements: {
                    title: 'Достижения',
                    subtitle: 'Академические результаты, подтвержденные реальными метриками',
                    a1Title: '1 000+ выполненных студенческих работ',
                    a1Body: 'Мы помогли выполнить более <strong>420 рефератов</strong>, <strong>330 лабораторных</strong>, <strong>190 курсовых проектов</strong> и <strong>85 дипломных работ</strong> с качественной структурой, исследовательской глубиной и сдачей в срок.',
                    a1Link: 'Обсудить вашу задачу →',
                    a2Title: '95% работ получили высший балл',
                    a2Body: '<strong>95%</strong> сданных работ получили оценку <strong>5 / A-level</strong>. Наш подход основан на четкой методологии, правильном оформлении и материалах, готовых к уверенной защите.'
                },
                typewriter: [
                    'Рефераты.',
                    'Дипломные работы.',
                    'Лабораторные работы.',
                    'Курсовые проекты.',
                    'И многое другое.'
                ]
            },
            business: {
                meta: {
                    title: 'Для бизнеса | BaDi Systems',
                    description: 'Для бизнеса: цифровые решения для роста, автоматизации и масштабирования.',
                    ogTitle: 'Для бизнеса | BaDi Systems',
                    ogDescription: 'Бизнес-решения: автоматизация, CRM, web/mobile платформы, интеграции и аналитика.'
                },
                nav: {
                    home: 'Главная',
                    students: 'Студентам',
                    skills: 'Навыки',
                    projects: 'Проекты',
                    experience: 'Опыт',
                    contact: 'Контакты'
                },
                hero: {
                    title: 'Для бизнеса',
                    subtitle: 'Решения для роста, автоматизации и масштабирования бизнеса'
                },
                skills: {
                    title: 'Технические навыки',
                    subtitle: 'Инструменты и технологии, с которыми мы работаем',
                    frontend: 'Фронтенд',
                    backend: 'Бэкенд',
                    databases: 'Базы данных',
                    cloud: 'Облако / Инструменты',
                    concepts: 'Концепции'
                },
                projects: {
                    title: 'Ключевые проекты',
                    subtitle: 'Реальные продукты и реальные релизы'
                },
                timeline: {
                    title: 'Опыт',
                    subtitle: 'Два направления разработки: frontend и backend',
                    switcherAria: 'Треки опыта',
                    frontend: 'Frontend (Mob+Web): Bayram Annagurbanov',
                    backend: 'Backend: Didar Kamiljanov'
                },
                typewriter: [
                    'Автоматизация бизнес-процессов.',
                    'CRM-системы и внутренние дашборды.',
                    'Корпоративные web и mobile платформы.',
                    'Интеграции с API, ERP и платежами.',
                    'Аналитика, отчеты и масштабируемый рост.'
                ]
            }
        },
        tk: {
            common: {
                navToggleAria: 'Nawigasiýa menýusyny aç ýa-da ýap',
                switcherAria: 'Dil saýlaýjy',
                contact: {
                    heading: 'Habarlaşalyň',
                    nameLabel: 'Adyňyz',
                    emailLabel: 'Email salgyňyz',
                    messageLabel: 'Hatyňyz',
                    send: 'Habar iber',
                    fallbackPrefix: 'Düwme poçta programmasyny açmasa, şuny ulanyň',
                    successTitle: 'Habar üstünlikli iberildi!',
                    successSubtitle: 'Habarlaşanyňyz üçin sag boluň. Tiz wagtda jogap bereris.'
                },
                mail: {
                    subjectPrefix: 'Portfolio arkaly habarlaşma',
                    name: 'Ady',
                    email: 'Email',
                    message: 'Habar'
                }
            },
            index: {
                meta: {
                    title: 'BaDi Systems | Kross-platforma önüm döretmek',
                    description: 'BaDi Systems Flutter, Jetpack Compose, Jaspr, Go, PostgreSQL we Docker bilen kross-platforma önümleri döredýär.',
                    ogTitle: 'BaDi Systems | Kross-platforma önüm döretmek',
                    ogDescription: 'Mobil, web we backend üçin häzirki zaman steki bilen.'
                },
                nav: {
                    home: 'Baş sahypa',
                    students: 'Talyplar',
                    business: 'Biznes',
                    about: 'Biz barada',
                    contact: 'Habarlaşmak'
                },
                hero: {
                    greeting: 'biz',
                    subtitle: 'Kross-platforma önüm döretmek · Mobil · Web · Backend',
                    cta: 'Habarlaşalyň',
                    resume: 'Rezýumeni ýükläp al'
                },
                loader: {
                    loading: '3D model ýüklenýär...',
                    fail: '3D moduly başlatmak başartmady. Güýçli adblock/VPN sazlamasyny öçürip täzeden ýükläň.',
                    slow: '3D model henizem ýüklenýär... birnäçe sekunt garaşyň.'
                },
                about: {
                    title: 'Biz barada',
                    subtitle: 'Mobil, web we backend boýunça ygtybarly önümler',
                    p1: 'Biz <span class="about-highlight">BaDi Systems</span> topary bolup, startaplar we ösýän kompaniýalar üçin çalt hem giňelip bolýan sanly önümleri döredýäris.',
                    p2: 'Frontend stekimiz <span class="about-highlight">Flutter, Jetpack Compose, SwiftUI we Jaspr</span> esasynda kross-platforma önüm döretmäge gönükdirilen. Şonuň bilen iOS, Android we web üçin bitewi UX berýäris.',
                    p3: 'Backend tarapynda biz arassa arhitektura, öndürijilik we durnukly önümçilik relizlerine ünsi jemläp, <span class="about-highlight">Go, PostgreSQL we Docker</span> ulanyp ygtybarly hyzmatlary gurýarys.',
                    p4: 'Şeýle hem, biz talyplara <span class="about-highlight">mentorlyk, esseler, kurs işleri we laboratoriýa işleri üçin goldaw</span> berýäris.'
                },
                footer: '\u00a9 2026 BaDi Systems. Ähli hukuklar goralan.',
                typewriter: [
                    'Kross-platforma önüm döretmek.',
                    'Flutter · Jetpack Compose · SwiftUI · Jaspr.',
                    'Go · PostgreSQL · Docker.',
                    'Talyplar üçin goldaw: referatlar, kurs işleri, diplomlar, laborator işler we beýlekiler.'
                ]
            },
            students: {
                meta: {
                    title: 'Talyplar üçin | BaDi Systems',
                    description: 'Talyplar üçin goldaw: referatlar, diplomlar, laborator we kurs işleri.',
                    ogTitle: 'Talyplar üçin | BaDi Systems',
                    ogDescription: 'Talyplara goldaw: referatlar, diplomlar, laborator, kurs işleri we başgalar.'
                },
                nav: {
                    home: 'Baş sahypa',
                    business: 'Biznes',
                    services: 'Hyzmatlar',
                    universities: 'Uniwersitetler',
                    achievements: 'Üstünlikler',
                    contact: 'Habarlaşmak'
                },
                hero: {
                    title: 'Talyplar üçin',
                    subtitle: 'Okuw işleri üçin goldaw we ýolbeletlik'
                },
                services: {
                    title: 'Hyzmatlar',
                    subtitle: 'Talyplar üçin hyzmatlar we bahalar',
                    thesis: 'Diplom işi',
                    thesisPrice: '5 000 ₽-dan',
                    coursework: 'Kurs proýekti',
                    courseworkPrice: '1 000 ₽-dan',
                    labs: 'Laborator / Praktiki işler',
                    labsPrice: '200 ₽-dan',
                    presentations: 'Interaktiw prezentasiýalar',
                    presentationsPrice: '300 ₽-dan',
                    essay: 'Referat',
                    essayPrice: '350 ₽-dan',
                    reports: 'Hasabatlar',
                    reportsPrice: '300 ₽-dan',
                    internship: 'Praktika hasabaty',
                    internshipPrice: '1 000 ₽-dan'
                },
                universities: {
                    title: 'Biz bilen işleşýän talyplaryň uniwersitetleri',
                    subtitle: 'Biz Russiýanyň öňdebaryjy uniwersitetleriniň talyplaryna okuw proýektleri we kurs işleri boýunça kömek etdik.',
                    names: [
                        'AGU',
                        'Belgorod Döwlet Uniwersiteti',
                        'ITMO Uniwersiteti',
                        'KBGU',
                        'KChGU',
                        'Kazan Federal Uniwersiteti',
                        'Kuban Döwlet Uniwersiteti',
                        'Lomonosow adyndaky MDU',
                        'RUDN Uniwersiteti',
                        'SKFU',
                        'Sankt-Peterburg Döwlet Uniwersiteti',
                        'Woronež Döwlet Uniwersiteti',
                        'Wolgograd Döwlet Uniwersiteti'
                    ]
                },
                achievements: {
                    title: 'Üstünlikler',
                    subtitle: 'Hakyky ölçegler bilen tassyklanan akademiki netijeler',
                    a1Title: '1 000+ talyp işi ýerine ýetirildi',
                    a1Body: 'Biz <strong>420+ referat</strong>, <strong>330+ laborator iş</strong>, <strong>190+ kurs proýekti</strong> we <strong>85+ diplom işi</strong> boýunça ýokary hilli kömek etdik.',
                    a1Link: 'Ýumuşyňyzy ara alyp maslahatlaşyň →',
                    a2Title: '95% ýokary baha görkezijisi',
                    a2Body: 'Tabşyrylan işleriň <strong>95%-i</strong> <strong>5 / A derejesinde</strong> bahalandy. Biziň usulymyz düşnükli metodologiýa, dogry format we goraga taýyn materiallara esaslanýar.'
                },
                typewriter: [
                    'Referatlar.',
                    'Diplom işleri.',
                    'Laborator işler.',
                    'Kurs proýektleri.',
                    'We başga-da köp zat.'
                ]
            },
            business: {
                meta: {
                    title: 'Biznes üçin | BaDi Systems',
                    description: 'Biznes üçin: ösüş, awtomatizasiýa we giňelme üçin sanly çözgütler.',
                    ogTitle: 'Biznes üçin | BaDi Systems',
                    ogDescription: 'Biznes çözgütleri: awtomatizasiýa, CRM, web/mobile platformalar, integrasiýalar we analitika.'
                },
                nav: {
                    home: 'Baş sahypa',
                    students: 'Talyplar',
                    skills: 'Başarnyklar',
                    projects: 'Proýektler',
                    experience: 'Tejribe',
                    contact: 'Habarlaşmak'
                },
                hero: {
                    title: 'Biznes üçin',
                    subtitle: 'Ösüş, awtomatizasiýa we giňelme üçin biznes çözgütleri'
                },
                skills: {
                    title: 'Tehniki başarnyklar',
                    subtitle: 'Ulanylýan gurallar we tehnologiýalar',
                    frontend: 'Frontend',
                    backend: 'Backend',
                    databases: 'Maglumat bazalary',
                    cloud: 'Bulut / Gurallar',
                    concepts: 'Konsepsiýalar'
                },
                projects: {
                    title: 'Biziň proýektlerimiz',
                    subtitle: 'Hakyky önümler'
                },
                timeline: {
                    title: 'Tejribe',
                    subtitle: 'Frontend we backend boýunça iki ugur',
                    switcherAria: 'Tejribe ugurlary',
                    frontend: 'Frontend (Mob+Web): Bayram Annagurbanov',
                    backend: 'Backend: Didar Kamiljanov'
                },
                typewriter: [
                    'Biznes prosesleriniň awtomatizasiýasy.',
                    'CRM ulgamlary we içerki dashboardlar.',
                    'Korporatiw web we mobil platformalar.',
                    'API, ERP we töleg ulgamlary bilen integrasiýa.',
                    'Analitika, hasabat we giňelýän ösüş.'
                ]
            }
        }
    };

    const PAGE_BINDINGS = {
        index: {
            meta: {
                title: 'index.meta.title',
                description: 'index.meta.description',
                ogTitle: 'index.meta.ogTitle',
                ogDescription: 'index.meta.ogDescription'
            },
            bindings: [
                { selector: 'nav .nav-links a[href="#hero"]', key: 'index.nav.home' },
                { selector: 'nav .nav-links a[href="for-students.html"]', key: 'index.nav.students' },
                { selector: 'nav .nav-links a[href="for-business.html"]', key: 'index.nav.business' },
                { selector: 'nav .nav-links a[href="#about"]', key: 'index.nav.about' },
                { selector: 'nav .nav-links a[href="#contact"]', key: 'index.nav.contact' },
                { selector: 'nav .nav-toggle', type: 'attr', attr: 'aria-label', key: 'common.navToggleAria' },
                { selector: '.hero-greeting', key: 'index.hero.greeting' },
                { selector: '.hero-subtitle', key: 'index.hero.subtitle' },
                { selector: '.hero-actions .cta-button', key: 'index.hero.cta' },
                { selector: '.hero-actions .resume-button', key: 'index.hero.resume' },
                { selector: '#pcModelLoader', key: 'index.loader.loading' },
                { selector: '#about h2', key: 'index.about.title' },
                { selector: '#about .section-subtitle', key: 'index.about.subtitle' },
                { selector: '#about .about-text p:nth-of-type(1)', key: 'index.about.p1', type: 'html' },
                { selector: '#about .about-text p:nth-of-type(2)', key: 'index.about.p2', type: 'html' },
                { selector: '#about .about-text p:nth-of-type(3)', key: 'index.about.p3', type: 'html' },
                { selector: '#about .about-text p:nth-of-type(4)', key: 'index.about.p4', type: 'html' },
                { selector: '#contact .contact-heading', key: 'common.contact.heading' },
                { selector: '#contact label[for="name"]', key: 'common.contact.nameLabel' },
                { selector: '#contact label[for="email"]', key: 'common.contact.emailLabel' },
                { selector: '#contact label[for="message"]', key: 'common.contact.messageLabel' },
                { selector: '#contact .submit-button', key: 'common.contact.send' },
                { selector: '#contact #formSuccess h3', key: 'common.contact.successTitle' },
                { selector: '#contact #formSuccess .success-subtext', key: 'common.contact.successSubtitle' },
                { selector: 'footer p', key: 'index.footer' }
            ]
        },
        students: {
            meta: {
                title: 'students.meta.title',
                description: 'students.meta.description',
                ogTitle: 'students.meta.ogTitle',
                ogDescription: 'students.meta.ogDescription'
            },
            bindings: [
                { selector: 'nav .nav-links a[href="index.html"]', key: 'students.nav.home' },
                { selector: 'nav .nav-links a[href="for-business.html"]', key: 'students.nav.business' },
                { selector: 'nav .nav-links a[href="#services"]', key: 'students.nav.services' },
                { selector: 'nav .nav-links a[href="#universities"]', key: 'students.nav.universities' },
                { selector: 'nav .nav-links a[href="#achievements"]', key: 'students.nav.achievements' },
                { selector: 'nav .nav-links a[href="#contact"]', key: 'students.nav.contact' },
                { selector: 'nav .nav-toggle', type: 'attr', attr: 'aria-label', key: 'common.navToggleAria' },
                { selector: '#hero .hero-title', key: 'students.hero.title' },
                { selector: '#hero .hero-subtitle', key: 'students.hero.subtitle' },
                { selector: '#services h2', key: 'students.services.title' },
                { selector: '#services .section-subtitle', key: 'students.services.subtitle' },
                { selector: '#services .service-card:nth-of-type(1) h3', key: 'students.services.thesis' },
                { selector: '#services .service-card:nth-of-type(1) .service-price', key: 'students.services.thesisPrice' },
                { selector: '#services .service-card:nth-of-type(2) h3', key: 'students.services.coursework' },
                { selector: '#services .service-card:nth-of-type(2) .service-price', key: 'students.services.courseworkPrice' },
                { selector: '#services .service-card:nth-of-type(3) h3', key: 'students.services.labs' },
                { selector: '#services .service-card:nth-of-type(3) .service-price', key: 'students.services.labsPrice' },
                { selector: '#services .service-card:nth-of-type(4) h3', key: 'students.services.presentations' },
                { selector: '#services .service-card:nth-of-type(4) .service-price', key: 'students.services.presentationsPrice' },
                { selector: '#services .service-card:nth-of-type(5) h3', key: 'students.services.essay' },
                { selector: '#services .service-card:nth-of-type(5) .service-price', key: 'students.services.essayPrice' },
                { selector: '#services .service-card:nth-of-type(6) h3', key: 'students.services.reports' },
                { selector: '#services .service-card:nth-of-type(6) .service-price', key: 'students.services.reportsPrice' },
                { selector: '#services .service-card:nth-of-type(7) h3', key: 'students.services.internship' },
                { selector: '#services .service-card:nth-of-type(7) .service-price', key: 'students.services.internshipPrice' },
                { selector: '#universities h2', key: 'students.universities.title' },
                { selector: '#universities .section-subtitle', key: 'students.universities.subtitle' },
                { selector: '#achievements h2', key: 'students.achievements.title' },
                { selector: '#achievements .section-subtitle', key: 'students.achievements.subtitle' },
                { selector: '#achievements .achievement-card:nth-of-type(1) h3', key: 'students.achievements.a1Title' },
                { selector: '#achievements .achievement-card:nth-of-type(1) .achievement-body p', key: 'students.achievements.a1Body', type: 'html' },
                { selector: '#achievements .achievement-card:nth-of-type(1) .achievement-link', key: 'students.achievements.a1Link' },
                { selector: '#achievements .achievement-card:nth-of-type(2) h3', key: 'students.achievements.a2Title' },
                { selector: '#achievements .achievement-card:nth-of-type(2) .achievement-body p', key: 'students.achievements.a2Body', type: 'html' },
                { selector: '#contact .contact-heading', key: 'common.contact.heading' },
                { selector: '#contact label[for="name"]', key: 'common.contact.nameLabel' },
                { selector: '#contact label[for="email"]', key: 'common.contact.emailLabel' },
                { selector: '#contact label[for="message"]', key: 'common.contact.messageLabel' },
                { selector: '#contact .submit-button', key: 'common.contact.send' },
                { selector: '#contact #formSuccess h3', key: 'common.contact.successTitle' },
                { selector: '#contact #formSuccess .success-subtext', key: 'common.contact.successSubtitle' }
            ]
        },
        business: {
            meta: {
                title: 'business.meta.title',
                description: 'business.meta.description',
                ogTitle: 'business.meta.ogTitle',
                ogDescription: 'business.meta.ogDescription'
            },
            bindings: [
                { selector: 'nav .nav-links a[href="index.html"]', key: 'business.nav.home' },
                { selector: 'nav .nav-links a[href="for-students.html"]', key: 'business.nav.students' },
                { selector: 'nav .nav-links a[href="#skills"]', key: 'business.nav.skills' },
                { selector: 'nav .nav-links a[href="#projects"]', key: 'business.nav.projects' },
                { selector: 'nav .nav-links a[href="#timeline"]', key: 'business.nav.experience' },
                { selector: 'nav .nav-links a[href="#contact"]', key: 'business.nav.contact' },
                { selector: 'nav .nav-toggle', type: 'attr', attr: 'aria-label', key: 'common.navToggleAria' },
                { selector: '#hero .hero-title', key: 'business.hero.title' },
                { selector: '#hero .hero-subtitle', key: 'business.hero.subtitle' },
                { selector: '#skills h2', key: 'business.skills.title' },
                { selector: '#skills .section-subtitle', key: 'business.skills.subtitle' },
                { selector: '#skills .skill-card:nth-of-type(1) h3', key: 'business.skills.frontend', type: 'iconText' },
                { selector: '#skills .skill-card:nth-of-type(2) h3', key: 'business.skills.backend', type: 'iconText' },
                { selector: '#skills .skill-card:nth-of-type(3) h3', key: 'business.skills.databases', type: 'iconText' },
                { selector: '#skills .skill-card:nth-of-type(4) h3', key: 'business.skills.cloud', type: 'iconText' },
                { selector: '#skills .skill-card:nth-of-type(5) h3', key: 'business.skills.concepts', type: 'iconText' },
                { selector: '#projects h2', key: 'business.projects.title' },
                { selector: '#projects .section-subtitle', key: 'business.projects.subtitle' },
                { selector: '#timeline h2', key: 'business.timeline.title' },
                { selector: '#timeline .section-subtitle', key: 'business.timeline.subtitle' },
                { selector: '#timeline .timeline-switcher', type: 'attr', attr: 'aria-label', key: 'business.timeline.switcherAria' },
                { selector: '#timeline .timeline-toggle[data-timeline="frontend-track"]', key: 'business.timeline.frontend' },
                { selector: '#timeline .timeline-toggle[data-timeline="backend-track"]', key: 'business.timeline.backend' },
                { selector: '#contact .contact-heading', key: 'common.contact.heading' },
                { selector: '#contact label[for="name"]', key: 'common.contact.nameLabel' },
                { selector: '#contact label[for="email"]', key: 'common.contact.emailLabel' },
                { selector: '#contact label[for="message"]', key: 'common.contact.messageLabel' },
                { selector: '#contact .submit-button', key: 'common.contact.send' },
                { selector: '#contact #formSuccess h3', key: 'common.contact.successTitle' },
                { selector: '#contact #formSuccess .success-subtext', key: 'common.contact.successSubtitle' }
            ]
        }
    };

    let currentLang = DEFAULT_LANG;

    const getPageName = () => {
        const byData = document.body ? document.body.dataset.page : '';
        if (byData) return byData;

        const pathname = globalThis.location.pathname;
        if (pathname.endsWith('for-students.html')) return 'students';
        if (pathname.endsWith('for-business.html')) return 'business';
        return 'index';
    };

    const getPagePath = (pageName) => {
        const fileName = PAGE_FILES[pageName] || PAGE_FILES.index;
        const pathname = globalThis.location && typeof globalThis.location.pathname === 'string'
            ? globalThis.location.pathname
            : `/${fileName}`;
        const lastSlashIndex = pathname.lastIndexOf('/');
        const directory = lastSlashIndex >= 0 ? pathname.slice(0, lastSlashIndex + 1) : '/';
        return `${directory}${fileName}`;
    };

    const toAbsoluteUrl = (value) => {
        if (!value) return value;
        if (/^https?:\/\//i.test(value)) return value;

        const origin = globalThis.location && /^https?:$/.test(globalThis.location.protocol)
            ? globalThis.location.origin
            : '';
        return origin ? new URL(value, `${origin}/`).toString() : value;
    };

    const ensureHeadMeta = (selector, createFn) => {
        let element = document.head.querySelector(selector);
        if (element) return element;

        element = createFn();
        document.head.append(element);
        return element;
    };

    const ensureCanonicalLink = () => {
        return ensureHeadMeta('link[rel="canonical"]', () => {
            const link = document.createElement('link');
            link.setAttribute('rel', 'canonical');
            return link;
        });
    };

    const ensureAlternateLinksContainer = () => {
        const tagged = Array.from(document.head.querySelectorAll('link[data-badi-seo-alternate="true"]'));
        if (tagged.length) return tagged;

        const existing = Array.from(document.head.querySelectorAll('link[rel="alternate"][hreflang]'));
        if (existing.length) {
            existing.forEach((link) => {
                link.setAttribute('data-badi-seo-alternate', 'true');
            });
            return existing;
        }

        SUPPORTED_LANGS.concat('x-default').forEach(() => {
            const link = document.createElement('link');
            link.setAttribute('rel', 'alternate');
            link.setAttribute('data-badi-seo-alternate', 'true');
            document.head.append(link);
        });

        return Array.from(document.head.querySelectorAll('link[data-badi-seo-alternate="true"]'));
    };

    const getValue = (obj, path) => {
        return path.split('.').reduce((acc, key) => (acc && key in acc ? acc[key] : undefined), obj);
    };

    const t = (path, lang = currentLang) => {
        const value = getValue(COPY[lang], path);
        if (value !== undefined) return value;
        const fallback = getValue(COPY[DEFAULT_LANG], path);
        return fallback !== undefined ? fallback : path;
    };

    const updateMeta = (pageName) => {
        const config = PAGE_BINDINGS[pageName] && PAGE_BINDINGS[pageName].meta;
        if (!config) return;

        const title = t(config.title);
        const description = t(config.description);
        const ogTitle = t(config.ogTitle);
        const ogDescription = t(config.ogDescription);

        document.title = title;

        const descriptionMeta = document.querySelector('meta[name="description"]');
        if (descriptionMeta) descriptionMeta.setAttribute('content', description);

        const ogTitleMeta = document.querySelector('meta[property="og:title"]');
        if (ogTitleMeta) ogTitleMeta.setAttribute('content', ogTitle);

        const ogDescriptionMeta = document.querySelector('meta[property="og:description"]');
        if (ogDescriptionMeta) ogDescriptionMeta.setAttribute('content', ogDescription);

        const twitterTitleMeta = document.querySelector('meta[name="twitter:title"]');
        if (twitterTitleMeta) twitterTitleMeta.setAttribute('content', ogTitle);

        const twitterDescriptionMeta = document.querySelector('meta[name="twitter:description"]');
        if (twitterDescriptionMeta) twitterDescriptionMeta.setAttribute('content', ogDescription);
    };

    const syncLanguageInUrl = (pageName) => {
        if (!globalThis.history || !globalThis.location) return;
        if (!/^https?:$/.test(globalThis.location.protocol)) return;

        const currentUrl = new URL(globalThis.location.href);
        const expectedPath = getPagePath(pageName);
        if (currentUrl.pathname !== expectedPath) {
            currentUrl.pathname = expectedPath;
        }

        if (currentLang === DEFAULT_LANG) {
            currentUrl.searchParams.delete('lang');
        } else {
            currentUrl.searchParams.set('lang', currentLang);
        }

        const nextUrl = `${currentUrl.pathname}${currentUrl.search}${currentUrl.hash}`;
        const currentComparable = `${globalThis.location.pathname}${globalThis.location.search}${globalThis.location.hash}`;
        if (nextUrl !== currentComparable) {
            globalThis.history.replaceState({}, '', nextUrl);
        }
    };

    const applySeoTags = (pageName) => {
        const pagePath = getPagePath(pageName);
        const canonicalPath = pagePath;
        const canonicalUrl = toAbsoluteUrl(canonicalPath);

        const canonicalLink = ensureCanonicalLink();
        canonicalLink.setAttribute('href', canonicalUrl);

        const robotsMeta = ensureHeadMeta('meta[name="robots"]', () => {
            const meta = document.createElement('meta');
            meta.setAttribute('name', 'robots');
            return meta;
        });
        robotsMeta.setAttribute('content', 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1');

        const ogUrlMeta = ensureHeadMeta('meta[property="og:url"]', () => {
            const meta = document.createElement('meta');
            meta.setAttribute('property', 'og:url');
            return meta;
        });
        ogUrlMeta.setAttribute('content', canonicalUrl);

        const ogSiteMeta = ensureHeadMeta('meta[property="og:site_name"]', () => {
            const meta = document.createElement('meta');
            meta.setAttribute('property', 'og:site_name');
            return meta;
        });
        ogSiteMeta.setAttribute('content', 'BaDi Systems');

        const ogLocaleMeta = ensureHeadMeta('meta[property="og:locale"]', () => {
            const meta = document.createElement('meta');
            meta.setAttribute('property', 'og:locale');
            return meta;
        });
        ogLocaleMeta.setAttribute('content', LANG_TO_OG_LOCALE[currentLang] || LANG_TO_OG_LOCALE[DEFAULT_LANG]);

        const twitterUrlMeta = ensureHeadMeta('meta[name="twitter:url"]', () => {
            const meta = document.createElement('meta');
            meta.setAttribute('name', 'twitter:url');
            return meta;
        });
        twitterUrlMeta.setAttribute('content', canonicalUrl);

        const languageMeta = ensureHeadMeta('meta[name="language"]', () => {
            const meta = document.createElement('meta');
            meta.setAttribute('name', 'language');
            return meta;
        });
        languageMeta.setAttribute('content', currentLang);

        const alternateLangs = SUPPORTED_LANGS.concat('x-default');
        const alternateLinks = ensureAlternateLinksContainer();

        while (alternateLinks.length < alternateLangs.length) {
            const link = document.createElement('link');
            link.setAttribute('rel', 'alternate');
            link.setAttribute('data-badi-seo-alternate', 'true');
            document.head.append(link);
            alternateLinks.push(link);
        }

        alternateLinks.forEach((link, index) => {
            const lang = alternateLangs[index];
            if (!lang) {
                link.remove();
                return;
            }
            const localizedPath = lang === 'x-default'
                ? canonicalPath
                : `${pagePath}?lang=${lang}`;
            link.setAttribute('hreflang', lang);
            link.setAttribute('href', toAbsoluteUrl(localizedPath));
        });

        const alternateLocaleTags = Array.from(document.head.querySelectorAll('meta[property="og:locale:alternate"]'));
        const expectedAlternateLocales = SUPPORTED_LANGS
            .filter((lang) => lang !== currentLang)
            .map((lang) => LANG_TO_OG_LOCALE[lang])
            .filter(Boolean);

        while (alternateLocaleTags.length < expectedAlternateLocales.length) {
            const meta = document.createElement('meta');
            meta.setAttribute('property', 'og:locale:alternate');
            document.head.append(meta);
            alternateLocaleTags.push(meta);
        }

        alternateLocaleTags.forEach((meta, index) => {
            const value = expectedAlternateLocales[index];
            if (!value) {
                meta.remove();
                return;
            }
            meta.setAttribute('content', value);
        });

        ['meta[property="og:image"]', 'meta[name="twitter:image"]'].forEach((selector) => {
            const meta = document.head.querySelector(selector);
            if (!meta) return;
            const currentValue = meta.getAttribute('content');
            if (!currentValue) return;
            meta.setAttribute('content', toAbsoluteUrl(currentValue));
        });
    };

    const applyStructuredData = (pageName) => {
        const config = PAGE_BINDINGS[pageName] && PAGE_BINDINGS[pageName].meta;
        if (!config) return;

        const pagePath = getPagePath(pageName);
        const pageUrl = toAbsoluteUrl(pagePath);
        const organizationId = toAbsoluteUrl('/#organization');
        const websiteId = toAbsoluteUrl('/#website');
        const webPageId = `${pageUrl}#webpage`;

        const graph = [
            {
                '@type': 'Organization',
                '@id': organizationId,
                name: 'BaDi Systems',
                url: toAbsoluteUrl('/index.html'),
                logo: {
                    '@type': 'ImageObject',
                    url: toAbsoluteUrl('/assets/images/index-og.png')
                },
                sameAs: SOCIAL_LINKS
            },
            {
                '@type': 'WebSite',
                '@id': websiteId,
                url: toAbsoluteUrl('/index.html'),
                name: 'BaDi Systems',
                inLanguage: currentLang,
                publisher: { '@id': organizationId }
            },
            {
                '@type': 'WebPage',
                '@id': webPageId,
                url: pageUrl,
                name: t(config.title),
                description: t(config.description),
                inLanguage: currentLang,
                isPartOf: { '@id': websiteId },
                about: { '@id': organizationId }
            }
        ];

        const jsonLd = {
            '@context': 'https://schema.org',
            '@graph': graph
        };

        const script = ensureHeadMeta('script#badi-structured-data[type="application/ld+json"]', () => {
            const el = document.createElement('script');
            el.setAttribute('id', 'badi-structured-data');
            el.setAttribute('type', 'application/ld+json');
            return el;
        });
        script.textContent = JSON.stringify(jsonLd);
    };

    const setTextAfterIcon = (element, value) => {
        const icon = element.querySelector('i');
        if (!icon) {
            element.textContent = value;
            return;
        }

        Array.from(element.childNodes).forEach((node) => {
            if (node !== icon) element.removeChild(node);
        });
        if (value && value.trim()) {
            element.append(document.createTextNode(` ${value}`));
        }
    };

    const captureBusinessProjectDefaults = () => {
        const cards = document.querySelectorAll('#projects .project-card');
        if (!cards.length) return [];

        return Array.from(cards).map((card) => {
            const blocks = card.querySelectorAll('.case-study-block');

            const getListText = (blockIndex) => {
                const block = blocks[blockIndex];
                if (!block) return [];
                return Array.from(block.querySelectorAll('li')).map((li) => li.textContent.trim());
            };

            const getHeadingText = (blockIndex) => {
                const heading = blocks[blockIndex] && blocks[blockIndex].querySelector('h5');
                if (!heading) return '';
                const clone = heading.cloneNode(true);
                const icon = clone.querySelector('i');
                if (icon) icon.remove();
                return clone.textContent.replace(/\s+/g, ' ').trim();
            };

            return {
                title: (card.querySelector('.project-header-row h3') || {}).textContent?.trim() || '',
                description: (card.querySelector('.project-description') || {}).textContent?.trim() || '',
                actions: Array.from(card.querySelectorAll('.project-actions .project-link')).map((link) => {
                    return link.textContent.replace(/\s+/g, ' ').trim();
                }),
                problemTitle: getHeadingText(0),
                problemBody: (blocks[0] && blocks[0].querySelector('p') ? blocks[0].querySelector('p').textContent.trim() : ''),
                architectureTitle: getHeadingText(1),
                architectureItems: getListText(1),
                challengesTitle: getHeadingText(2),
                challengesItems: getListText(2),
                learnedTitle: getHeadingText(3),
                learnedItems: getListText(3)
            };
        });
    };

    const setListText = (listElement, values) => {
        if (!listElement || !Array.isArray(values)) return;
        const items = listElement.querySelectorAll('li');
        items.forEach((item, index) => {
            if (values[index] !== undefined) {
                item.textContent = values[index];
            }
        });
    };

    const applyBusinessProjectCards = (pageName) => {
        if (pageName !== 'business') return;

        if (!businessProjectDefaults) {
            businessProjectDefaults = captureBusinessProjectDefaults();
        }

        const localizedCards = BUSINESS_PROJECT_TRANSLATIONS[currentLang];
        const cards = document.querySelectorAll('#projects .project-card');
        if (!cards.length || !businessProjectDefaults.length) return;

        Array.from(cards).forEach((card, index) => {
            const fallback = businessProjectDefaults[index];
            const source = (localizedCards && localizedCards[index]) || fallback;
            if (!source) return;

            const title = card.querySelector('.project-header-row h3');
            if (title) title.textContent = source.title || fallback.title;

            const description = card.querySelector('.project-description');
            if (description) description.textContent = source.description || fallback.description;

            const actionLinks = card.querySelectorAll('.project-actions .project-link');
            actionLinks.forEach((link, actionIndex) => {
                const text = (source.actions && source.actions[actionIndex] !== undefined)
                    ? source.actions[actionIndex]
                    : (fallback.actions[actionIndex] || '');
                setTextAfterIcon(link, text);
            });

            const blocks = card.querySelectorAll('.case-study-block');
            if (blocks[0]) {
                const h5 = blocks[0].querySelector('h5');
                if (h5) setTextAfterIcon(h5, source.problemTitle || fallback.problemTitle);
                const p = blocks[0].querySelector('p');
                if (p) p.textContent = source.problemBody || fallback.problemBody;
            }

            if (blocks[1]) {
                const h5 = blocks[1].querySelector('h5');
                if (h5) setTextAfterIcon(h5, source.architectureTitle || fallback.architectureTitle);
                setListText(blocks[1].querySelector('ul'), source.architectureItems || fallback.architectureItems);
            }

            if (blocks[2]) {
                const h5 = blocks[2].querySelector('h5');
                if (h5) setTextAfterIcon(h5, source.challengesTitle || fallback.challengesTitle);
                setListText(blocks[2].querySelector('ul'), source.challengesItems || fallback.challengesItems);
            }

            if (blocks[3]) {
                const h5 = blocks[3].querySelector('h5');
                if (h5) setTextAfterIcon(h5, source.learnedTitle || fallback.learnedTitle);
                setListText(blocks[3].querySelector('ul'), source.learnedItems || fallback.learnedItems);
            }
        });
    };

    const captureBusinessTimelineDefaults = () => {
        const captureTrack = (trackSelector) => {
            const items = document.querySelectorAll(`${trackSelector} .timeline-item .timeline-content`);
            if (!items.length) return [];

            return Array.from(items).map((content) => {
                const date = content.querySelector('h4');
                const role = content.querySelector('.timeline-role');
                const paragraph = content.querySelector('p');
                const highlights = content.querySelectorAll('.timeline-highlights li');

                return {
                    date: date ? date.textContent.trim() : '',
                    role: role ? role.innerHTML.trim() : '',
                    body: paragraph ? paragraph.innerHTML.trim() : '',
                    highlights: Array.from(highlights).map((item) => item.innerHTML.trim())
                };
            });
        };

        return {
            frontend: captureTrack('#frontend-track'),
            backend: captureTrack('#backend-track')
        };
    };

    const applyBusinessTimeline = (pageName) => {
        if (pageName !== 'business') return;

        if (!businessTimelineDefaults) {
            businessTimelineDefaults = captureBusinessTimelineDefaults();
        }

        const localizedTimeline = BUSINESS_TIMELINE_TRANSLATIONS[currentLang];

        const applyTrack = (trackSelector, trackKey) => {
            const contents = document.querySelectorAll(`${trackSelector} .timeline-item .timeline-content`);
            if (!contents.length) return;

            const fallbackItems = businessTimelineDefaults[trackKey] || [];
            const localizedItems = localizedTimeline ? (localizedTimeline[trackKey] || []) : [];

            Array.from(contents).forEach((content, index) => {
                const fallback = fallbackItems[index] || {};
                const source = localizedItems[index] || fallback;

                const date = content.querySelector('h4');
                if (date) date.textContent = source.date || fallback.date || '';

                const role = content.querySelector('.timeline-role');
                if (role) role.innerHTML = source.role || fallback.role || '';

                const paragraph = content.querySelector('p');
                if (paragraph) paragraph.innerHTML = source.body || fallback.body || '';

                const highlightItems = content.querySelectorAll('.timeline-highlights li');
                const sourceHighlights = Array.isArray(source.highlights) ? source.highlights : [];
                const fallbackHighlights = Array.isArray(fallback.highlights) ? fallback.highlights : [];
                highlightItems.forEach((item, highlightIndex) => {
                    const value = sourceHighlights[highlightIndex] !== undefined
                        ? sourceHighlights[highlightIndex]
                        : fallbackHighlights[highlightIndex];
                    if (value !== undefined) {
                        item.innerHTML = value;
                    }
                });
            });
        };

        applyTrack('#frontend-track', 'frontend');
        applyTrack('#backend-track', 'backend');
    };

    const applyBindings = (pageName) => {
        const pageBindings = PAGE_BINDINGS[pageName];
        if (!pageBindings) return;

        pageBindings.bindings.forEach((binding) => {
            const value = t(binding.key);
            const elements = document.querySelectorAll(binding.selector);
            if (!elements.length) return;

            elements.forEach((element) => {
                if (binding.type === 'attr') {
                    element.setAttribute(binding.attr, value);
                    return;
                }

                if (binding.type === 'iconText') {
                    setTextAfterIcon(element, value);
                    return;
                }

                if (binding.type === 'html') {
                    element.innerHTML = value;
                    return;
                }

                element.textContent = value;
            });
        });
    };

    const applyUniversityNames = (pageName) => {
        if (pageName !== 'students') return;

        const localizedNames = t('students.universities.names');
        if (!Array.isArray(localizedNames) || localizedNames.length === 0) return;

        const cards = document.querySelectorAll('#universities .university-logo-card');
        if (!cards.length) return;

        cards.forEach((card, index) => {
            const titleElement = card.querySelector('span');
            if (!titleElement) return;
            titleElement.textContent = localizedNames[index % localizedNames.length];
        });
    };

    const applyResumeDownload = (pageName) => {
        if (pageName !== 'index') return;

        const resumeButton = document.querySelector('.hero-actions .resume-button');
        if (!resumeButton) return;

        const resumeFile = currentLang === 'en' ? 'resume_en.zip' : 'resume_ru.zip';
        resumeButton.setAttribute('href', resumeFile);
        resumeButton.setAttribute('download', resumeFile);
    };

    const applyContactFallback = () => {
        const prefix = t('common.contact.fallbackPrefix');
        document.querySelectorAll('.contact-fallback').forEach((fallbackElement) => {
            const link = fallbackElement.querySelector('a');
            if (!link) {
                fallbackElement.textContent = prefix;
                return;
            }

            fallbackElement.textContent = '';
            fallbackElement.append(document.createTextNode(`${prefix} `));
            fallbackElement.append(link);
            fallbackElement.append(document.createTextNode('.'));
        });
    };

    const ensureLanguageSwitcher = () => {
        const nav = document.querySelector('nav');
        if (!nav) return null;

        let switcher = nav.querySelector('.lang-switcher');
        if (switcher) return switcher;

        switcher = document.createElement('div');
        switcher.className = 'lang-switcher';
        switcher.setAttribute('role', 'group');

        SUPPORTED_LANGS.forEach((lang) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'lang-switcher-btn';
            button.dataset.lang = lang;
            button.textContent = lang.toUpperCase();
            button.addEventListener('click', () => {
                setLanguage(lang, { persist: true, notify: true });
            });
            switcher.append(button);
        });

        nav.append(switcher);
        return switcher;
    };

    const applySwitcherState = () => {
        const switcher = ensureLanguageSwitcher();
        if (!switcher) return;

        switcher.setAttribute('aria-label', t('common.switcherAria'));

        switcher.querySelectorAll('.lang-switcher-btn').forEach((button) => {
            const isActive = button.dataset.lang === currentLang;
            button.classList.toggle('active', isActive);
            button.setAttribute('aria-pressed', String(isActive));
        });
    };

    const applyLanguage = () => {
        const pageName = getPageName();
        document.documentElement.lang = currentLang;
        syncLanguageInUrl(pageName);
        updateMeta(pageName);
        applySeoTags(pageName);
        applyStructuredData(pageName);
        applyBindings(pageName);
        applyResumeDownload(pageName);
        applyBusinessProjectCards(pageName);
        applyBusinessTimeline(pageName);
        applyUniversityNames(pageName);
        applyContactFallback();
        applySwitcherState();
    };

    const resolveInitialLanguage = () => {
        const urlLang = new URLSearchParams(globalThis.location.search).get('lang');
        if (SUPPORTED_LANGS.includes(urlLang)) return urlLang;

        try {
            const storedLang = globalThis.localStorage.getItem(STORAGE_KEY);
            if (SUPPORTED_LANGS.includes(storedLang)) return storedLang;
        } catch (error) {
            // Ignore storage issues and continue with fallback resolution.
        }

        return DEFAULT_LANG;
    };

    const setLanguage = (lang, options = {}) => {
        const { persist = true, notify = true } = options;
        if (!SUPPORTED_LANGS.includes(lang)) return;

        currentLang = lang;
        if (persist) {
            try {
                globalThis.localStorage.setItem(STORAGE_KEY, lang);
            } catch (error) {
                // Ignore storage errors in private/locked environments.
            }
        }

        applyLanguage();

        if (notify) {
            globalThis.dispatchEvent(new CustomEvent('badi:languagechange', { detail: { lang } }));
        }
    };

    const getPhrases = (pageName) => {
        const fromPage = t(`${pageName}.typewriter`);
        if (Array.isArray(fromPage)) return fromPage.slice();
        return [];
    };

    currentLang = resolveInitialLanguage();
    applyLanguage();

    globalThis.BaDiI18n = {
        t,
        getLang: () => currentLang,
        getPhrases,
        setLanguage: (lang) => setLanguage(lang, { persist: true, notify: true })
    };
})();
