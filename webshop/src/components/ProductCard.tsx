"use client";

import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/types/product";
import { discountPercent, formatCurrency } from "@/lib/format";
import { useCart } from "@/store/CartContext";
import { toCartItem } from "@/store/cartTypes";

export default function ProductCard({ p }: { p: Product }) {
  const { add } = useCart();

  const pct = discountPercent(p.price, p.discountedPrice);
  const showDiscount = pct > 0;
  const unit = p.discountedPrice ?? p.price;

  return (
    <Link
      href={`/product/${p.id}`}
      className="block rounded-lg overflow-hidden bg-white/5 hover:bg-white/10 transition"
    >
      <div className="relative aspect-[4/3]">
        {p.image?.url ? (
          <Image
            src={p.image.url}
            alt={p.image.alt ?? p.title}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 100vw"
            priority={false}
          />
        ) : (
          <div className="h-full w-full grid place-content-center text-white/40">
            No image
          </div>
        )}

        {showDiscount && (
          <div
            className="absolute left-2 top-2 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold"
            aria-label={`${pct}% discount`}
          >
            -{pct}%
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="line-clamp-1">{p.title}</h3>

        <div className="mt-2 flex items-baseline gap-2">
          <span aria-label="price-current" className="text-lg font-semibold">
            {formatCurrency(unit)}
          </span>
          {typeof p.discountedPrice === "number" && (
            <span
              aria-label="price-original"
              className="text-sm line-through text-white/60"
            >
              {formatCurrency(p.price)}
            </span>
          )}
        </div>

        {typeof p.rating === "number" && (
          <div className="mt-1 text-sm text-white/70">
            Rating: {p.rating.toFixed(1)} / 5
          </div>
        )}

        {/* Ny knapp – stopper Link-navigasjonen ved klikk */}
        <div className="mt-3">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              add(toCartItem(p)); // qty håndteres i add(): min 1
            }}
            className="inline-flex items-center rounded bg-white text-black px-3 py-1.5 text-sm hover:opacity-90 transition cursor-pointer"
            aria-label={`Add ${p.title} to cart`}
            title="Add to cart"
          >
            <svg
              aria-hidden="true"
              className="mr-2 h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M3 3h2l.8 4M7 13h9.4a1 1 0 0 0 .98-.804l1.2-6A1 1 0 0 0 18.6 5H6.1"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="9" cy="19" r="1.5" fill="currentColor" />
              <circle cx="17" cy="19" r="1.5" fill="currentColor" />
            </svg>
            Add to cart
          </button>
        </div>
      </div>
    </Link>
  );
}