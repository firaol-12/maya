import React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/hooks/use-cart";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Maya — A tool to see",
    template: "%s | Maya",
  },
  description:
    "Virtual try-on glasses powered by your browser. See it on you before you buy it.",
  icons: {
    icon: "/brand/maya-favicon.svg",
  },
};

// Inline script that runs before React hydration to prevent flash of wrong theme.
// Reads localStorage and applies .dark class immediately.
const themeScript = `
(function(){
  try {
    var s = localStorage.getItem('maya-theme');
    if (s === 'dark') { document.documentElement.classList.add('dark'); return; }
    if (s === 'light') return;
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    }
  } catch(e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* No-flash theme script — runs synchronously before paint */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50 transition-colors duration-200">
        <ThemeProvider>
          <CartProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
