"use client";
import React, { useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import gsap from "gsap";
import type { ViewerHandle } from "@/components/product/ProductViewer3D";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";

const ProductViewer3D = dynamic(() => import("@/components/product/ProductViewer3D"), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-brand-50" aria-hidden="true" />,
});

interface ToolButtonProps {
  label: string;
  onClick: () => void;
  pressed?: boolean;
  children: React.ReactNode;
}

function ToolButton({ label, onClick, pressed, children }: ToolButtonProps): React.JSX.Element {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      aria-pressed={pressed}
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold shadow-sm transition-colors",
        pressed ? "bg-brand-500 text-white" : "bg-white text-brand-600 hover:bg-brand-50",
      )}
    >
      {children}
    </button>
  );
}

interface ProductViewerPanelProps {
  product: Product;
}

/** Full-control 3D viewer: rotate, zoom, pan, auto-rotate, reset and fullscreen. */
export function ProductViewerPanel({ product }: ProductViewerPanelProps): React.JSX.Element {
  const container = useRef<HTMLDivElement>(null);
  const viewer = useRef<ViewerHandle>(null);
  const hint = useRef<HTMLParagraphElement>(null);
  const [autoRotate, setAutoRotate] = useState(true);

  // Stop spinning as soon as the user takes control, and fade the hint away.
  const handleInteract = (): void => {
    setAutoRotate(false);
    if (hint.current) gsap.to(hint.current, { opacity: 0, y: 6, duration: 0.3, ease: "power2.out" });
  };

  const toggleFullscreen = (): void => {
    const el = container.current;
    if (!el) return;
    if (document.fullscreenElement) void document.exitFullscreen();
    else void el.requestFullscreen?.();
  };

  return (
    <div
      ref={container}
      className="relative aspect-square cursor-grab overflow-hidden rounded-[1.5rem] border border-brand-100 bg-brand-50 active:cursor-grabbing"
      onPointerDown={handleInteract}
      onWheel={handleInteract}
    >
      <Image
        src={product.image_url}
        alt=""
        fill
        className="object-contain p-8 opacity-0"
        sizes="(max-width: 1024px) 100vw, 50vw"
        priority
        aria-hidden="true"
      />
      <div className="absolute inset-0" role="img" aria-label={`Interactive 3D model of ${product.name}`}>
        <ProductViewer3D product={product} variant="full" autoRotate={autoRotate} handleRef={viewer} />
      </div>

      <div
        className="absolute right-3 top-3 flex flex-col gap-2"
        onPointerDown={(e) => e.stopPropagation()}
      >
        <ToolButton label="Zoom in" onClick={() => viewer.current?.zoom(0.75)}>＋</ToolButton>
        <ToolButton label="Zoom out" onClick={() => viewer.current?.zoom(1.33)}>－</ToolButton>
        <ToolButton label="Auto-rotate" pressed={autoRotate} onClick={() => setAutoRotate((v) => !v)}>⟳</ToolButton>
        <ToolButton label="Reset view" onClick={() => viewer.current?.reset()}>⌂</ToolButton>
        <ToolButton label="Toggle fullscreen" onClick={toggleFullscreen}>⛶</ToolButton>
      </div>

      <p
        ref={hint}
        className="pointer-events-none absolute bottom-3 left-1/2 w-max max-w-[90%] -translate-x-1/2 rounded-full bg-white/90 px-4 py-1.5 text-xs font-medium text-brand-600 shadow-sm"
      >
        Drag to rotate · Scroll to zoom · Right-click to pan
      </p>
    </div>
  );
}
