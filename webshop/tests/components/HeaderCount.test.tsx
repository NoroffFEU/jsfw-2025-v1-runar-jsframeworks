import React from "react";
import { render, screen } from "@testing-library/react";
import { CartProvider, useCart } from "@/store/CartContext";
import Header from "@/components/Header";

/**
 * Test helper that adds one cart item when mounted.
 */
function AddOneOnce() {
  const { add } = useCart();

  React.useEffect(() => {
    add({ id: "1", title: "Alpha", price: 100, qty: 1 });
  }, [add]);

  return null;
}

describe("Header cart count", () => {
  it("viser total antall varer", async () => {
    render(
      <CartProvider>
        <AddOneOnce />
        <Header />
      </CartProvider>,
    );

    expect(await screen.findByText("1")).toBeInTheDocument();
  });
});