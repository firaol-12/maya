"use client";
import React, { useRef } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import type { Product } from "@/types/product";

const ProductViewer3D = dynamic(() => import("@/components/product/ProductViewer3D"), {
  ssr: false,
});

const CLICK_MOVE_TOLERANCE_PX = 5;

interface ProductHoverPreviewProps {
  product: Product;
}

/** Live 3D preview shown over a product card image while the pointer hovers it. */
export function ProductHoverPreview({ product }: ProductHoverPreviewProps): React.JSX.Element {
  const router = useRouter();
  const root = useRef<HTMLDivElement>(null);
  const hint = useRef<HTMLSpanElement>(null);
  const down = useRef<{ x: number; y: number } | null>(null);

  const handleReady = (): void => {
    if (!root.current) return;
    gsap.to(root.current, { opacity: 1, duration: 0.35, ease: "power2.out" });
    if (hint.current) {
      gsap.fromTo(
        hint.current,
        { y: 8, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, delay: 0.2, ease: "power2.out" },
      );
    }
  };

  // Dragging rotates the model; only a click without movement opens the product.
  const handleClick = (e: React.MouseEvent): void => {
    const start = down.current;
    if (start && Math.hypot(e.clientX - start.x, e.clientY - start.y) > CLICK_MOVE_TOLERANCE_PX) return;
    router.push(`/products/${product.slug}`);
  };

  return (
    <div
      ref={root}
      className="absolute inset-0 z-[5] cursor-grab opacity-0 bg-brand-50 active:cursor-grabbing"
      onPointerDown={(e) => {
        down.current = { x: e.clientX, y: e.clientY };
      }}
      onClick={handleClick}
      aria-hidden="true"
    >
      <ProductViewer3D product={product} variant="preview" onReady={handleReady} />
      <span
        ref={hint}
        className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold text-brand-600 shadow-sm"
      >
        Drag to rotate
      </span>
    </div>
  );
}
