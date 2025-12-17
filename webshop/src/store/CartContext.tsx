"use client";

import React from "react";
import { toast } from "sonner";
import type { CartItem, CartState } from "./cartTypes";
import { cartReducer } from "./cartReducer";

type Ctx = {
  state: CartState;
  add: (i: CartItem) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  totalQty: number;
  totalCost: number;
};

const CartContext = React.createContext<Ctx | null>(null);

const STORAGE_KEY = "cart";
const initialState: CartState = { items: [] };

/**
 * Provides global shopping cart state for the webshop.
 * Persists cart state to localStorage and exposes helper actions.
 *
 * @param {{ children: React.ReactNode }} props
 * @returns {JSX.Element}
 */
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(cartReducer, initialState);

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;

      const parsed = JSON.parse(raw) as CartState;
      dispatch({ type: "LOAD", payload: parsed });
    } catch (error) {
      // If stored cart data is corrupted, clear it to avoid breaking the app.
      localStorage.removeItem(STORAGE_KEY);

      // Optional (helpful during development):
      console.warn("Failed to parse cart from localStorage:", error);
    }
  }, []);

  React.useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      // localStorage can fail (quota exceeded, privacy mode, disabled storage, etc.)
      console.warn("Failed to persist cart to localStorage:", error);
    }
  }, [state]);

  /**
   * Adds an item to the cart (defaults to qty 1 if missing/invalid).
   *
   * @param {CartItem} item
   */
  const add = React.useCallback((item: CartItem) => {
    const qty = Math.max(item.qty ?? 1, 1);
    dispatch({ type: "ADD", payload: { ...item, qty } });
    toast.success(`${item.title} added to cart`);
  }, []);

  /**
   * Removes an item from the cart by id.
   *
   * @param {string} id
   */
  const remove = React.useCallback((id: string) => {
    dispatch({ type: "REMOVE", id });
    toast.warning("Item removed");
  }, []);

  /**
   * Sets quantity for a cart item by id.
   *
   * @param {string} id
   * @param {number} qty
   */
  const setQty = React.useCallback((id: string, qty: number) => {
    dispatch({ type: "SET_QTY", id, qty });
  }, []);

  /**
   * Clears the cart.
   */
  const clear = React.useCallback(() => {
    dispatch({ type: "CLEAR" });
    toast.success("Shopping cart emptied");
  }, []);

  const totalQty = React.useMemo(
    () => state.items.reduce((s, i) => s + i.qty, 0),
    [state.items],
  );

  const totalCost = React.useMemo(
    () => state.items.reduce((s, i) => s + i.qty * i.price, 0),
    [state.items],
  );

  const value = React.useMemo(
    () => ({ state, add, remove, setQty, clear, totalQty, totalCost }),
    [state, add, remove, setQty, clear, totalQty, totalCost],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

/**
 * Access the cart context.
 *
 * @throws {Error} If used outside CartProvider
 * @returns {Ctx}
 */
export function useCart() {
  const ctx = React.useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

export { cartReducer } from "./cartReducer";