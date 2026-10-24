"use client";

import { useActiveSection } from "@/lib/use-active-section";
import { useLanguage } from "@/components/LanguageProvider";

// Vertical dots fixed to the right edge that highlight the current section
// using the same `data-kb-section` markers the 3D scene already observes.
// Click a dot → smooth scroll (Lenis is wrapping the document, so a regular
// scrollIntoView gets intercepted and animated by Lenis). Hidden on small
// screens to avoid crowding the keyboard.
export default function SectionNav() {
  const [active] = useActiveSection();
  const { t } = useLanguage();

  const SECTIONS = [
    { id: "hero", label: t("nav.home") },
    { id: "stack", label: t("nav.stack") },
    { id: "experience", label: t("nav.experience") },
    { id: "project1", label: `${t("nav.project")} 01` },
    { id: "project2", label: `${t("nav.project")} 02` },
    { id: "project3", label: `${t("nav.project")} 03` },
    { id: "project4", label: `${t("nav.project")} 04` },
    { id: "project5", label: `${t("nav.project")} 05` },
    { id: "project6", label: `${t("nav.project")} 06` },
    { id: "project7", label: `${t("nav.project")} 07` },
    { id: "project8", label: `${t("nav.project")} 08` },
    { id: "project9", label: `${t("nav.project")} 09` },
    { id: "contact", label: t("nav.contact") },
  ];

  const goTo = (id: string) => {
    const target = document.querySelector<HTMLElement>(
      `[data-kb-section="${id}"]`
    );
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      aria-label={t("nav.aria")}
      className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-3 pointer-events-auto"
    >
      {SECTIONS.map((s) => {
        const isActive = active === s.id;
        return (
          <button
            key={s.id}
            type="button"
            onClick={() => goTo(s.id)}
            data-cursor="hover"
            className="group relative flex items-center gap-3"
            aria-label={s.label}
            aria-current={isActive ? "true" : undefined}
          >
            <span
              className={`text-[10px] uppercase tracking-[0.25em] text-ice-200 transition-all duration-300 ${
                isActive
                  ? "opacity-100 -translate-x-1"
                  : "opacity-0 translate-x-2 group-hover:opacity-80 group-hover:translate-x-0"
              }`}
            >
              {s.label}
            </span>
            <span
              className={`block rounded-full transition-all duration-300 ${
                isActive
                  ? "w-2.5 h-2.5 bg-ice-100 shadow-[0_0_12px_rgba(234,242,251,0.6)]"
                  : "w-1.5 h-1.5 bg-ice-500/60 group-hover:bg-ice-200"
              }`}
            />
          </button>
        );
      })}
    </nav>
  );
}
