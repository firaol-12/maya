export type ProductCategory =
  | "sunglasses"
  | "reading"
  | "bluelight"
  | "sport"
  | "round"
  | "square"
  | "aviator"
  | "cat-eye";

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  image_url: string;
  model_url: string | null;
  created_at: string;
}
