export type CatId = "peach" | "goma";

export interface CatPalette {
  id: CatId;
  name: string;
  fur: string;
  stripe: string;
  innerEar: string;
  blush: string;
  outline: string;
  paw: string;
  accent: string; // UI accent
  tagline: string;
}

export const PALETTES: Record<CatId, CatPalette> = {
  peach: {
    id: "peach",
    name: "Peach",
    fur: "#FFFDFB",
    stripe: "#D9D2CF",
    innerEar: "#F7B3C2",
    blush: "#F6B6C3",
    outline: "#3B3231",
    paw: "#F4C2CC",
    accent: "#FF9EB5",
    tagline: "Soft, sweet & a little bit sassy",
  },
  goma: {
    id: "goma",
    name: "Goma",
    fur: "#B9B0AD",
    stripe: "#8C8380",
    innerEar: "#F2A9B9",
    blush: "#E89DAB",
    outline: "#3B3231",
    paw: "#D9C7C9",
    accent: "#A99C98",
    tagline: "Calm, cuddly & always there for Peach",
  },
};

export const otherCat = (id: CatId): CatId => (id === "peach" ? "goma" : "peach");
