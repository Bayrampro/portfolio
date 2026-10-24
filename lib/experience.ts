import type { Experience } from "@/components/ExperienceCarousel";

// Condensed from the work-experience section of the supplied résumé.
export const experiences: Experience[] = [
  {
    company: "Роща разработки",
    role: { ru: "Инженер-программист", en: "Software Engineer" },
    period: { ru: "Август 2025 — настоящее время", en: "August 2025 — Present" },
    location: { ru: "Лида", en: "Lida" },
    summary: {
      ru: "Разрабатываю CRM «АгроСпектр», корпоративный мессенджер Alumnin, стриминговую платформу ACVideo и лаунчер TLauncher PE. Работаю с Flutter, нативными iOS- и Android-приложениями.",
      en: "Building AgroSpectr CRM, the Alumnin corporate messenger, the ACVideo streaming platform, and the TLauncher PE launcher using Flutter and native iOS and Android technologies.",
    },
    bullets: [
      {
        ru: "Спроектировал офлайн-режим на Drift с фоновой синхронизацией через WebSockets и WorkManager и автоматическим разрешением конфликтов.",
        en: "Designed offline storage with Drift, background synchronization through WebSockets and WorkManager, and automatic conflict resolution.",
      },
      {
        ru: "Провёл рефакторинг на Clean Architecture и Riverpod; настроил автоматические сборки, подписание и публикацию в App Store и Google Play.",
        en: "Refactored applications to Clean Architecture and Riverpod; automated builds, code signing, and App Store and Google Play releases.",
      },
      {
        ru: "Реализовал личные и групповые чаты, обмен медиа, статусы сообщений и синхронизацию истории после потери соединения.",
        en: "Implemented direct and group chats, media sharing, message statuses, and chat-history synchronization after connection loss.",
      },
      {
        ru: "Разработал видеоплеер с сохранением прогресса просмотра и каталог видео с поиском, категориями и рекомендациями.",
        en: "Built a video player with playback progress recovery and a video catalog with search, categories, and recommendations.",
      },
      {
        ru: "Переработал импорт игрового контента для Minecraft Bedrock и обновление через APK с проверкой версий, подписей и целостности файлов.",
        en: "Reworked Minecraft Bedrock content imports and APK updates with version, signature, and file-integrity checks.",
      },
    ],
    stack: ["Dart", "Flutter", "Swift", "Kotlin", "Riverpod", "Drift", "WebSockets", "GitHub Actions", "Fastlane"],
  },
  {
    company: "The Big Salmon",
    role: { ru: "Flutter-разработчик", en: "Flutter Developer" },
    period: { ru: "Июль — октябрь 2026", en: "July — October 2026" },
    location: { ru: "Краснодар", en: "Krasnodar" },
    summary: {
      ru: "Разрабатывал «Легион» — приложение для рабочих рейсов водителей, и «Дольку» — мобильную программу лояльности с цифровой картой, бонусами и персональными предложениями. Оба продукта — для Android и iOS.",
      en: "Developed Legion, a driver route-management app, and Dolka, a loyalty app with a digital card, bonuses, and personalized offers. Both products support Android and iOS.",
    },
    bullets: [
      {
        ru: "Реализовал управление маршрутами, торговыми точками и задачами водителей, а также начало и завершение рейсов с фотоотчётами.",
        en: "Implemented driver routes, store visits, and task management, including trip start and completion with photo reports.",
      },
      {
        ru: "Добавил офлайн-режим на ObjectBox: сохранение рейсов, выполненных операций, фотографий и показаний одометра без интернета.",
        en: "Added offline support with ObjectBox to store trips, completed operations, photos, and odometer readings without a connection.",
      },
      {
        ru: "Создал цифровую карту с QR-кодом, бонусным балансом и историей операций, каталог акций и персональных предложений.",
        en: "Built a digital loyalty card with a QR code, bonus balance, transaction history, promotions, and personalized offers.",
      },
      {
        ru: "Настроил диагностические отчёты с логами и контекстом ошибок; оптимизировал загрузку данных и обработку сетевых сбоев.",
        en: "Implemented diagnostic reports with logs and error context, and optimized data loading and network-error handling.",
      },
    ],
    stack: ["Dart", "Flutter", "Riverpod", "GoRouter", "ObjectBox", "Dio", "JSON-RPC", "Firebase", "Sentry"],
  },
  {
    company: "NIL IT",
    role: { ru: "Flutter-разработчик", en: "Flutter Developer" },
    period: { ru: "Январь — март 2026", en: "January — March 2026" },
    location: { ru: "Новосибирск", en: "Novosibirsk" },
    summary: {
      ru: "Разрабатывал Carte Market — интернет-магазин на Flutter Web для мобильных и настольных браузеров.",
      en: "Developed Carte Market, a Flutter Web storefront for mobile and desktop browsers.",
    },
    bullets: [
      {
        ru: "Создал адаптивный каталог товаров с категориями, поиском, фильтрами и карточками товаров.",
        en: "Built a responsive product catalog with categories, search, filters, and product detail pages.",
      },
      {
        ru: "Реализовал корзину с пересчётом стоимости и оформление заказа с валидацией данных и выбором доставки.",
        en: "Implemented a cart with automatic totals and a checkout flow with data validation and delivery selection.",
      },
      {
        ru: "Интегрировал REST API для загрузки каталога, получения информации о товарах и отправки заказов.",
        en: "Integrated REST APIs for catalog loading, product information, and order submission.",
      },
      {
        ru: "Оптимизировал производительность и загрузку изображений; проверял функциональность и совместимость в разных браузерах.",
        en: "Optimized performance and image loading, and tested functionality and compatibility across browsers.",
      },
    ],
    stack: ["Dart", "Flutter Web", "Riverpod", "GoRouter", "Dio", "REST API"],
  },
  {
    company: "Vade Apps",
    role: { ru: "Android-разработчик", en: "Android Developer" },
    period: { ru: "Ноябрь 2023 — июль 2025", en: "November 2023 — July 2025" },
    summary: {
      ru: "Разрабатывал нативные Android-приложения для создания контента: Quotes and Citations with AI, редактор Zeegb и AI Photo Captions & Quotes.",
      en: "Developed native Android content-creation apps: Quotes and Citations with AI, the Zeegb editor, and AI Photo Captions & Quotes.",
    },
    bullets: [
      {
        ru: "Интегрировал AI API для генерации текстов по теме, языку и стилю, а также контекстных подписей к фотографиям.",
        en: "Integrated AI APIs for text generation by topic, language, and style, and for contextual photo captions.",
      },
      {
        ru: "Создал редактор изображений и конструктор коротких видео с текстом, шаблонами, эффектами и экспортом в разных форматах.",
        en: "Built an image editor and short-video creator with text, templates, effects, and export in multiple formats.",
      },
      {
        ru: "Реализовал локальный каталог цитат с поиском, категориями, избранным и офлайн-доступом.",
        en: "Implemented a local quote catalog with search, categories, favorites, and offline access.",
      },
      {
        ru: "Подключил подписки и встроенные покупки через Google Play Billing; оптимизировал производительность и совместимость с версиями Android.",
        en: "Integrated subscriptions and in-app purchases through Google Play Billing, and optimized performance and Android version compatibility.",
      },
    ],
    stack: ["Kotlin", "Jetpack Compose", "Coroutines", "Flow", "Room", "MediaCodec", "Google Play Billing", "Firebase"],
  },
  {
    company: "KAYAK",
    role: { ru: "Flutter-разработчик", en: "Flutter Developer" },
    period: { ru: "Октябрь 2022 — ноябрь 2023", en: "October 2022 — November 2023" },
    location: { ru: "Москва", en: "Moscow" },
    summary: {
      ru: "Работал над приложением KAYAK для Android и iOS — поиском и бронированием авиабилетов, отелей и автомобилей.",
      en: "Worked on the KAYAK Android and iOS app for searching and booking flights, hotels, and rental cars.",
    },
    bullets: [
      {
        ru: "Оптимизировал поиск и большие списки с помощью пагинации, кэширования и виртуализации.",
        en: "Optimized search flows and large lists using pagination, caching, and virtualization.",
      },
      {
        ru: "Интегрировал Apple Pay, Google Pay и банковские платёжные SDK.",
        en: "Integrated Apple Pay, Google Pay, and banking payment SDKs.",
      },
      {
        ru: "Перевёл архитектуру на Riverpod и GoRouter; добавил офлайн-доступ к билетам и ваучерам через Drift.",
        en: "Migrated the architecture to Riverpod and GoRouter, and added offline ticket and voucher access with Drift.",
      },
      {
        ru: "Настроил CI/CD на GitHub Actions и Fastlane: автоматические сборки, подписание и A/B-тестирование функций.",
        en: "Set up CI/CD with GitHub Actions and Fastlane, automating builds, code signing, and feature A/B testing.",
      },
    ],
    stack: ["Dart", "Flutter", "Riverpod", "GoRouter", "Drift", "Payment SDK", "GitHub Actions", "Fastlane"],
  },
];
