"use client";
import React from "react";

import {
  createContext,
  useContext,
  useReducer,
  useMemo,
  type ReactNode,
} from "react";
import type { CartItem, CartState } from "@/types/cart";
import type { Product } from "@/types/product";

// ─── Actions ────────────────────────────────────────────────────────────────

type CartAction =
  | { type: "ADD_ITEM"; product: Product }
  | { type: "REMOVE_ITEM"; productId: string }
  | { type: "UPDATE_QUANTITY"; productId: string; quantity: number }
  | { type: "CLEAR_CART" };

// ─── Reducer ────────────────────────────────────────────────────────────────

function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.find((i) => i.product.id === action.product.id);
      if (existing) {
        return state.map((i) =>
          i.product.id === action.product.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...state, { product: action.product, quantity: 1 }];
    }
    case "REMOVE_ITEM":
      return state.filter((i) => i.product.id !== action.productId);
    case "UPDATE_QUANTITY":
      if (action.quantity <= 0) {
        return state.filter((i) => i.product.id !== action.productId);
      }
      return state.map((i) =>
        i.product.id === action.productId
          ? { ...i, quantity: action.quantity }
          : i
      );
    case "CLEAR_CART":
      return [];
    default:
      return state;
  }
}

// ─── Context ────────────────────────────────────────────────────────────────

const CartContext = createContext<CartState | null>(null);

export function CartProvider({ children }: { children: ReactNode }): React.JSX.Element {
  const [items, dispatch] = useReducer(cartReducer, []);

  const value = useMemo<CartState>(
    () => ({
      items,
      addItem: (product) => dispatch({ type: "ADD_ITEM", product }),
      removeItem: (productId) => dispatch({ type: "REMOVE_ITEM", productId }),
      updateQuantity: (productId, quantity) =>
        dispatch({ type: "UPDATE_QUANTITY", productId, quantity }),
      clearCart: () => dispatch({ type: "CLEAR_CART" }),
      totalItems: items.reduce((sum, i) => sum + i.quantity, 0),
      totalPrice: items.reduce(
        (sum, i) => sum + i.product.price * i.quantity,
        0
      ),
    }),
    [items]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartState {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
