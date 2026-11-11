import React from "react";
import type { Metadata } from "next";
import { Hero } from "@/components/catalog/Hero";
import { FeaturedCollections } from "@/components/catalog/FeaturedCollections";
import { ProductGrid } from "@/components/catalog/ProductGrid";
import { getProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Maya — See it on you before you buy it",
};

export default async function HomePage(): Promise<React.JSX.Element> {
  const products = await getProducts();

  return (
    <>
      <Hero />
      <FeaturedCollections />
      <ProductGrid products={products} />
    </>
  );
}
