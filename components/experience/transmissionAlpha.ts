/** Preserve scene coverage through Drei's RGB-only transmission pass. */
export function preserveTransmissionAlpha(fragmentShader: string) {
  let samples = 0;
  const result = fragmentShader
    .replace("vec3 transmission = vec3(0.0);", "vec3 transmission = vec3(0.0);\nfloat carouselAlpha = 0.0;")
    .replace(/transmission([RGB]) = (getIBLVolumeRefraction\([\s\S]*?\))\.([rgb]);/g, (_, channel: string, sample: string, component: string) => {
      samples++;
      return `vec4 carouselSample${channel} = ${sample};\ntransmission${channel} = carouselSample${channel}.${component};\ncarouselAlpha += carouselSample${channel}.a / 3.0;`;
    })
    .replace(/transmission \/= (\d+\.0);/, "transmission /= $1;\nmaterial.transmissionAlpha = clamp(carouselAlpha / $1, 0.0, 1.0);");
  if (samples !== 3 || !result.includes("material.transmissionAlpha = clamp(carouselAlpha")) {
    throw new Error("Carousel transmission shader changed: cannot preserve transparency.");
  }
  return result;
}
