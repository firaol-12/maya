export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/#shop" },
  { label: "Deals", href: "/#deals" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
] as const;

export const PRODUCT_CATEGORIES = [
  { label: "All", value: "all" },
  { label: "Round", value: "round" },
  { label: "Square", value: "square" },
  { label: "Aviator", value: "aviator" },
  { label: "Cat-eye", value: "cat-eye" },
  { label: "Sport", value: "sport" },
] as const;

export const FEATURED_COLLECTIONS = [
  {
    label: "Sunglasses",
    value: "sunglasses",
    image: "/images/collection-sunglasses.svg",
  },
  {
    label: "Reading",
    value: "reading",
    image: "/images/collection-reading.svg",
  },
  {
    label: "Blue-light",
    value: "bluelight",
    image: "/images/collection-bluelight.svg",
  },
  {
    label: "Sport",
    value: "sport",
    image: "/images/collection-sport.svg",
  },
] as const;
