"use client";

import { useCart } from "@/store/CartContext";
import Link from "next/link";

export default function CartPage() {
  const { state, setQty, remove, totalCost } = useCart();

  if (state.items.length === 0) {
    return (
      <div className="py-16 text-center">
        <p>Your cart is empty.</p>
        <Link className="inline-flex mt-4 rounded px-4 py-2 bg-white text-black" href="/">Back to shop</Link>
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <h1 className="text-2xl">Your cart</h1>

      <div className="space-y-3">
        {state.items.map(i => (
          <div key={i.id} className="rounded bg-white/5 p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {i.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={i.image} alt={i.title} className="h-16 w-16 object-cover rounded" />
              ) : (
                <div className="h-16 w-16 rounded bg-white/10" />
              )}
              <div>
                <div>{i.title}</div>
                <div className="text-sm text-white/70">{i.price.toFixed(2)} kr</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="number"
                min={1}
                value={i.qty}
                onChange={e => setQty(i.id, Number(e.target.value))}
                className="w-16 rounded bg-white/10 px-2 py-1"
              />
              <button className="rounded px-3 py-1 bg-white/10" onClick={() => remove(i.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="text-xl">Total: {totalCost.toFixed(2)} kr</div>
        <Link href="/checkout/success" className="inline-flex items-center rounded px-4 py-2 bg-white text-black">
          Checkout
        </Link>
      </div>
    </section>
  );
}