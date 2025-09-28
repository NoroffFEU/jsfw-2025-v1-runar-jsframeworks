import type { Metadata } from "next";
import SuccessClient from "./SuccessClient";

export const metadata: Metadata = {
  title: "Checkout success",
  description: "Order confirmed. Your cart has been cleared.",
};

export default function Page() {
  return <SuccessClient />;
}