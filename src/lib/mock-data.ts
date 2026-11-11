import type { Product } from "@/types/product";

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    slug: "azure-aviator",
    name: "Azure Aviator",
    description:
      "Classic aviator frames with a modern blue tint. Lightweight titanium construction with UV400 protection. Perfect for sunny days and casual outings.",
    price: 89.99,
    category: "aviator",
    image_url: "/images/glasses-sunglasses-1.svg",
    model_url: null,
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    slug: "circle-classic",
    name: "Circle Classic",
    description:
      "Timeless round frames inspired by mid-century fashion. Ultra-thin stainless steel rims with anti-reflective coating. Available in prescription.",
    price: 74.99,
    category: "round",
    image_url: "/images/glasses-round-1.svg",
    model_url: null,
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    slug: "metro-square",
    name: "Metro Square",
    description:
      "Bold square frames for the modern professional. Acetate construction with spring hinges for all-day comfort. Blue-light filtering lenses included.",
    price: 99.99,
    category: "square",
    image_url: "/images/glasses-square-1.svg",
    model_url: null,
    created_at: new Date().toISOString(),
  },
  {
    id: "4",
    slug: "diva-cat-eye",
    name: "Diva Cat-Eye",
    description:
      "Statement cat-eye frames that command attention. Handcrafted acetate with subtle tortoiseshell details and scratch-resistant lenses.",
    price: 119.99,
    category: "cat-eye",
    image_url: "/images/glasses-cateye-1.svg",
    model_url: null,
    created_at: new Date().toISOString(),
  },
  {
    id: "5",
    slug: "sprint-sport",
    name: "Sprint Sport",
    description:
      "Wraparound sport frames designed for active lifestyles. Rubberized grip temples, polarized lenses, and impact-resistant polycarbonate.",
    price: 129.99,
    category: "sport",
    image_url: "/images/glasses-sport-1.svg",
    model_url: null,
    created_at: new Date().toISOString(),
  },
  {
    id: "6",
    slug: "focus-bluelight",
    name: "Focus Blue-Light",
    description:
      "Screen-ready frames with blue-light filtering lenses. Lightweight TR90 frame, anti-glare coating, and a slim profile that works for 10+ hour sessions.",
    price: 109.99,
    category: "bluelight",
    image_url: "/images/glasses-bluelight-1.svg",
    model_url: null,
    created_at: new Date().toISOString(),
  },
];
