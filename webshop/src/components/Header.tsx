"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/store/CartContext";

export default function Header() {
  const { totalQty } = useCart();

  // eksisterende kompakt-logikk
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // NYTT: enkel bump/bubble når totalQty øker (ikke ved første mount)
  const first = useRef(true);
  const [bump, setBump] = useState(false);
  const [bubble, setBubble] = useState(false);

  useEffect(() => {
    if (first.current) { // ikke animér ved init/hydration
      first.current = false;
      return;
    }
    setBump(true);
    setBubble(true);
    const t1 = setTimeout(() => setBump(false), 300);
    const t2 = setTimeout(() => setBubble(false), 450);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [totalQty]);

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
            src="/choppingmalllogo.png"
            alt="Chopping Mall"
            width={160}
            height={40}
            priority
            sizes="(max-width: 640px) 112px, (max-width: 768px) 144px, 224px"
            className={`w-auto h-16 sm:h-20 md:h-28 transition-transform duration-300 ${
              compact ? "scale-60" : "scale-100"
            }`}
          />
          <span className="sr-only">Chopping Mall</span>
        </Link>

        <nav className="flex items-center gap-4">
          <Link href="/contact">Contact</Link>

          <Link href="/cart" className="relative inline-flex items-center">
            Cart
            <span
              aria-label="items in cart"
              className={`ml-2 rounded-full bg-white/10 px-2 py-0.5 text-sm ${bump ? "animate-bump" : ""}`}
              suppressHydrationWarning
            >
              {totalQty}
            </span>

            {/* liten “bubble”-ring ved badge når antallet endrer seg */}
            {bubble && (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-1.5 -right-1.5 h-6 w-6 rounded-full border border-white/40 animate-bubble"
              />
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}