// Original supahfunk/webgl-carousel values; keep these in sync with the source.
export const planeSettings = { width: 1, height: 2.5, gap: 0.1 };
export const animationSettings = { duration: 2.5, ease: "power3.out" };
export const speedWheel = 0.02;
export const speedDrag = -0.3;

export const lerp = (v0: number, v1: number, t: number) => v0 * (1 - t) + v1 * t;
export const getPiramidalIndex = (array: readonly unknown[], index: number) =>
  array.map((_, i) => index === i ? array.length : array.length - Math.abs(index - i));

export function getActiveIndex(progress: number, count: number) {
  return Math.floor((Math.max(0, Math.min(progress, 100)) / 100) * (count - 1));
}

/** Vertical gestures belong to the page; horizontal/Shift-wheel browse logos. */
export function getCarouselWheelDelta(event: Pick<WheelEvent, "deltaX" | "deltaY" | "deltaMode" | "shiftKey" | "ctrlKey">) {
  if (event.ctrlKey) return 0;
  const delta = event.shiftKey ? event.deltaY || event.deltaX : Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : 0;
  return delta * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? 800 : 1);
}
