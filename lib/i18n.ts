// Minimal i18n layer: a single dictionary keyed by dot-path, with each leaf
// carrying both the RU and EN copy. Consumers read via `useLanguage().t()`
// which resolves the path for the active language. Keeping it flat and
// co-located (rather than adding a dependency like next-intl) keeps the
// project tiny and makes the strings easy to audit.
export type Lang = "ru" | "en";

export const LANGUAGES: Lang[] = ["ru", "en"];
export const DEFAULT_LANG: Lang = "ru";

type Leaf = Record<Lang, string>;
type Node = Leaf | { [key: string]: Node };

function isLeaf(node: Node): node is Leaf {
  return typeof (node as Leaf).ru === "string";
}

export const DICT = {
  identity: {
    firstName: { ru: "Байрам", en: "Bairam" },
    lastName: { ru: "Аннакурбанов", en: "Annakurbanov" },
    fullName: {
      ru: "Байрам Аннакурбанов",
      en: "Bairam Annakurbanov",
    },
    pageTitle: {
      ru: "Байрам Аннакурбанов — разработчик и технический руководитель",
      en: "Bairam Annakurbanov — Software Engineer & Tech Lead",
    },
  },
  picker: {
    season: { ru: "Сезон", en: "Season" },
    language: { ru: "Язык", en: "Language" },
  },
  seasons: {
    spring: { ru: "Весна", en: "Spring" },
    summer: { ru: "Лето", en: "Summer" },
    autumn: { ru: "Осень", en: "Autumn" },
    winter: { ru: "Зима", en: "Winter" },
  },
  nav: {
    aria: { ru: "Разделы", en: "Sections" },
    home: { ru: "Главная", en: "Home" },
    stack: { ru: "Технологии", en: "Stack" },
    experience: { ru: "Опыт", en: "Experience" },
    project: { ru: "Проект", en: "Project" },
    contact: { ru: "Контакты", en: "Contact" },
  },
  header: {
    availability: {
      ru: "Открыт к предложениям",
      en: "Open to opportunities",
    },
  },
  hero: {
    greeting: { ru: "Привет, я", en: "Hi, I am" },
    roleLine: {
      ru: "Инженер-программист",
      en: "Software Engineer",
    },
    tagline: {
      ru: "Создаю ERP-системы и приложения полного цикла для бизнеса.",
      en: "Specialised in ERPs and full-stack apps for businesses.",
    },
    cv: { ru: "Скачать резюме", en: "Download CV" },
    hire: { ru: "Связаться со мной", en: "Contact me" },
    scroll: { ru: "Листайте дальше", en: "Scroll to explore" },
    stackPrompt: {
      ru: "· узнайте о моих технологиях",
      en: "· explore my stack",
    },
  },
  stack: {
    title: { ru: "Технологии", en: "Tech Stack" },
    hint: {
      ru: "(наведите курсор на клавишу)",
      en: "(hint: hover over a key)",
    },
    hintMobile: {
      ru: "Инструменты, с которыми я работаю.",
      en: "The tools I build with.",
    },
  },
  experience: {
    title: { ru: "Опыт", en: "Experience" },
    subtitle: {
      ru: "Мой профессиональный путь.",
      en: "My professional journey.",
    },
  },
  projects: {
    kicker: { ru: "проект", en: "project" },
    viewMore: { ru: "Подробнее", en: "View more" },
    openSite: { ru: "Открыть сайт", en: "Visit site" },
    website: { ru: "Веб-сайт", en: "Website" },
    notPublished: { ru: "Приложение ещё не опубликовано.", en: "The app has not been published yet." },
    websiteNotPublished: { ru: "Сайт ещё не опубликован.", en: "The website has not been published yet." },
    viewCode: { ru: "Посмотреть код", en: "View code" },
    close: { ru: "Закрыть", en: "Close" },
    stackLabel: { ru: "Технологии", en: "Stack" },
    overview: { ru: "Описание", en: "Overview" },
  },
  contact: {
    kicker: { ru: "контакты", en: "contact" },
    title: { ru: "Обсудим проект?", en: "Let's talk?" },
    body: {
      ru: "Если вам интересно сотрудничество, напишите мне.",
      en: "If what you've seen interests you, the keyboard is ready for the first message.",
    },
    copyEmail: { ru: "Скопировать почту", en: "Copy email" },
    openMail: { ru: "Написать письмо", en: "Open mailto" },
    github: { ru: "GitHub", en: "GitHub" },
    linkedin: { ru: "LinkedIn", en: "LinkedIn" },
    telegram: { ru: "Telegram", en: "Telegram" },
    resume: { ru: "Резюме на hh.ru", en: "CV on hh.ru" },
    emailToast: { ru: "Адрес скопирован", en: "Email copied" },
    footer: {
      ru: "© 2026 Байрам Аннакурбанов. Все права защищены.",
      en: "© 2026 Bairam Annakurbanov. All rights reserved.",
    },
  },
  keyboard: {
    taglines: {
      javascript: {
        ru: "С него всё началось. До сих пор в деле.",
        en: "Where it all started. Still here, still in charge.",
      },
      typescript: {
        ru: "JavaScript с проверкой типов.",
        en: "Same JS, with a seatbelt.",
      },
      nestjs: {
        ru: "Структурированный бэкенд на TypeScript.",
        en: "Structured backends with TypeScript.",
      },
      codex: {
        ru: "ИИ помогает писать и улучшать код.",
        en: "AI that helps write and improve code.",
      },
      claude: {
        ru: "ИИ для анализа, разработки и решения задач.",
        en: "AI for analysis, creation, and problem-solving.",
      },
      flutter: {
        ru: "Интерфейсы для разных платформ на общей кодовой базе.",
        en: "Cross-platform interfaces from one codebase.",
      },
      dart: {
        ru: "Язык для приложений и веба.",
        en: "One language for apps and the web.",
      },
      jaspr: {
        ru: "Сайты на Dart с настоящим HTML.",
        en: "Websites with Dart and real HTML.",
      },
      c: {
        ru: "Низкоуровневый контроль и высокая скорость.",
        en: "Direct control and performance.",
      },
      swift: {
        ru: "Нативные приложения для платформ Apple.",
        en: "Native apps for Apple platforms.",
      },
      kotlin: {
        ru: "Современная разработка для Android.",
        en: "Modern code for Android.",
      },
      jetpackcompose: {
        ru: "Декларативные интерфейсы для Android.",
        en: "Declarative interfaces for Android.",
      },
      postgresql: {
        ru: "Надёжная база данных для реальных задач.",
        en: "The boring database that always works.",
      },
      docker: {
        ru: "Одинаковая среда локально и на сервере.",
        en: "Same on my machine, same in production.",
      },
      git: {
        ru: "История изменений и контроль версий.",
        en: "History and a time machine for your code.",
      },
    },
  },
} as const satisfies Record<string, Node>;

// Resolve a dotted path in the dictionary for a given language.
export function translate(path: string, lang: Lang): string {
  const parts = path.split(".");
  let ref: Node = DICT as unknown as Node;
  for (const p of parts) {
    if (isLeaf(ref)) return path;
    ref = (ref as { [key: string]: Node })[p];
    if (ref === undefined) return path;
  }
  if (isLeaf(ref)) return ref[lang] ?? ref.ru ?? path;
  return path;
}
