"use client";

import { useId, useState } from "react";
import { siAppstore, siGoogleplay } from "simple-icons";
import { useLanguage } from "@/components/LanguageProvider";

export type ProjectLink = {
  kind: "googlePlay" | "appStore" | "website";
  url?: string;
};

export default function ProjectLinks({
  links,
  align = "left",
  className = "",
}: {
  links: ProjectLink[];
  align?: "left" | "right";
  className?: string;
}) {
  const { t } = useLanguage();
  const [unpublished, setUnpublished] = useState<ProjectLink["kind"] | null>(null);
  const noticeId = useId();
  const labels = {
    googlePlay: "Google Play",
    appStore: "App Store",
    website: t("projects.website"),
  };

  return (
    <div className={className}>
      <div className={`flex flex-wrap gap-2 ${align === "right" ? "md:justify-end" : ""}`}>
        {links.map(({ kind, url }) => {
          const icon = kind === "googlePlay" ? siGoogleplay : siAppstore;
          const content = (
            <>
              {kind === "website" ? (
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" className="shrink-0" aria-hidden>
                  <circle cx="12" cy="12" r="9" />
                  <ellipse cx="12" cy="12" rx="4" ry="9" />
                  <path d="M3 12h18" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className="shrink-0" aria-hidden>
                  <path d={icon.path} />
                </svg>
              )}
              {labels[kind]}
            </>
          );

          return url ? (
            <a key={kind} href={url} target="_blank" rel="noopener noreferrer" className="frost-btn !px-4 !py-3 !text-sm" data-cursor="hover">
              {content}
            </a>
          ) : (
            <button key={kind} type="button" className="frost-btn !px-4 !py-3 !text-sm" data-cursor="hover" onClick={() => setUnpublished(kind)} aria-describedby={unpublished === kind ? noticeId : undefined}>
              {content}
            </button>
          );
        })}
      </div>
      <p id={noticeId} role="status" aria-live="polite" aria-atomic="true" className={unpublished ? "mt-3 text-sm text-ice-200 leading-relaxed" : "sr-only"}>
        {unpublished ? `${labels[unpublished]}: ${t(unpublished === "website" ? "projects.websiteNotPublished" : "projects.notPublished")}` : ""}
      </p>
    </div>
  );
}
