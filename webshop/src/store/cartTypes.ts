import type { Product } from "@/types/product";

export type CartItem = {
  id: string;
  title: string;
  price: number;
  image?: string;
  qty: number;
};

export type CartState = {
  items: CartItem[];
};

export function toCartItem(p: Product): CartItem {
  const unit = typeof p.discountedPrice === "number" ? p.discountedPrice : p.price;
  return { id: p.id, title: p.title, price: unit, image: p.image?.url, qty: 1 };
}