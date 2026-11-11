"use client";
import React from "react";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FEATURED_COLLECTIONS } from "@/constants";

export function Hero(): React.JSX.Element {
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto w-full" aria-label="Hero">
      {/* Large rounded blue gradient card */}
      <div className="relative rounded-[2rem] bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700 overflow-hidden min-h-[420px] sm:min-h-[480px] lg:min-h-[520px]">
        {/* Background decorative circles */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-white/5" />
          <div className="absolute top-8 -right-8 w-96 h-96 rounded-full bg-white/5" />
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-stretch h-full px-6 sm:px-10 lg:px-14 py-10 lg:py-0 gap-8 lg:gap-0">
          {/* ── Left: text content ── */}
          <div className="flex-1 flex flex-col justify-center text-center lg:text-left lg:py-14 max-w-lg mx-auto lg:mx-0">
            {/* Offer pill */}
            <div className="inline-flex items-center self-center lg:self-start mb-4">
              <span className="bg-white/20 text-white text-xs font-semibold px-4 py-1.5 rounded-full tracking-wide uppercase">
                ✨ Exclusive Offer — Try Before You Buy
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
              See it on you<br />before you buy it
            </h1>

            {/* Subtext */}
            <p className="text-blue-100 text-sm sm:text-base leading-relaxed mb-6 max-w-sm mx-auto lg:mx-0">
              Virtual try-on powered by your browser. No uploads. No installs. Just put on your favorite frames instantly.
            </p>

            {/* Category + Shop Now */}
            <div className="flex flex-col sm:flex-row items-center lg:items-center gap-3 mb-8 w-full lg:w-auto">
              <div className="relative w-full sm:w-auto">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full sm:w-44 appearance-none bg-white/15 backdrop-blur-sm border border-white/30 text-white text-sm rounded-full px-4 py-2.5 pr-8 focus:outline-none focus:ring-2 focus:ring-white/50 cursor-pointer"
                  aria-label="Select category"
                >
                  <option value="all" className="text-neutral-900 bg-white">Select Category</option>
                  {FEATURED_COLLECTIONS.map((c) => (
                    <option key={c.value} value={c.value} className="text-neutral-900 bg-white">
                      {c.label}
                    </option>
                  ))}
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/70" aria-hidden="true">▾</span>
              </div>

              <Link
                href={selectedCategory === "all" ? "/#shop" : `/#shop?category=${selectedCategory}`}
                className="w-full sm:w-auto text-center bg-white text-brand-500 font-semibold text-sm px-6 py-2.5 rounded-full hover:bg-brand-50 active:scale-95 transition-all shadow-sm"
              >
                Shop Now
              </Link>
            </div>

            {/* Customer avatars + rating */}
            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-3 mb-5">
              <div className="flex -space-x-2">
                {["/images/avatar-1.svg", "/images/avatar-2.svg", "/images/avatar-3.svg"].map((src, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full border-2 border-white overflow-hidden bg-brand-200"
                  >
                    <Image src={src} alt={`Customer ${i + 1}`} width={36} height={36} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div className="text-center sm:text-left">
                <p className="text-white text-xs font-semibold">Our Happy Customers</p>
                <div className="flex items-center gap-1 justify-center sm:justify-start">
                  <Stars />
                  <span className="text-blue-100 text-xs">4.9 (453k Reviews)</span>
                </div>
              </div>
            </div>

            {/* Sign up pill */}
            <div className="text-sm text-blue-100 text-center lg:text-left">
              Not yet a member?{" "}
              <Link
                href="/#signup"
                className="inline-block bg-white/15 border border-white/30 text-white font-semibold px-4 py-1.5 rounded-full text-xs hover:bg-white/25 transition-colors ml-1"
              >
                Sign Up Now
              </Link>
            </div>
          </div>

          {/* ── Right: hero image with circle backdrop ── */}
          <div className="flex-shrink-0 flex items-end justify-center lg:w-80 xl:w-96 lg:py-0">
            {/* Circle backdrop */}
            <div
              className="relative w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full bg-white/15 flex items-end justify-center overflow-visible"
              aria-hidden="true"
            >
              <Image
                src="/images/hero-model.svg"
                alt="Person wearing glasses"
                width={340}
                height={420}
                className="absolute -bottom-0 w-full max-w-[340px] lg:max-w-none object-contain drop-shadow-xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stars(): React.JSX.Element {
  return (
    <span className="flex text-yellow-300 text-xs" aria-label="4.9 out of 5 stars">
      {"★★★★★".split("").map((s, i) => (
        <span key={i}>{s}</span>
      ))}
    </span>
  );
}
