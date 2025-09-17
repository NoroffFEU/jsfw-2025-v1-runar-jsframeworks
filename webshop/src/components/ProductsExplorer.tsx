"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Product } from "@/types/product";
import ProductCard from "./ProductCard";
import Link from "next/link";
import { toast } from "sonner";

type Props = { initial: Product[] };

type SortKey = "name" | "price-asc" | "price-desc";

export default function ProductsExplorer({ initial }: Props) {
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<SortKey>("name");
  const [filtered, setFiltered] = useState<Product[]>(initial);
  const [showList, setShowList] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const f = initial.filter(p => p.title.toLowerCase().includes(q.toLowerCase()));
    if (q && f.length === 0) toast.error("No matching results");
    const s = [...f].sort((a, b) => {
      if (sort === "name") return a.title.localeCompare(b.title);
      const ap = a.discountedPrice ?? a.price;
      const bp = b.discountedPrice ?? b.price;
      return sort === "price-asc" ? ap - bp : bp - ap;
    });
    setFiltered(s);
  }, [q, sort, initial]);

  const suggestions = useMemo(() => filtered.slice(0, 8), [filtered]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!inputRef.current) return;
      if (!inputRef.current.parentElement?.contains(e.target as Node)) {
        setShowList(false);
      }
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between relative">
        <div className="w-full sm:max-w-md relative">
          <input
            ref={inputRef}
            value={q}
            onChange={e => { setQ(e.target.value); setShowList(true); }}
            onFocus={() => setShowList(true)}
            placeholder="Search products…"
            className="w-full rounded bg-white/10 px-3 py-2 outline-none"
            aria-label="Search products"
          />

          {showList && q.length > 0 && (
            <div className="absolute z-20 mt-1 w-full rounded-lg bg-black/80 backdrop-blur border border-white/10 shadow-lg">
              {suggestions.map(p => (
                <Link
                  key={p.id}
                  href={`/product/${p.id}`}
                  className="block px-3 py-2 hover:bg-white/10"
                  onClick={() => setShowList(false)}
                >
                  {p.title}
                </Link>
              ))}

              {suggestions.length === 0 && (
                <div className="px-3 py-2 text-white/60">No results</div>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm text-white/70">Sort:</label>
          <select
            value={sort}
            onChange={e => setSort(e.target.value as SortKey)}
            className="rounded bg-white/10 px-3 py-2"
          >
            <option value="name">Name</option>
            <option value="price-asc">Price (low → high)</option>
            <option value="price-desc">Price (high → low)</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filtered.map(p => <ProductCard key={p.id} p={p} />)}
      </div>
    </section>
  );
}
