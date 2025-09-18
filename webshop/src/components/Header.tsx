"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/store/CartContext";

export default function Header() {
  const { totalQty } = useCart();
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 10); // terskel
    onScroll(); // sett riktig ved refresh midt på siden
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur transition-all duration-300 ${
        compact ? "shadow-[0_4px_20px_rgba(0,0,0,.35)]" : ""
      }`}
    >
      <div
        className={`max-w-6xl mx-auto px-4 flex items-center justify-between transition-all duration-300 ${
          compact ? "py-2" : "py-4"
        }`}
      >
        <Link href="/" className="inline-flex items-center">
          <Image
            src="/choppingmalllogo.png" // legg fila i /public
            alt="Chopping Mall"
            width={160}
            height={40}
            priority
            className={`h-28 w-auto transition-transform duration-300 ${
              compact ? "scale-60" : "scale-100"
            }`}
          />
          <span className="sr-only">Chopping Mall</span>
        </Link>

        <nav className="flex items-center gap-4">
          <Link href="/contact">Contact</Link>
          <Link href="/cart" className="relative">
            Cart
            <span
              className="ml-2 rounded-full bg-white/10 px-2 py-0.5 text-sm"
              suppressHydrationWarning
            >
              {totalQty}
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}