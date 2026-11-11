"use client";
import React from "react";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/hooks/use-cart";
import { useTheme } from "@/components/ui/ThemeProvider";
import { NAV_LINKS } from "@/constants";
import { cn } from "@/lib/utils";

export function Navbar(): React.JSX.Element {
  const { totalItems } = useCart();
  const { theme, toggle } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-neutral-900 border-b border-neutral-100 dark:border-neutral-800 shadow-sm transition-colors duration-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">

        {/* Logo — blue on light, white on dark */}
        <Link href="/" className="flex-shrink-0 flex items-center">
          <Image
            src="/brand/maya-logo-horizontal.svg"
            alt="Maya"
            width={150}
            height={36}
            priority
            className="h-10 w-auto block dark:hidden"
          />
          <Image
            src="/brand/maya-logo-horizontal-white.svg"
            alt="Maya"
            width={150}
            height={36}
            priority
            className="h-10 w-auto hidden dark:block"
          />
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-700 dark:text-neutral-300">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="hover:text-brand-500 dark:hover:text-brand-300 transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Search — mobile only */}
          <button
            aria-label="Search"
            className="md:hidden p-2 rounded-full text-neutral-600 dark:text-neutral-400 hover:bg-brand-50 dark:hover:bg-neutral-800 transition-colors"
          >
            <SearchIcon />
          </button>

          {/* Dark mode toggle */}
          <button
            onClick={toggle}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="p-2 rounded-full text-neutral-600 dark:text-neutral-400 hover:bg-brand-50 dark:hover:bg-neutral-800 transition-colors"
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>

          {/* Cart */}
          <Link
            href="/cart"
            aria-label={`Cart, ${totalItems} items`}
            className="relative p-2 rounded-full text-neutral-600 dark:text-neutral-400 hover:bg-brand-50 dark:hover:bg-neutral-800 transition-colors"
          >
            <CartIcon />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-brand-500 text-white text-[10px] font-bold px-1">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </Link>

          {/* Hamburger — mobile only */}
          <button
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden p-2 rounded-full text-neutral-600 dark:text-neutral-400 hover:bg-brand-50 dark:hover:bg-neutral-800 transition-colors"
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300",
          menuOpen
            ? "max-h-80 border-t border-neutral-100 dark:border-neutral-800"
            : "max-h-0"
        )}
      >
        <ul className="px-4 py-3 flex flex-col gap-1 bg-white dark:bg-neutral-900">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block py-2.5 px-3 rounded-lg text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-brand-50 dark:hover:bg-neutral-800 hover:text-brand-500 dark:hover:text-brand-300 transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

function SearchIcon(): React.JSX.Element {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function CartIcon(): React.JSX.Element {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function MenuIcon(): React.JSX.Element {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon(): React.JSX.Element {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function MoonIcon(): React.JSX.Element {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function SunIcon(): React.JSX.Element {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}
