"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useId, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import type { Lang } from "@/lib/i18n";
import { getActiveIndex, getCarouselWheelDelta, speedWheel } from "@/lib/experience-carousel";
import { useSceneActivity } from "@/lib/use-scene-activity";
import { experienceLogos } from "@/lib/experience-logos";

const ExperienceScene = dynamic(() => import("./ExperienceScene"), { ssr: false });
// Center the finite strip on its middle company from the first render.
const initialIndex = Math.floor((experienceLogos.length - 1) / 2);
const initialProgress = experienceLogos.length > 1 ? initialIndex / (experienceLogos.length - 1) * 100 : 0;
type Localised = Record<Lang, string>;

export type Experience = {
  role: Localised;
  company: string;
  /** Local image path. Omit until the company logo is available. */
  logo?: string;
  period: Localised;
  location?: Localised;
  summary: Localised;
  bullets: Localised[];
  stack: string[];
};

export type ExperiencePreview = {
  company: string;
  logo?: string;
  backgroundColor?: string;
  logoShape?: "circle";
  experience?: Experience;
};

const copy = {
  label: { ru: "Места работы", en: "Places I've worked" },
  open: { ru: "Открыть опыт работы", en: "View experience" },
  close: { ru: "Вернуться к компаниям", en: "Back to companies" },
  placeholder: { ru: "Заглушка", en: "Placeholder" },
  achievements: { ru: "Результаты работы", en: "Selected impact" },
  soon: { ru: "Здесь будет\nследующая история.", en: "Another story\nwill live here." },
  soonBody: {
    ru: "Позже здесь появятся должность, период работы и результаты в этой компании.",
    en: "The role, dates, and achievements at this company will be added here.",
  },
};

function Arrow({ previous = false }: { previous?: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={previous ? "M19 12H5m6-6-6 6 6 6" : "M5 12h14m-6-6 6 6-6 6"} />
    </svg>
  );
}

export default function ExperienceCarousel({ experiences, onVisibilityChange }: { experiences: Experience[]; onVisibilityChange?: (visible: boolean) => void }) {
  const { lang } = useLanguage();
  const [current, setCurrent] = useState(initialIndex);
  const [opened, setOpened] = useState<number | null>(null);
  const [closing, setClosing] = useState<number | null>(null);
  const [canvasReady, setCanvasReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const sceneActive = useSceneActivity(root);
  const detail = useRef<HTMLDivElement>(null);
  const progressRef = useRef(initialProgress);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const detailId = useId();
  const instructionsId = useId();
  const items = useMemo<ExperiencePreview[]>(() => experienceLogos.map((item) => ({
    ...item,
    experience: experiences.find((experience) => experience.company === item.company),
  })), [experiences]);
  const count = items.length;
  const selected = opened === null ? null : items[opened];

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!root.current || !onVisibilityChange) return;
    const observer = new IntersectionObserver(([entry]) => {
      onVisibilityChange(entry.isIntersecting && entry.intersectionRatio > .35);
    }, { threshold: [0, .35, .5] });
    observer.observe(root.current);
    return () => { observer.disconnect(); onVisibilityChange(false); };
  }, [onVisibilityChange]);

  useEffect(() => {
    if (opened !== null) {
      detail.current?.focus({ preventScroll: true });
      const content = detail.current?.querySelector(".career-gallery__detail-content");
      if (content) content.scrollTop = 0;
    }
  }, [opened]);

  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  useEffect(() => {
    const element = stage.current;
    if (!element) return;
    const wheel = (event: WheelEvent) => {
      if ((event.target as Element).closest(".career-gallery__detail-content")) return;
      if (opened !== null || closing !== null) return;
      const delta = getCarouselWheelDelta(event);
      if (!delta) return;
      event.preventDefault();
      progressRef.current = Math.max(0, Math.min(100, progressRef.current + delta * speedWheel));
      if (!canvasReady) setCurrent(getActiveIndex(progressRef.current, count));
    };
    element.addEventListener("wheel", wheel, { passive: false });
    return () => element.removeEventListener("wheel", wheel);
  }, [opened, closing, canvasReady, count]);

  const open = useCallback((index: number) => {
    if (closing !== null) return;
    progressRef.current = count > 1 ? (index / (count - 1)) * 100 : 0;
    setCurrent(index);
    setOpened(index);
  }, [closing, count]);

  const close = useCallback(() => {
    if (opened === null) return;
    setClosing(reducedMotion ? null : opened);
    setOpened(null);
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (!reducedMotion) closeTimer.current = setTimeout(() => setClosing(null), 1500);
    requestAnimationFrame(() => root.current?.focus({ preventScroll: true }));
  }, [opened, reducedMotion]);

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === "Escape" && opened !== null) { event.preventDefault(); close(); return; }
    if (opened !== null || closing !== null) return;
    if (event.key === "Enter" || event.key === " ") { event.preventDefault(); open(current); return; }
    let next = current;
    switch (event.key) {
      case "ArrowLeft": next = Math.max(0, current - 1); break;
      case "ArrowRight": next = Math.min(count - 1, current + 1); break;
      case "Home": next = 0; break;
      case "End": next = count - 1; break;
      default: return;
    }
    event.preventDefault();
    progressRef.current = count > 1 ? (next / (count - 1)) * 100 : 0;
    setCurrent(getActiveIndex(progressRef.current, count));
  }

  return (
    <div ref={root} className={`career-gallery ${canvasReady ? "career-gallery--webgl" : ""} ${selected ? "career-gallery--open" : ""}`} role="region" aria-roledescription={lang === "ru" ? "карусель" : "carousel"} aria-label={copy.label[lang]} aria-describedby={instructionsId} tabIndex={0} onKeyDown={handleKeyDown}>
      <div ref={stage} className="career-gallery__stage" data-lenis-prevent-horizontal>
        <div className="career-gallery__canvas" aria-hidden="true">
          <ExperienceScene running={sceneActive} items={items} progressRef={progressRef} activePlane={opened} closingPlane={closing} onOpen={open} onClose={close} onActiveChange={setCurrent} reducedMotion={reducedMotion} onReady={setCanvasReady} />
        </div>
        <div className="career-gallery__fallback-strip" aria-hidden={canvasReady || selected !== null} inert={canvasReady || selected !== null}>
          {items.map((item, index) => (
            <button
              key={`${item.company}-${index}`}
              type="button"
              className="career-gallery__fallback-logo"
              style={{ "--offset": index - current, "--distance": Math.abs(index - current), backgroundColor: item.backgroundColor } as CSSProperties}
              aria-label={`${copy.open[lang]}: ${item.company}`}
              tabIndex={-1}
              onClick={() => open(index)}
            >
              <span className="career-gallery__logo" style={{ backgroundImage: `url(${item.logo})`, borderRadius: item.logoShape === "circle" ? "50%" : undefined }} />
            </button>
          ))}
        </div>
        {selected && (
          <div ref={detail} id={detailId} className="career-gallery__detail" role="region" aria-labelledby={`${detailId}-title`} tabIndex={-1}>
            <button type="button" className="career-gallery__close" onClick={close} aria-label={copy.close[lang]} data-cursor="hover"><Arrow previous /><span>{copy.close[lang]}</span><span aria-hidden="true">×</span></button>
            <div className="career-gallery__detail-content" data-lenis-prevent>
              {selected.experience ? <>
                <header className="career-gallery__detail-header"><span>{selected.company}</span><span>{selected.experience.period[lang]}</span></header>
                <h3 id={`${detailId}-title`}>{selected.experience.role[lang]}</h3>
                {selected.experience.location && <p className="career-gallery__location">{selected.experience.location[lang]}</p>}
                <p className="career-gallery__summary">{selected.experience.summary[lang]}</p>
                <p className="career-gallery__impact-label">{copy.achievements[lang]}</p>
                <ul className="career-gallery__impact">{selected.experience.bullets.map((bullet, index) => <li key={index}><span aria-hidden="true">↗</span><span className="career-gallery__impact-text">{bullet[lang]}</span></li>)}</ul>
                <div className="career-gallery__stack">{selected.experience.stack.map((tech) => <span key={tech} className="frost-chip">{tech}</span>)}</div>
              </> : <div className="career-gallery__empty">
                <span className="career-gallery__placeholder-label">{selected.company} · {copy.placeholder[lang]}</span>
                <h3 id={`${detailId}-title`}>{copy.soon[lang]}</h3>
                <p className="career-gallery__summary">{copy.soonBody[lang]}</p>
              </div>}
            </div>
          </div>
        )}
      </div>
      <p id={instructionsId} className="sr-only">{lang === "ru" ? "Листайте горизонтально, используйте Shift с колёсиком или перетаскивайте. Стрелки выбирают компанию, Enter открывает, Escape закрывает." : "Scroll horizontally, use Shift with the wheel, or drag to browse. Arrow keys select a company, Enter opens it, and Escape closes it."}</p>
      <p className="sr-only" aria-live="polite" aria-atomic="true">{current + 1} / {count}: {items[current].company}</p>
    </div>
  );
}
