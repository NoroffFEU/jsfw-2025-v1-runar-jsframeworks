import { render, screen } from "@testing-library/react";
import { CartProvider } from "@/store/CartContext";
import type { Product } from "@/types/product";
import ProductCard from "@/components/ProductCard";
import { formatCurrency } from "@/lib/format";

const base: Product = {
  id: "p1",
  title: "Test Product",
  price: 100,
  image: { url: "/img.jpg", alt: "alt" },
};

const norm = (s: string | null | undefined) =>
  (s ?? "").replace(/\u00a0|\u202f/g, " ");

// liten helper så vi alltid får CartProvider rundt komponentene
const renderWithProviders = (ui: React.ReactElement) =>
  render(<CartProvider>{ui}</CartProvider>);

describe("ProductCard", () => {
  it("viser pris uten rabatt", () => {
    renderWithProviders(<ProductCard p={base} />);
    const current = screen.getByLabelText("price-current");
    expect(norm(current.textContent)).toBe(norm(formatCurrency(100)));

    expect(screen.queryByLabelText("price-original")).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/discount/i)).not.toBeInTheDocument();
  });

  it("viser rabattert pris, stryker original, og viser rabattmerke", () => {
    const p = { ...base, discountedPrice: 80 };
    renderWithProviders(<ProductCard p={p} />);

    const current = screen.getByLabelText("price-current");
    const original = screen.getByLabelText("price-original");

    expect(norm(current.textContent)).toBe(norm(formatCurrency(80)));
    expect(norm(original.textContent)).toBe(norm(formatCurrency(100)));
    expect(screen.getByLabelText("20% discount")).toBeInTheDocument();
  });
});