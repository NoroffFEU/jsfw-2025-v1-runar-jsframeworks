"use client";

import { useEffect } from "react";
import { useCart } from "@/store/CartContext";
import { toast } from "sonner";
import Link from "next/link";

export default function SuccessPage() {
  const { clear } = useCart();

  useEffect(() => {
    clear();
    toast.success("Checkout successful!");
  }, [clear]);

  return (
    <section className="py-16 text-center space-y-4">
      <h1 className="text-2xl">Thank you for your order!</h1>
      <p>We’ve cleared your cart.</p>
      <Link className="inline-flex rounded px-4 py-2 bg-white text-black" href="/">Continue shopping</Link>
    </section>
  );
}