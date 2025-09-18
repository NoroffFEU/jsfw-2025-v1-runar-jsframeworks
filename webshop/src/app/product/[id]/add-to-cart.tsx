"use client";

import { useCart } from "@/store/CartContext";
import type { CartItem } from "@/store/cartTypes";

export default function AddToCart({ item }: { item: CartItem }) {
  const { add } = useCart();
  return (
    <button
      className="inline-flex items-center rounded px-4 py-2 bg-white text-black"
      onClick={() => add({ ...item, qty: Math.max(item.qty ?? 1, 1) })}
    >
      Add to cart
    </button>
  );
}