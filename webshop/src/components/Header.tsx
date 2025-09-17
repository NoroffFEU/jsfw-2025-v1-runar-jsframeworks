"use client";

import Link from "next/link";
import { useCart } from "@/store/CartContext";

export default function Header() {
  const { totalQty } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-lg">Webshop</Link>
        <nav className="flex items-center gap-4">
          <Link href="/contact">Contact</Link>
          <Link href="/cart" className="relative">
            Cart
            <span className="ml-2 rounded-full bg-white/10 px-2 py-0.5 text-sm">
              {totalQty}
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}