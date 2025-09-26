"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/store/CartContext";

export default function Header() {
  const { totalQty, state, totalCost } = useCart();

  // kompakt header ved scroll
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // bump/bubble anim ved qty-endring (ikke ved første mount)
  const first = useRef(true);
  const [bump, setBump] = useState(false);
  const [bubble, setBubble] = useState(false);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setBump(true);
    setBubble(true);
    const t1 = setTimeout(() => setBump(false), 300);
    const t2 = setTimeout(() => setBubble(false), 450);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
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

          {/* Cart + hover preview (gapless) */}
          <div className="relative group">
            <Link href="/cart" className="relative inline-flex items-center">
              Cart
              <span
                aria-label="items in cart"
                className={`ml-2 rounded-full bg-white/10 px-2 py-0.5 text-sm ${bump ? "animate-bump" : ""}`}
                suppressHydrationWarning
              >
                {totalQty}
              </span>
              {bubble && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-1.5 -right-1.5 h-6 w-6 rounded-full border border-white/40 animate-bubble"
                />
              )}
            </Link>

            {/* Dropdown-panel: holder seg åpent når du beveger musen fra trigger til panelet */}
            <div
              className="absolute right-0 top-full hidden w-80 rounded-lg border border-white/10 bg-black/90 p-3 text-sm shadow-xl backdrop-blur-lg z-50
                         group-hover:block hover:block focus-within:block"
              role="dialog"
              aria-label="Cart preview"
            >
              {state.items.length === 0 ? (
                <div className="py-4 text-center text-white/70">
                  Your cart is empty.
                </div>
              ) : (
                <>
                  <ul className="max-h-64 overflow-auto divide-y divide-white/10">
                    {state.items.map((i) => (
                      <li key={i.id} className="flex items-center gap-3 py-2">
                        {i.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={i.image}
                            alt=""
                            className="h-10 w-10 rounded object-cover"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded bg-white/10" />
                        )}
                        <div className="min-w-0 flex-1">
                          <div className="truncate">{i.title}</div>
                          <div className="text-white/60">
                            {i.qty} × {i.price.toFixed(2)} kr
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="font-semibold">
                      Total: {totalCost.toFixed(2)} kr
                    </div>
                    <div className="flex items-center gap-2">
                      <Link
                        href="/cart"
                        className="rounded bg-white/10 px-2.5 py-1 hover:bg-white/20"
                      >
                        View cart
                      </Link>
                      <Link
                        href="/checkout/success"
                        className="rounded bg-white text-black px-2.5 py-1 hover:opacity-90"
                      >
                        Checkout
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}