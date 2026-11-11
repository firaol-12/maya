"use client";
import React from "react";

import { useState } from "react";
import type { Product } from "@/types/product";
import { CategoryFilter } from "./CategoryFilter";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps): React.JSX.Element {
  const [category, setCategory] = useState("all");

  const filtered =
    category === "all"
      ? products
      : products.filter((p) => p.category === category);

  return (
    <section
      id="shop"
      className="px-4 sm:px-6 lg:px-8 py-10 max-w-7xl mx-auto w-full"
      aria-label="Product catalog"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-50">Shop Glasses</h2>
        <span className="text-sm text-neutral-500 dark:text-neutral-400">{filtered.length} items</span>
      </div>

      <div className="mb-6">
        <CategoryFilter selected={category} onChange={setCategory} />
      </div>

      {filtered.length === 0 ? (
        <div className="py-20 text-center text-neutral-400 dark:text-neutral-500">
          <p className="text-lg font-medium">No products in this category yet.</p>
          <button
            onClick={() => setCategory("all")}
            className="mt-3 text-brand-500 dark:text-brand-300 underline underline-offset-2 text-sm"
          >
            View all products
          </button>
        </div>
      ) : (
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5" role="list">
          {filtered.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
