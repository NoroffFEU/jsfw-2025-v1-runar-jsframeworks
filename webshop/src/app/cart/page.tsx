import type { Metadata } from "next";
import CartClient from "./CartClient";

export const metadata: Metadata = {
  title: "Cart",
  description: "View and edit the items in your cart.",
};

export default function CartPage() {
  return <CartClient />;
}