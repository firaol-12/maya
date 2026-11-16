"use client";
import React, { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/hooks/use-cart";
import type { Product } from "@/types/product";
import { cn } from "@/lib/utils";
import { ProductHoverPreview } from "@/components/catalog/ProductHoverPreview";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps): React.JSX.Element {
  const { addItem } = useCart();
  const [hovering, setHovering] = useState(false);

  return (
    <article className="group relative flex flex-col bg-white dark:bg-neutral-800 rounded-[1.25rem] border border-neutral-100 dark:border-neutral-700 hover:border-brand-200 dark:hover:border-brand-700 hover:shadow-lg dark:hover:shadow-brand-900/30 transition-all overflow-hidden">
      {/* Try-on badge */}
      <div className="absolute top-3 left-3 z-10">
        <span className="bg-brand-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide uppercase shadow-sm">
          Try On
        </span>
      </div>

      {/* Product image; a live 3D preview takes over while hovered (mouse only) */}
      <div
        className="relative aspect-square bg-brand-50 dark:bg-neutral-900 overflow-hidden rounded-t-[1.25rem]"
        onPointerEnter={(e) => {
          if (e.pointerType === "mouse") setHovering(true);
        }}
        onPointerLeave={() => setHovering(false)}
      >
        <Link
          href={`/products/${product.slug}`}
          className="block h-full w-full"
          aria-label={`View ${product.name}`}
        >
          <Image
            src={product.image_url}
            alt={product.name}
            width={300}
            height={300}
            className="w-full h-full object-contain p-4"
          />
        </Link>
        {hovering && <ProductHoverPreview product={product} />}
      </div>
      {/* Info */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-sm font-semibold text-neutral-800 dark:text-neutral-100 hover:text-brand-500 dark:hover:text-brand-300 transition-colors line-clamp-2 leading-snug">
            {product.name}
          </h3>
        </Link>

        <p className="text-brand-500 dark:text-brand-300 font-bold text-base">
          ${product.price.toFixed(2)}
        </p>

        <button
          onClick={() => addItem(product)}
          className={cn(
            "mt-auto w-full py-2.5 rounded-full text-sm font-semibold",
            "bg-brand-500 text-white hover:bg-brand-600 active:scale-95",
            "transition-all shadow-sm"
          )}
          aria-label={`Add ${product.name} to cart`}
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}
