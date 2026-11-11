import React from "react";
import Image from "next/image";
import Link from "next/link";

export function Footer(): React.JSX.Element {
  return (
    <footer className="bg-brand-500 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center">
              <Image
                src="/brand/maya-logo-horizontal-white.svg"
                alt="Maya"
                width={150}
                height={36}
                className="h-10 w-auto"
              />
            </Link>
            <p className="mt-3 text-sm text-blue-100 leading-relaxed max-w-xs">
              See it on you before you buy it. Virtual try-on glasses powered by your browser — no uploads, no installs.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-200 mb-4">Shop</h3>
            <ul className="space-y-2 text-sm text-blue-100">
              {["Sunglasses", "Reading Glasses", "Blue-light", "Sport"].map((l) => (
                <li key={l}><Link href="/#shop" className="hover:text-white transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-200 mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-blue-100">
              {["About", "Blog", "Careers", "Contact"].map((l) => (
                <li key={l}><Link href={`/#${l.toLowerCase()}`} className="hover:text-white transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-200 mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-blue-100">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((l) => (
                <li key={l}><Link href="/#legal" className="hover:text-white transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-blue-400/50 text-sm text-blue-200 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 Maya. Built for Kiroween 2026 — Frankenstein category.</p>
          <p className="italic text-blue-300">A tool to see.</p>
        </div>
      </div>
    </footer>
  );
}
