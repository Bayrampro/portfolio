"use client";

import { useState } from "react";
import Image from "next/image";
import ProjectLinks from "@/components/ProjectLinks";
import FrozenKeyboard from "@/components/FrozenKeyboard";
import HeroHead from "@/components/HeroHead";
import SmoothScroll from "@/components/smooth-scroll";
import Reveal from "@/components/Reveal";
import ExperienceCarousel from "@/components/ExperienceCarousel";
import { experiences } from "@/lib/experience";
import SectionNav from "@/components/SectionNav";
import CopyEmail from "@/components/CopyEmail";
import SeasonPicker from "@/components/SeasonPicker";
import LanguagePicker from "@/components/LanguagePicker";
import type { ProjectDetail } from "@/components/ProjectModal";
import { useLanguage } from "@/components/LanguageProvider";
import { useIsMobile } from "@/lib/useIsMobile";
import { SKILLS_FLAT } from "@/lib/skills";
import type { Lang } from "@/lib/i18n";

const EMAIL = "annakurbanov02@mail.ru";
const CONTACT_LINKS = {
  telegram: "https://t.me/byprogger",
  resume: "https://hh.ru/resume/d7d8ebeeff0cf6dfa10039ed1f37494b6c5a6f",
  linkedin: "https://www.linkedin.com/in/bayram-annagurbanov-flutter",
  github: "https://github.com/Bayrampro",
};

const RESUME_FILES: Record<Lang, string> = {
  ru: "/resumes/Bayram_Annagurbanov_Resume_RU.pdf",
  en: "/resumes/Bayram_Annagurbanov_Resume_EN.pdf",
};

// Localised content lives in `{ ru, en }` objects inside these arrays so the
// page can be a straightforward array.map() at render time. Tech names stay
// as plain strings (they're brand names, not localised).
type Project = ProjectDetail & {
  align: "left" | "right";
  section: `project${number}`;
};

const projects: Project[] = [
  {
    num: "01",
    name: {
      ru: "АгроСпектр",
      en: "AgroSpectre",
    },
    stack: [
      "Flutter",
      "Dart",
      "Docker",
      "Git",
    ],
    desc: {
      ru: "Кроссплатформенная CRM для агробизнеса на Flutter: единое приложение для iOS, Android и Web с офлайн-режимом и синхронизацией данных.",
      en: "A cross-platform CRM for agribusiness built with Flutter: one app for iOS, Android, and Web with offline access and data synchronisation.",
    },
    details: {
      ru: "АгроСпектр — кроссплатформенное CRM-приложение для iOS, Android и Web. Архитектура построена на Clean Architecture и Riverpod. Офлайн-режим использует Drift, а фоновая синхронизация через WebSockets и WorkManager поддерживает актуальность данных с автоматическим разрешением конфликтов.",
      en: "AgroSpectre is a cross-platform CRM app for iOS, Android, and Web. It uses Clean Architecture and Riverpod. Drift supports offline access, while background synchronisation through WebSockets and WorkManager keeps data up to date with automatic conflict resolution.",
    },
    url: "https://agrospectre.technology/",
    logo: "/projects/agrospectre/logo.png",
    links: [
      { kind: "googlePlay" },
      { kind: "appStore" },
      { kind: "website", url: "https://agrospectre.technology/" },
    ],
    media: ["/projects/agrospectre/logo.png"],
    highlights: ["flutter", "dart", "docker", "git"],
    align: "left",
    section: "project1",
  },
  {
    num: "02",
    name: { ru: "ACVideo", en: "ACVideo" },
    stack: ["Swift", "SwiftUI", "Git"],
    desc: {
      ru: "Нативное iOS-приложение для просмотра видео: каталог с поиском и категориями, видеоплеер и продолжение просмотра с последней позиции.",
      en: "A native iOS video streaming app with a searchable catalogue, category filters, a video player, and playback that resumes where you left off.",
    },
    details: {
      ru: "Стриминговая платформа для iOS. Разработал видеоплеер с перемоткой, полноэкранным режимом и сохранением прогресса просмотра, каталог с поиском и фильтрацией, страницы видео и рекомендации похожего контента.",
      en: "An iOS streaming platform. Built a video player with seeking, full-screen playback, and saved progress, plus a searchable catalogue, category filters, video details, and related content recommendations.",
    },
    logo: "/projects/acvideo/logo.png",
    links: [
      { kind: "appStore", url: "https://apps.apple.com/ru/app/acvideo/id6738806248" },
    ],
    highlights: ["swift", "git"],
    align: "right",
    section: "project2",
  },
  {
    num: "03",
    name: { ru: "Alumnin", en: "Alumnin" },
    stack: ["Flutter", "Dart", "Git"],
    desc: {
      ru: "Корпоративный мессенджер для iOS и Android: личные и групповые чаты, обмен медиафайлами, статусы доставки и прочтения сообщений.",
      en: "A corporate messenger for iOS and Android with direct and group chats, media sharing, and message delivery and read receipts.",
    },
    details: {
      ru: "Кроссплатформенный корпоративный мессенджер на Flutter. Реализовал обмен сообщениями и медиа в реальном времени, статусы доставки и прочтения, синхронизацию истории переписки, загрузку предыдущих сообщений и обработку потери соединения.",
      en: "A cross-platform corporate messenger built with Flutter. Implemented real-time messaging and media sharing, delivery and read receipts, chat history synchronisation, loading earlier messages, and handling connection loss.",
    },
    logo: "/projects/alumnin/logo.png",
    links: [
      { kind: "googlePlay", url: "https://play.google.com/store/apps/details?id=com.alumnin.contactbook&hl=ru" },
      { kind: "appStore", url: "https://apps.apple.com/ru/app/alumnin-contact-book/id6755957505" },
    ],
    highlights: ["flutter", "dart", "git"],
    align: "left",
    section: "project3",
  },
  {
    num: "04",
    name: { ru: "TLauncher PE", en: "TLauncher PE" },
    stack: ["Kotlin", "Android SDK", "Git"],
    desc: {
      ru: "Нативный Android-лаунчер и каталог контента для Minecraft Bedrock: миры, скины, текстуры и аддоны с загрузкой, хранением и импортом в игру.",
      en: "A native Android launcher and content catalogue for Minecraft Bedrock: worlds, skins, textures, and add-ons with downloads, local storage, and in-game import.",
    },
    details: {
      ru: "Лаунчер и магазин контента для Minecraft Bedrock. Переработал загрузку, хранение и импорт миров, скинов, текстур и аддонов с поддержкой разных версий игры. Разрабатывал установку и обновление Minecraft через APK с проверкой версий, цифровых подписей и целостности файлов.",
      en: "A launcher and content store for Minecraft Bedrock. Reworked downloading, storing, and importing worlds, skins, textures, and add-ons across game versions. Developed APK-based installation and updates with version checks, signature verification, and file integrity checks.",
    },
    logo: "/projects/tlauncher-pe/logo.png",
    links: [{ kind: "website" }],
    highlights: ["kotlin", "jetpackcompose", "git"],
    align: "right",
    section: "project4",
  },
  {
    num: "05",
    name: { ru: "Легион", en: "Legion" },
    stack: ["Flutter", "Dart", "Git"],
    desc: {
      ru: "Приложение для водителей на iOS и Android: рабочие рейсы, маршруты и торговые точки, фотоотчёты и фиксация результатов посещений даже без интернета.",
      en: "An iOS and Android app for drivers: work trips, routes, store visits, and photo reports, with results saved even when offline.",
    },
    details: {
      ru: "Кроссплатформенное приложение для водителей, обслуживающих магазины и торговые центры. Реализовал управление рейсами, статусы задач, начало и завершение рейсов с фотографиями и показаниями одометра. Офлайн-режим на ObjectBox сохраняет результаты без соединения, а диагностические отчёты помогают выявлять и устранять ошибки.",
      en: "A cross-platform app for drivers servicing stores and shopping centres. Implemented trip management, task statuses, and starting and finishing trips with photos and odometer readings. ObjectBox stores results offline, while diagnostic reports help investigate and resolve errors.",
    },
    logo: "/projects/legion/logo.png",
    links: [{ kind: "googlePlay" }, { kind: "appStore" }],
    highlights: ["flutter", "dart", "git"],
    align: "left",
    section: "project5",
  },
  {
    num: "06",
    name: { ru: "Долька", en: "Dolka" },
    stack: ["Flutter", "Dart", "Git"],
    desc: {
      ru: "Приложение программы лояльности для iOS и Android: цифровая карта с QR-кодом, бонусный баланс, история операций, акции и персональные предложения.",
      en: "An iOS and Android loyalty app with a digital QR card, bonus balance, transaction history, promotions, and personalised offers.",
    },
    details: {
      ru: "Кроссплатформенное приложение программы лояльности на Flutter. Разработал цифровую карту с QR-кодом, отображение бонусного баланса и истории начислений и списаний. Реализовал каталог акций и персональных предложений с условиями участия и сроками действия, оптимизировал загрузку данных и обработку сетевых ошибок.",
      en: "A cross-platform loyalty app built with Flutter. Developed the digital QR card, bonus balance, and points earned and redeemed history. Implemented a catalogue of promotions and personalised offers with terms and expiry dates, and improved data loading and network error handling.",
    },
    logo: "/projects/dolka/logo.png",
    links: [{ kind: "googlePlay" }, { kind: "appStore" }],
    highlights: ["flutter", "dart", "git"],
    align: "right",
    section: "project6",
  },
  {
    num: "07",
    name: { ru: "Quotes and Citations with AI", en: "Quotes and Citations with AI" },
    stack: ["Kotlin", "Android SDK", "Git"],
    desc: {
      ru: "Нативное Android-приложение для генерации цитат и создания контента с помощью ИИ: выбор тематики, языка и стиля, каталог цитат и избранное.",
      en: "A native Android app for AI-generated quotes and content creation, with topic, language, and style selection, a quote catalogue, and favourites.",
    },
    details: {
      ru: "Приложение для генерации персонализированных цитат с помощью AI API. Реализовал выбор тематики, языка и стиля, локальное хранение и поиск по каталогу, категории, избранное и офлайн-доступ к сохранённым цитатам.",
      en: "An app for personalised quote generation using an AI API. Implemented topic, language, and style selection, local storage and catalogue search, categories, favourites, and offline access to saved quotes.",
    },
    logo: "/projects/quotes-ai/logo-clean.png",
    links: [{ kind: "googlePlay", url: "https://play.google.com/store/apps/details?id=com.vadeapps.frasesdemaloka&utm_source=chatgpt.com" }],
    highlights: ["kotlin", "jetpackcompose", "git"],
    align: "left",
    section: "project7",
  },
  {
    num: "08",
    name: { ru: "Zeegb", en: "Zeegb" },
    stack: ["Kotlin", "Android SDK", "Git"],
    desc: {
      ru: "Нативный Android-редактор видео и изображений для социальных сетей: шаблоны, текст, шрифты, фоны и экспорт готовых публикаций.",
      en: "A native Android video and image editor for social media, with templates, text, fonts, backgrounds, and export for finished posts.",
    },
    details: {
      ru: "Мобильный редактор для создания контента в социальных сетях. Разработал редактирование изображений с наложением текста, настройкой шрифтов, цветов и фонов, конструктор коротких видео на основе шаблонов, рендеринг и экспорт в разных форматах и разрешениях.",
      en: "A mobile editor for social media content. Developed image editing with text overlays, fonts, colours, and backgrounds, a template-based short video creator, and rendering and export in different formats and resolutions.",
    },
    logo: "/projects/zeegb/logo.png",
    links: [{ kind: "googlePlay", url: "https://play.google.com/store/apps/details?id=com.ocaradasfrases.criadordevideos&utm_source=chatgpt.com" }],
    highlights: ["kotlin", "jetpackcompose", "git"],
    align: "right",
    section: "project8",
  },
  {
    num: "09",
    name: { ru: "AI Photo Captions & Quotes", en: "AI Photo Captions & Quotes" },
    stack: ["Kotlin", "Android SDK", "Git"],
    desc: {
      ru: "Нативное Android-приложение для AI-генерации подписей к фотографиям и создания публикаций: снимки из галереи или камеры и подписи с учётом содержания фото.",
      en: "A native Android app for AI-generated photo captions and post creation, using photos from the gallery or camera to suggest captions based on image content.",
    },
    details: {
      ru: "Приложение для создания подписей и публикаций с помощью ИИ. Реализовал обработку фотографий из галереи и камеры, передачу изображений в AI-сервис для генерации контекстных подписей и создание готовых публикаций.",
      en: "An app for creating captions and posts with AI. Implemented photo handling from the gallery and camera, image processing through an AI service for contextual captions, and post creation.",
    },
    logo: "/projects/ai-photo-captions/logo.png",
    links: [{ kind: "googlePlay", url: "https://play.google.com/store/apps/details?id=com.vadeapps.legendasparafotos&utm_source=chatgpt.com" }],
    highlights: ["kotlin", "jetpackcompose", "git"],
    align: "left",
    section: "project9",
  },
];

function pick<T>(loc: { ru: T; en: T }, lang: Lang): T {
  return loc[lang];
}

// Hero name split per word so each can rise independently. Whitespace
// preserved as its own span so the line wraps naturally if needed.
function HeroWord({
  text,
  delay,
  className = "",
}: {
  text: string;
  delay: number;
  className?: string;
}) {
  return (
    <span className={`hero-word ${className}`}>
      <span style={{ animationDelay: `${delay}ms` }}>{text}</span>
    </span>
  );
}

export default function Home() {
  const { t, lang } = useLanguage();
  const isMobile = useIsMobile();
  const [experienceVisible, setExperienceVisible] = useState(false);

  return (
    <SmoothScroll>
      <div className="relative">
        {/* Desktop: persistent 3D scene fullscreen behind content. On mobile
            the canvas lives inside the hero instead (see below) so it scrolls
            away and the rest of the page is clean, fast 2D. */}
        {!isMobile && (
          <div className="portfolio-keyboard-background fixed inset-0 z-0" style={{ opacity: experienceVisible ? 0 : 1, pointerEvents: experienceVisible ? "none" : undefined }}>
            <FrozenKeyboard enabled={!experienceVisible} />
          </div>
        )}

        {/* Header */}
        <header className="fixed top-0 inset-x-0 z-50 px-6 sm:px-10 md:px-14 py-5 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-3 pointer-events-auto">
            <span
              data-cursor="hover"
              className="text-[11px] sm:text-sm font-semibold tracking-tight text-ice-100 whitespace-nowrap"
            >
              {t("identity.fullName")}
            </span>
            {/* Wrapper (not the pill itself) carries the hide: .status-pill
                hard-sets display:inline-flex, which beats Tailwind's .hidden
                due to CSS source order, so hiding must happen on a parent. */}
            <span className="hidden lg:inline-flex">
              <span className="status-pill">{t("header.availability")}</span>
            </span>
          </div>
          <div className="flex items-center gap-2 pointer-events-auto">
            <SeasonPicker />
            <span className="hidden md:inline-flex">
            <a
              href={CONTACT_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="frost-btn !py-1.5 !px-3 !text-xs"
            >
              <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden>
                <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 005.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
              <span>GitHub</span>
            </a>
            </span>
            <LanguagePicker />
          </div>
        </header>

        <SectionNav />

        <main className="relative z-10 pointer-events-none">
          {/* Hero */}
          <section
            data-kb-section="hero"
            className="relative min-h-screen flex flex-col justify-center p-6 sm:p-10 md:p-14"
          >
            {/* This model belongs only to the opening section. */}
            <div
              className="w-full h-[34vh] mt-12 -mb-4 md:mt-0 md:mb-0 md:absolute md:top-[14%] md:right-[3%] md:w-[51%] md:h-[72%]"
              role="img"
              aria-label="3D head model"
            >
              <HeroHead />
            </div>
            <div className="relative z-10 mt-2 md:mt-20">
              <p
                className="text-[11px] uppercase tracking-[0.3em] text-ice-300 mb-5 fade-in-up"
                style={{ ["--d" as string]: "0ms" }}
              >
                {t("hero.greeting")}
              </p>
              <h1 className="text-[clamp(2rem,6vw,7rem)] font-bold tracking-[-0.03em] text-ice-50 leading-[0.92] whitespace-nowrap">
                <HeroWord text={t("identity.firstName")} delay={120} />
                <br />
                <HeroWord text={t("identity.lastName")} delay={260} className="text-ice-400" />
              </h1>
              <p
                className="mt-8 text-base sm:text-lg md:text-xl text-ice-200 max-w-xl leading-relaxed fade-in-up"
                style={{ ["--d" as string]: "520ms" }}
              >
                {t("hero.roleLine")}
              </p>

              {/* CTAs */}
              <div
                className="mt-10 flex flex-wrap items-center gap-3 pointer-events-auto fade-in-up"
                style={{ ["--d" as string]: "700ms" }}
              >
                <a
                  href={RESUME_FILES[lang]}
                  download
                  data-cursor="hover"
                  data-magnetic
                  className="frost-btn frost-btn--primary"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z" />
                    <path d="M14 3v5h5" />
                  </svg>
                  {t("hero.cv")}
                </a>
                <button
                  type="button"
                  data-cursor="hover"
                  data-magnetic
                  className="frost-btn"
                  onClick={() =>
                    document
                      .querySelector<HTMLElement>(
                        '[data-kb-section="contact"]'
                      )
                      ?.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                >
                  {t("hero.hire")}
                </button>
                {/* Mobile-only full-width break: forces the social icons onto
                    their own row below the two primary buttons. Hidden on md+
                    so desktop keeps everything on a single line. */}
                <div className="basis-full h-0 md:hidden" aria-hidden />
                <a
                  href={CONTACT_LINKS.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  data-magnetic
                  className="frost-icon"
                  aria-label="Telegram"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M21 3 3 10l7 3 3 7 8-17Z" />
                    <path d="m10 13 5-5" />
                  </svg>
                </a>
                <a
                  href={CONTACT_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  data-magnetic
                  className="frost-icon"
                  aria-label="LinkedIn"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden>
                    <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8h4.56v14H.22V8zm7.4 0h4.37v1.92h.06c.61-1.15 2.1-2.36 4.32-2.36 4.62 0 5.47 3.04 5.47 6.99V22h-4.56v-6.59c0-1.57-.03-3.6-2.19-3.6-2.19 0-2.53 1.71-2.53 3.48V22H7.62V8z" />
                  </svg>
                </a>
                <a
                  href={CONTACT_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  data-magnetic
                  className="frost-icon"
                  aria-label="GitHub"
                >
                  <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden>
                    <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 005.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Animated scroll indicator at bottom */}
            <div
              className="mt-10 md:mt-auto flex items-center gap-3 fade-in-up"
              style={{ ["--d" as string]: "900ms" }}
            >
              <span className="scroll-indicator">
                <span>{t("hero.scroll")}</span>
                <span className="scroll-indicator__rail" />
              </span>
              <span className="text-[11px] uppercase tracking-[0.25em] text-ice-400 hidden sm:inline">
                {t("hero.stackPrompt")}
              </span>
            </div>
          </section>

          {/* Stack — desktop relies on the 200vh scroll + sticky title while
              the keyboard does the talking on hover. On mobile (md:) that
              choreography is gone, so we drop the tall scroll and render a
              real, legible skills grid with the same taglines. */}
          <section
            data-kb-section="stack"
            className="relative md:min-h-[200vh] p-6 sm:p-10 md:p-14"
          >
            {isMobile && (
              <div className="w-full h-[34vh] pointer-events-auto">
                <FrozenKeyboard mobile />
              </div>
            )}
            <div className="relative md:h-[150vh]">
              <div className="md:sticky md:top-28 text-center">
                <Reveal>
                  <h2 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-[-0.03em] text-ice-50 leading-[0.95]">
                    {t("stack.title")}
                  </h2>
                </Reveal>
                <Reveal delay={120}>
                  <p className="mt-3 text-sm sm:text-base text-ice-400">
                    <span className="hidden md:inline">{t("stack.hint")}</span>
                    <span className="md:hidden">{t("stack.hintMobile")}</span>
                  </p>
                </Reveal>
              </div>

              {/* Mobile skills grid (recovers the hover interaction as static
                  content the keyboard can't surface on touch). */}
              {isMobile && (
                <div className="md:hidden mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 pointer-events-auto">
                  {SKILLS_FLAT.map((s) => (
                    <div
                      key={s.slug}
                      className="flex items-start gap-3 rounded-xl bg-ink-1/70 backdrop-blur-sm border border-ink-3 p-4"
                    >
                      {s.image ? (
                        <span
                          className="flex-none mt-0.5 w-[22px] h-[22px] bg-contain bg-center bg-no-repeat"
                          style={{ backgroundImage: `url(${s.image})` }}
                          aria-hidden
                        />
                      ) : (
                        <svg
                          viewBox="0 0 24 24"
                          width="22"
                          height="22"
                          fill={`#${s.hex}`}
                          className="flex-none mt-0.5"
                          aria-hidden
                        >
                          <path d={s.path} />
                        </svg>
                      )}
                      <div>
                        <p className="text-ice-50 font-medium text-sm">
                          {s.title}
                        </p>
                        <p className="text-ice-400 text-xs mt-0.5 leading-snug">
                          {t(`keyboard.taglines.${s.slug}`)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Company logos expand into readable experience details. */}
          <section
            id="experience"
            data-kb-section="experience"
            className="experience-section relative"
            aria-labelledby="experience-heading"
          >
            <div className="experience-section__heading text-center">
              <Reveal>
                <h2 id="experience-heading" className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-[-0.03em] text-ice-50 leading-[0.95]">
                  {t("experience.title")}
                </h2>
              </Reveal>
              <Reveal delay={120}>
                <p className="mt-3 text-sm sm:text-base text-ice-300">
                  {t("experience.subtitle")}
                </p>
              </Reveal>
            </div>
            <Reveal className="relative z-10" delay={160}>
              <ExperienceCarousel experiences={experiences} onVisibilityChange={setExperienceVisible} />
            </Reveal>
          </section>

          {/* Projects */}
          {projects.map((p) => (
            <section
              key={p.num}
              data-kb-section={p.section}
              data-kb-highlights={(p.highlights ?? []).join(",")}
              className="relative py-20 md:min-h-screen flex items-center p-6 sm:p-10 md:p-14 overflow-hidden"
            >
              <span
                aria-hidden
                className={`watermark hidden md:block top-1/2 -translate-y-1/2 ${
                  p.align === "left" ? "right-[-2vw]" : "left-[-2vw]"
                }`}
              >
                {p.num}
              </span>

              <div
                className={
                  p.align === "left"
                    ? "max-w-xl relative"
                    : // Right-aligned cards get extra right padding on md+ so
                      // the action buttons ("View more") don't sit under the
                      // fixed SectionNav dots on the right edge. On mobile they
                      // collapse to a normal left-aligned full-width card.
                      "max-w-xl relative md:ml-auto md:text-right md:mr-16 lg:mr-24"
                }
              >
                <Reveal>
                  <p className="font-mono text-sm text-ice-400 mb-3">
                    {p.num} · {t("projects.kicker")}
                  </p>
                </Reveal>
                <Reveal delay={80}>
                  <h2 className={`${p.logo ? `flex items-center gap-3 sm:gap-4 ${p.align === "right" ? "md:justify-end " : ""}` : ""}text-3xl sm:text-5xl font-semibold tracking-tight text-ice-50 leading-[1.05] mb-4`}>
                    {p.logo && (
                      <Image
                        src={p.logo}
                        alt=""
                        width={64}
                        height={64}
                        className="h-12 w-12 sm:h-16 sm:w-16 shrink-0 rounded-2xl"
                      />
                    )}
                    <span>{pick(p.name, lang)}</span>
                  </h2>
                </Reveal>
                {p.badge ? (
                  <Reveal delay={140}>
                    <span className="inline-block text-[10px] uppercase tracking-widest text-ice-300 border border-ice-700 rounded-full px-2 py-0.5 mb-4">
                      {pick(p.badge, lang)}
                    </span>
                  </Reveal>
                ) : null}
                <Reveal delay={180}>
                  <p className="text-base sm:text-lg text-ice-200 leading-relaxed mb-6">
                    {pick(p.desc, lang)}
                  </p>
                </Reveal>
                <Reveal delay={260}>
                  <div
                    className={
                      p.align === "right"
                        ? "flex flex-wrap gap-1.5 md:justify-end pointer-events-auto mb-5"
                        : "flex flex-wrap gap-1.5 pointer-events-auto mb-5"
                    }
                  >
                    {p.stack.map((s) => (
                      <span
                        key={s}
                        data-cursor="hover"
                        className="frost-chip"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </Reveal>
                {p.links && (
                  <Reveal delay={320}>
                    <ProjectLinks links={p.links} align={p.align} className="pointer-events-auto" />
                  </Reveal>
                )}
              </div>
            </section>
          ))}

          {/* Contact — copy pinned to the left so the (large, hero-posed)
              keyboard on the right has room to bob its random keys. */}
          <section
            id="contact"
            data-kb-section="contact"
            className="relative py-24 md:min-h-screen flex flex-col justify-center p-6 sm:p-10 md:p-14 overflow-hidden"
          >
            <div className="max-w-xl relative">
              <Reveal>
                <p className="font-mono text-sm text-ice-400 mb-3">
                  {t("contact.kicker")}
                </p>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="text-4xl sm:text-6xl font-semibold tracking-tight text-ice-50 mb-6">
                  {t("contact.title")}
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="text-ice-200 mb-10">{t("contact.body")}</p>
              </Reveal>
              <Reveal delay={240}>
                <div className="flex flex-wrap gap-3 pointer-events-auto">
                  <CopyEmail
                    email={EMAIL}
                    className="frost-btn frost-btn--primary"
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="M3 7l9 6 9-6" />
                    </svg>
                    {t("contact.copyEmail")}
                  </CopyEmail>
                  <a
                    href={`mailto:${EMAIL}`}
                    data-cursor="hover"
                    className="frost-btn"
                  >
                    {t("contact.openMail")}
                  </a>
                  <a
                    href={CONTACT_LINKS.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="hover"
                    className="frost-btn"
                  >
                    {t("contact.telegram")}
                  </a>
                  <a
                    href={CONTACT_LINKS.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="hover"
                    className="frost-btn"
                  >
                    {t("contact.resume")}
                  </a>
                  <a
                    href={CONTACT_LINKS.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="hover"
                    className="frost-btn"
                  >
                    {t("contact.github")}
                  </a>
                  <a
                    href={CONTACT_LINKS.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="hover"
                    className="frost-btn"
                  >
                    {t("contact.linkedin")}
                  </a>
                </div>
              </Reveal>
            </div>
            <Reveal delay={320}>
              <p className="mt-14 text-[11px] uppercase tracking-[0.25em] text-ice-400">
                {t("contact.footer")}
              </p>
            </Reveal>
          </section>
        </main>

      </div>
    </SmoothScroll>
  );
}
