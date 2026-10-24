export type ActiveSection = { id: string; highlights: string[] };

// Re-read current nodes and geometry, including sections added after mount.
export function observeActiveSection(onChange: (section: ActiveSection) => void) {
  let frame = 0;

  const update = () => {
    frame = 0;
    const height = window.innerHeight;
    const center = height / 2;
    let best: HTMLElement | null = null;
    let bestDistance = Infinity;
    let bestVisible = 0;

    for (const element of document.querySelectorAll<HTMLElement>("[data-kb-section]")) {
      const { top, bottom } = element.getBoundingClientRect();
      const visible = Math.min(bottom, height) - Math.max(top, 0);
      if (visible <= 0) continue;
      const distance = Math.max(top - center, center - bottom, 0);
      if (distance < bestDistance || (distance === bestDistance && visible > bestVisible)) {
        best = element;
        bestDistance = distance;
        bestVisible = visible;
      }
    }

    if (best?.dataset.kbSection) {
      onChange({
        id: best.dataset.kbSection,
        highlights: (best.dataset.kbHighlights ?? "").split(",").map((slug) => slug.trim()).filter(Boolean),
      });
    }
  };

  const schedule = () => {
    if (!frame) frame = window.requestAnimationFrame(update);
  };
  const mutations = new MutationObserver(schedule);
  mutations.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["data-kb-section", "data-kb-highlights"],
  });
  const resize = new ResizeObserver(schedule);
  resize.observe(document.body);
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  schedule();

  return () => {
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", schedule);
    mutations.disconnect();
    resize.disconnect();
    if (frame) window.cancelAnimationFrame(frame);
  };
}
