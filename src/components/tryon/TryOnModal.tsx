"use client";
import React, { useEffect } from "react";
import { useCamera } from "@/hooks/use-camera";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";

interface TryOnModalProps {
  product: Product;
  onClose: () => void;
}

const STATUS_MESSAGE: Record<"requesting" | "denied" | "unavailable", string> = {
  requesting: "Starting your camera…",
  denied: "Camera access was blocked. Allow it in your browser settings to try frames on.",
  unavailable: "No camera was found, or this browser can't open it. You can still use the 3D viewer.",
};

/** Full-screen webcam view. Face tracking and the frame overlay are added on top of this feed. */
export function TryOnModal({ product, onClose }: TryOnModalProps): React.JSX.Element {
  const { videoRef, status } = useCamera();

  useEffect(() => {
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Virtual try-on: ${product.name}`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900/80 p-4"
    >
      <div className="relative w-full max-w-3xl overflow-hidden rounded-[1.5rem] bg-white shadow-xl">
        <div className="flex items-center justify-between px-5 py-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-500">Virtual try-on</p>
            <h2 className="text-base font-bold text-neutral-900">{product.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-full border-2 border-brand-500 px-4 py-1.5 text-sm font-semibold text-brand-500 hover:bg-brand-50"
          >
            Close
          </button>
        </div>
        <div className="relative aspect-[4/3] bg-brand-50">
          <video
            ref={videoRef}
            muted
            playsInline
            className={cn("h-full w-full -scale-x-100 object-cover", status !== "ready" && "invisible")}
          />
          {status !== "ready" && (
            <p className="absolute inset-0 flex items-center justify-center p-8 text-center text-sm text-neutral-600">
              {STATUS_MESSAGE[status]}
            </p>
          )}
        </div>
        <p className="px-5 py-3 text-xs text-neutral-500">
          Your camera feed stays in this browser. Nothing is recorded or uploaded.
        </p>
      </div>
    </div>
  );
}
