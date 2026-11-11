"use client";
import React from "react";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/hooks/use-cart";
import { cn } from "@/lib/utils";

export function CartView(): React.JSX.Element {
  const { items, removeItem, updateQuantity, totalItems, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-4 text-center gap-4">
        <span className="text-6xl" aria-hidden="true">🛒</span>
        <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-100">Your cart is empty</h2>
        <p className="text-neutral-500 dark:text-neutral-400 text-sm max-w-xs">
          Looks like you haven&apos;t added any glasses yet. Find a pair that fits your style.
        </p>
        <Link
          href="/"
          className="mt-2 bg-brand-500 text-white font-semibold px-6 py-3 rounded-full hover:bg-brand-600 active:scale-95 transition-all"
        >
          Browse Glasses
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-50 mb-8">
        Your Cart{" "}
        <span className="text-neutral-400 dark:text-neutral-500 font-normal text-lg">
          ({totalItems} {totalItems === 1 ? "item" : "items"})
        </span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Item list */}
        <ul className="lg:col-span-2 flex flex-col gap-4" role="list" aria-label="Cart items">
          {items.map(({ product, quantity }) => (
            <li
              key={product.id}
              className="flex gap-4 bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 rounded-2xl p-4 shadow-sm"
            >
              <Link href={`/products/${product.slug}`} className="flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden bg-brand-50 dark:bg-neutral-900">
                <Image
                  src={product.image_url}
                  alt={product.name}
                  width={80}
                  height={80}
                  className="w-full h-full object-contain p-2"
                />
              </Link>

              <div className="flex-1 min-w-0">
                <Link href={`/products/${product.slug}`}>
                  <h3 className="font-semibold text-neutral-800 dark:text-neutral-100 hover:text-brand-500 dark:hover:text-brand-300 transition-colors truncate">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-brand-500 dark:text-brand-300 font-bold mt-0.5">
                  ${product.price.toFixed(2)}
                </p>

                <div className="flex items-center gap-2 mt-3">
                  <button
                    onClick={() => updateQuantity(product.id, quantity - 1)}
                    aria-label="Decrease quantity"
                    className={cn(
                      "w-7 h-7 rounded-full border border-neutral-200 dark:border-neutral-600 flex items-center justify-center",
                      "text-neutral-600 dark:text-neutral-400 font-medium text-sm",
                      "hover:bg-brand-50 dark:hover:bg-neutral-700 hover:border-brand-300 transition-colors"
                    )}
                  >
                    −
                  </button>
                  <span className="w-6 text-center text-sm font-semibold text-neutral-800 dark:text-neutral-100" aria-label={`Quantity: ${quantity}`}>
                    {quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(product.id, quantity + 1)}
                    aria-label="Increase quantity"
                    className={cn(
                      "w-7 h-7 rounded-full border border-neutral-200 dark:border-neutral-600 flex items-center justify-center",
                      "text-neutral-600 dark:text-neutral-400 font-medium text-sm",
                      "hover:bg-brand-50 dark:hover:bg-neutral-700 hover:border-brand-300 transition-colors"
                    )}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col items-end justify-between flex-shrink-0">
                <p className="font-bold text-neutral-900 dark:text-neutral-100">
                  ${(product.price * quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => removeItem(product.id)}
                  aria-label={`Remove ${product.name} from cart`}
                  className="text-neutral-300 dark:text-neutral-600 hover:text-red-400 dark:hover:text-red-400 transition-colors"
                >
                  <TrashIcon />
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* Order summary */}
        <aside className="lg:col-span-1">
          <div className="bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 rounded-2xl p-6 shadow-sm sticky top-20">
            <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-50 mb-5">Order Summary</h2>

            <dl className="space-y-3 text-sm">
              <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                <dt>Subtotal ({totalItems} items)</dt>
                <dd className="font-medium text-neutral-800 dark:text-neutral-200">${totalPrice.toFixed(2)}</dd>
              </div>
              <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                <dt>Shipping</dt>
                <dd className="font-medium text-green-600 dark:text-green-400">Free</dd>
              </div>
              <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                <dt>Tax (est.)</dt>
                <dd className="font-medium text-neutral-800 dark:text-neutral-200">${(totalPrice * 0.08).toFixed(2)}</dd>
              </div>
              <div className="border-t border-neutral-100 dark:border-neutral-700 pt-3 flex justify-between font-bold text-base text-neutral-900 dark:text-neutral-50">
                <dt>Total</dt>
                <dd>${(totalPrice * 1.08).toFixed(2)}</dd>
              </div>
            </dl>

            <button
              className={cn(
                "mt-6 w-full bg-brand-500 text-white font-semibold py-3 rounded-full",
                "hover:bg-brand-600 active:scale-95 transition-all shadow-sm"
              )}
              aria-label="Proceed to checkout"
            >
              Checkout
            </button>

            <p className="text-xs text-neutral-400 dark:text-neutral-500 text-center mt-3">
              Payments coming soon. This is an MVP demo.
            </p>

            <Link
              href="/"
              className="mt-4 w-full flex justify-center text-sm text-brand-500 dark:text-brand-300 hover:underline"
            >
              ← Continue Shopping
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}

function TrashIcon(): React.JSX.Element {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  );
}
