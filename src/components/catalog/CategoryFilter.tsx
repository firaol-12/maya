"use client";
import React from "react";

import { PRODUCT_CATEGORIES } from "@/constants";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  selected: string;
  onChange: (value: string) => void;
}

const CATEGORY_ICONS: Record<string, React.JSX.Element> = {
  all: <AllIcon />,
  round: <RoundIcon />,
  square: <SquareIcon />,
  aviator: <AviatorIcon />,
  "cat-eye": <CatEyeIcon />,
  sport: <SportIcon />,
};

export function CategoryFilter({ selected, onChange }: CategoryFilterProps): React.JSX.Element {
  return (
    <div
      className="flex gap-2 sm:gap-3 overflow-x-auto pb-2"
      style={{ scrollbarWidth: "none" }}
      role="tablist"
      aria-label="Filter products by category"
    >
      {PRODUCT_CATEGORIES.map((cat) => {
        const isActive = selected === cat.value;
        return (
          <button
            key={cat.value}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(cat.value)}
            className={cn(
              "flex-shrink-0 flex flex-col items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs font-medium transition-all",
              isActive
                ? "bg-brand-500 text-white shadow-sm"
                : "bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 hover:bg-brand-50 dark:hover:bg-neutral-700 hover:text-brand-600 dark:hover:text-brand-300"
            )}
          >
            <span className={cn("text-lg", isActive ? "opacity-100" : "opacity-60")}>
              {CATEGORY_ICONS[cat.value]}
            </span>
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}

function AllIcon(): React.JSX.Element {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="5" cy="5" r="2" /><circle cx="12" cy="5" r="2" /><circle cx="19" cy="5" r="2" />
      <circle cx="5" cy="12" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="19" cy="12" r="2" />
      <circle cx="5" cy="19" r="2" /><circle cx="12" cy="19" r="2" /><circle cx="19" cy="19" r="2" />
    </svg>
  );
}
function RoundIcon(): React.JSX.Element {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="8" cy="12" r="4" /><circle cx="16" cy="12" r="4" />
      <line x1="12" y1="12" x2="12" y2="12" strokeWidth="2.5" />
    </svg>
  );
}
function SquareIcon(): React.JSX.Element {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="2" y="8" width="9" height="8" rx="1.5" />
      <rect x="13" y="8" width="9" height="8" rx="1.5" />
      <line x1="11" y1="12" x2="13" y2="12" strokeWidth="2" />
    </svg>
  );
}
function AviatorIcon(): React.JSX.Element {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <ellipse cx="7" cy="12" rx="4.5" ry="5.5" />
      <ellipse cx="17" cy="12" rx="4.5" ry="5.5" />
      <line x1="11.5" y1="12" x2="12.5" y2="12" strokeWidth="2" />
    </svg>
  );
}
function CatEyeIcon(): React.JSX.Element {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M2 14 Q6 8 11 10 L11 14 Q6 15 2 14 Z" />
      <path d="M22 14 Q18 8 13 10 L13 14 Q18 15 22 14 Z" />
    </svg>
  );
}
function SportIcon(): React.JSX.Element {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M1 13 Q5 7 11 9 L11 15 Q5 17 1 15 Z" />
      <path d="M23 13 Q19 7 13 9 L13 15 Q19 17 23 15 Z" />
      <line x1="11" y1="12" x2="13" y2="12" strokeWidth="2.5" />
    </svg>
  );
}
