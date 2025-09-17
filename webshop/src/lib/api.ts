import type { Product } from "@/types/product";

const BASE = "https://v2.api.noroff.dev";
const SHOP = `${BASE}/online-shop`;

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(SHOP, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch products");
  const data = (await res.json()) as { data: Product[] };
  return data.data;
}

export async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`${SHOP}/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch product");
  const data = (await res.json()) as { data: Product };
  return data.data;
}