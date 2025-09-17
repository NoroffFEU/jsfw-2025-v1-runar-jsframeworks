import React from "react";
import { render, screen } from "@testing-library/react";
import { CartProvider, useCart } from "@/store/CartContext";
import Header from "@/components/Header";

function AddOneOnce() {
  const { add } = useCart();
  React.useEffect(() => {
    add({ id: "1", title: "Alpha", price: 100, qty: 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // kjør én gang, ikke avhengig av add (som endrer identitet)
  return null;
}

describe("Header cart count", () => {
  it("viser total antall varer", async () => {
    render(
      <CartProvider>
        <AddOneOnce />
        <Header />
      </CartProvider>
    );
    // Effekt kjører etter render → bruk findByText
    expect(await screen.findByText("1")).toBeInTheDocument();
  });
});