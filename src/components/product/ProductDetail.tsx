"use client";
import React from "react";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/hooks/use-cart";
import type { Product } from "@/types/product";
import { cn } from "@/lib/utils";

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps): React.JSX.Element {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (): void => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-neutral-500 dark:text-neutral-400">
        <ol className="flex items-center gap-1.5">
          <li><Link href="/" className="hover:text-brand-500 dark:hover:text-brand-300 transition-colors">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href="/#shop" className="hover:text-brand-500 dark:hover:text-brand-300 transition-colors">Shop</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-neutral-800 dark:text-neutral-200 font-medium truncate">{product.name}</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        {/* ── Left: image + 3D placeholder ── */}
        <div className="flex flex-col gap-4">
          <div className="relative aspect-square rounded-[1.5rem] overflow-hidden bg-brand-50 dark:bg-neutral-800 border border-brand-100 dark:border-neutral-700">
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-contain p-8"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>

          {/* 3D viewer / try-on placeholder */}
          <div
            className={cn(
              "rounded-[1.5rem] border-2 border-dashed border-brand-200 dark:border-neutral-700",
              "bg-brand-50/50 dark:bg-neutral-800/50",
              "flex flex-col items-center justify-center gap-3 p-8 text-center min-h-[180px]"
            )}
            aria-label="3D viewer placeholder — coming soon"
          >
            <span className="text-4xl" aria-hidden="true">🥽</span>
            <div>
              <p className="font-semibold text-brand-600 dark:text-brand-300 text-sm">3D Viewer &amp; Virtual Try-On</p>
              <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">
                Interactive 3D model and webcam try-on will appear here in a future release.
              </p>
            </div>
            <span className="text-[10px] font-bold bg-brand-100 dark:bg-neutral-700 text-brand-600 dark:text-brand-300 px-3 py-1 rounded-full uppercase tracking-wide">
              Coming Soon
            </span>
          </div>
        </div>

        {/* ── Right: product info ── */}
        <div className="flex flex-col gap-6 lg:py-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-400 dark:text-brand-400">
              {product.category}
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-50 mt-1">
              {product.name}
            </h1>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-brand-500 dark:text-brand-300">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-sm text-neutral-400 dark:text-neutral-500 line-through">
              ${(product.price * 1.2).toFixed(2)}
            </span>
            <span className="text-xs font-semibold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-0.5 rounded-full">
              Save 17%
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex text-yellow-400 text-sm" aria-label="4.8 out of 5 stars">
              {"★★★★★".split("").map((s, i) => <span key={i}>{s}</span>)}
            </span>
            <span className="text-sm text-neutral-500 dark:text-neutral-400">4.8 (127 reviews)</span>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">About this frame</h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">{product.description}</p>
          </div>

          <ul className="flex flex-col gap-2" aria-label="Product features">
            {["UV400 Protection", "Lightweight Frame", "Scratch-resistant Lenses", "Adjustable Nose Pads"].map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                <span className="w-4 h-4 rounded-full bg-brand-100 dark:bg-brand-900/50 text-brand-600 dark:text-brand-300 flex items-center justify-center text-xs font-bold flex-shrink-0" aria-hidden="true">✓</span>
                {f}
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <button
              onClick={handleAddToCart}
              className={cn(
                "flex-1 py-3.5 rounded-full font-semibold text-sm transition-all shadow-sm active:scale-95",
                added ? "bg-green-500 text-white" : "bg-brand-500 hover:bg-brand-600 text-white"
              )}
              aria-live="polite"
            >
              {added ? "✓ Added to Cart" : "Add to Cart"}
            </button>

            <Link
              href="/cart"
              className={cn(
                "flex-1 py-3.5 rounded-full font-semibold text-sm text-center transition-all",
                "border-2 border-brand-500 text-brand-500 dark:text-brand-300 dark:border-brand-400",
                "hover:bg-brand-50 dark:hover:bg-brand-900/20 active:scale-95"
              )}
            >
              View Cart
            </Link>
          </div>

          <div className="flex flex-wrap gap-3 pt-2 border-t border-neutral-100 dark:border-neutral-800">
            {[
              { icon: "🔒", label: "Secure checkout" },
              { icon: "🚚", label: "Free shipping" },
              { icon: "↩️", label: "30-day returns" },
            ].map((b) => (
              <div key={b.label} className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400">
                <span aria-hidden="true">{b.icon}</span>
                {b.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
