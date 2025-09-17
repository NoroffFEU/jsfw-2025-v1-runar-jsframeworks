import { getProduct } from "@/lib/api";
import { toCartItem } from "@/store/cartTypes";
import AddToCart from "./add-to-cart";
import { notFound } from "next/navigation";

export default async function ProductPage({ params }: { params: { id: string } }) {
  let p;
  try {
    p = await getProduct(params.id);
  } catch {
    notFound();
  }

  const price = typeof p.discountedPrice === "number" ? p.discountedPrice : p.price;

  return (
    <article className="max-w-6xl mx-auto px-4 py-8 grid gap-8 md:grid-cols-2">
      <div className="rounded overflow-hidden bg-white/5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {p.image?.url ? <img src={p.image.url} alt={p.image.alt ?? p.title} /> : <div className="p-8 text-white/50">No image</div>}
      </div>

      <div className="space-y-4">
        <h1 className="text-2xl">{p.title}</h1>
        {p.description && <p className="text-white/80">{p.description}</p>}
        <div className="flex items-baseline gap-3">
          <span className="text-2xl font-semibold">{price.toFixed(2)} kr</span>
          {typeof p.discountedPrice === "number" && (
            <span className="text-white/60 line-through">{p.price.toFixed(2)} kr</span>
          )}
        </div>
        {p.tags?.length ? <div className="text-sm text-white/70">Tags: {p.tags.join(", ")}</div> : null}
        <AddToCart item={toCartItem(p)} />
        {p.reviews?.length ? (
          <section className="mt-6 space-y-3">
            <h2 className="text-lg">Reviews</h2>
            {p.reviews.map((r, i) => (
              <div key={i} className="rounded bg-white/5 p-3">
                <div className="text-sm text-white/60">{r.username ?? "Anonymous"}</div>
                <div className="text-sm">Rating: {r.rating ?? 0}/5</div>
                {r.description && <p className="text-white/80 mt-1">{r.description}</p>}
              </div>
            ))}
          </section>
        ) : null}
      </div>
    </article>
  );
}