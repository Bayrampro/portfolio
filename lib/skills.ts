import {
  siC,
  siClaude,
  siDart,
  siDocker,
  siFlutter,
  siGit,
  siJavascript,
  siJetpackcompose,
  siKotlin,
  siNestjs,
  siPostgresql,
  siSwift,
  siTypescript,
} from "simple-icons";

export type SkillIcon = {
  title: string;
  slug: string;
  path: string;
  hex: string;
  image?: string;
};

// Jaspr uses its official multicolor mark; Codex uses a compact keycap glyph.
const jaspr: SkillIcon = {
  title: "Jaspr",
  slug: "jaspr",
  path: "",
  hex: "40C4FF",
  image: "/icons/jaspr.svg",
};

const codex: SkillIcon = {
  title: "Codex",
  slug: "codex",
  path: "M6 5 14 12 6 19l-2-2 6-5-6-5 2-2zm8 12h7v3h-7v-3z",
  hex: "4D6BFE",
};

// 3×5 grid — consumed by the 3D keyboard (one icon per keycap) and, on mobile,
// by the flat list below for the static skills grid that replaces the
// hover-driven keyboard interaction. Taglines live in the i18n dictionary
// under `keyboard.taglines.<slug>`.
export const SKILLS_GRID: readonly (readonly SkillIcon[])[] = [
  [siJavascript, siTypescript, siNestjs, codex, siClaude],
  [siFlutter, siDart, jaspr, siC, siSwift],
  [siKotlin, siJetpackcompose, siPostgresql, siDocker, siGit],
] as const;

export const SKILLS_FLAT: readonly SkillIcon[] = SKILLS_GRID.flat();
