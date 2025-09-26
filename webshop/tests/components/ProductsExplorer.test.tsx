import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CartProvider } from "@/store/CartContext";
import ProductsExplorer from "@/components/ProductsExplorer";
import type { Product } from "@/types/product";

const products: Product[] = [
  { id: "1", title: "Alpha", price: 10 },
  { id: "2", title: "Beta", price: 20 },
  { id: "3", title: "Gamma", price: 30 },
];

const renderWithProviders = (ui: React.ReactElement) =>
  render(<CartProvider>{ui}</CartProvider>);

describe("ProductsExplorer", () => {
  it("filterer listen ved søk", async () => {
    renderWithProviders(<ProductsExplorer initial={products} />);
    const input = screen.getByLabelText(/search products/i);
    await userEvent.type(input, "be");
    expect(screen.getAllByText(/Beta/).length).toBeGreaterThan(0);
  });
});