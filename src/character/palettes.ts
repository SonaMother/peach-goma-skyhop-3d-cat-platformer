export type CatId = "peach" | "goma";

export interface CatPalette {
  id: CatId;
  name: string;
  fur: string;
  furShade: string; // belly / muzzle patch
  stripe: string;
  innerEar: string;
  blush: string;
  outline: string;
  paw: string; // toe beans
  accent: string; // UI accent
  tagline: string;
  /** Personality knobs the rig reads (0..1) — makes each cat move differently */
  personality: {
    energy: number; // idle bob / fidget frequency
    shyness: number; // blush amount, look-away tendency
    floppiness: number; // ear + tail softness
  };
}

export const PALETTES: Record<CatId, CatPalette> = {
  peach: {
    id: "peach",
    name: "Peach",
    fur: "#FFFDFB",
    furShade: "#FFF3F0",
    stripe: "#D9D2CF",
    innerEar: "#F7B3C2",
    blush: "#F6B6C3",
    outline: "#3B3231",
    paw: "#F4A9BA",
    accent: "#FF9EB5",
    tagline: "Soft, sweet & a little bit sassy",
    personality: { energy: 0.85, shyness: 0.35, floppiness: 0.55 },
  },
  goma: {
    id: "goma",
    name: "Goma",
    fur: "#B9B0AD",
    furShade: "#CFC7C4",
    stripe: "#8C8380",
    innerEar: "#F2A9B9",
    blush: "#E89DAB",
    outline: "#3B3231",
    paw: "#E7B4BF",
    accent: "#A99C98",
    tagline: "Calm, cuddly & always there for Peach",
    personality: { energy: 0.55, shyness: 0.6, floppiness: 0.75 },
  },
};

export const CAT_IDS = Object.keys(PALETTES) as CatId[];
export const otherCat = (id: CatId): CatId => (id === "peach" ? "goma" : "peach");
