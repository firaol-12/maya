"use client";
import React from "react";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { FEATURED_COLLECTIONS } from "@/constants";
import { cn } from "@/lib/utils";

export function FeaturedCollections(): React.JSX.Element {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right"): void => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "left" ? -220 : 220, behavior: "smooth" });
  };

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-10 max-w-7xl mx-auto w-full" aria-label="Featured collections">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-50">
          Featured Collections
        </h2>
        <div className="flex gap-2 lg:hidden">
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="w-8 h-8 rounded-full border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:bg-brand-50 dark:hover:bg-neutral-800 hover:border-brand-300 transition-colors"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="w-8 h-8 rounded-full border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:bg-brand-50 dark:hover:bg-neutral-800 hover:border-brand-300 transition-colors"
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 lg:grid lg:grid-cols-4 lg:overflow-visible"
        style={{ scrollbarWidth: "none" }}
      >
        {FEATURED_COLLECTIONS.map((col) => (
          <Link
            key={col.value}
            href={`/#shop?category=${col.value}`}
            className={cn(
              "flex-shrink-0 snap-start",
              "flex items-center gap-3 px-4 py-3",
              "bg-brand-50 dark:bg-neutral-800 hover:bg-brand-100 dark:hover:bg-neutral-700",
              "border border-brand-100 dark:border-neutral-700 hover:border-brand-200 dark:hover:border-brand-700",
              "rounded-full transition-all active:scale-95 shadow-sm",
              "min-w-[180px] lg:min-w-0"
            )}
          >
            <div className="w-12 h-12 rounded-full overflow-hidden bg-white dark:bg-neutral-900 flex-shrink-0 shadow-sm">
              <Image src={col.image} alt={col.label} width={48} height={48} className="w-full h-full object-cover" />
            </div>
            <span className="text-sm font-semibold text-brand-700 dark:text-brand-300">{col.label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function ChevronLeft(): React.JSX.Element {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRight(): React.JSX.Element {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}
