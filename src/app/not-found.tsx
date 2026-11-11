import React from "react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound(): React.JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center gap-4">
      <span className="text-6xl" aria-hidden="true">🔍</span>
      <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50">Page not found</h1>
      <p className="text-neutral-500 dark:text-neutral-400 max-w-sm text-sm">
        We couldn&apos;t find what you&apos;re looking for. The product may have been removed or the URL is incorrect.
      </p>
      <Link
        href="/"
        className="mt-2 bg-brand-500 text-white font-semibold px-6 py-3 rounded-full hover:bg-brand-600 active:scale-95 transition-all"
      >
        Back to Shop
      </Link>
    </div>
  );
}
