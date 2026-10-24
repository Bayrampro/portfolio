import { CanvasTexture, SRGBColorSpace } from "three";
import type { ExperiencePreview } from "../ExperienceCarousel";

/** This is the content replacement: logo artwork, without a new card design. */
export function createLogoTexture(item: ExperiencePreview, background: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 600;
  canvas.height = 1500;
  const context = canvas.getContext("2d");
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  if (!context) return { texture, dispose: () => texture.dispose() };

  const clear = () => {
    context.fillStyle = item.backgroundColor ?? background;
    context.fillRect(0, 0, canvas.width, canvas.height);
  };
  clear();
  texture.needsUpdate = true;

  let disposed = false;
  const image = item.logo ? new Image() : null;
  if (image) {
    image.crossOrigin = "anonymous";
    image.onload = () => {
      if (disposed) return;
      clear();
      const scale = Math.min(430 / image.naturalWidth, 430 / image.naturalHeight);
      const width = image.naturalWidth * scale;
      const height = image.naturalHeight * scale;
      context.save();
      if (item.logoShape === "circle") {
        context.beginPath();
        context.arc(300, 750, Math.min(width, height) / 2, 0, Math.PI * 2);
        context.clip();
      }
      context.drawImage(image, (600 - width) / 2, (1500 - height) / 2, width, height);
      context.restore();
      texture.needsUpdate = true;
    };
    image.src = item.logo!;
  }
  return {
    texture,
    dispose: () => {
      disposed = true;
      if (image) image.onload = null;
      texture.dispose();
    },
  };
}
