import React from "react";
import type { Metadata } from "next";
import { CartView } from "@/components/cart/CartView";

export const metadata: Metadata = {
  title: "Cart",
};

export default function CartPage(): React.JSX.Element {
  return <CartView />;
}
