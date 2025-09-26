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

const initialState: CartState = { items: [] };

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(cartReducer, initialState);

  // Hydrate fra localStorage etter mount
  React.useEffect(() => {
    try {
      const raw = localStorage.getItem("cart");
      if (raw) {
        const parsed = JSON.parse(raw) as CartState;
        dispatch({ type: "LOAD", payload: parsed });
      }
    } catch {
      // ignore
    }
  }, []);

  // Persist til localStorage
  React.useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(state));
    } catch {
      // ignore
    }
  }, [state]);

  const add = React.useCallback((item: CartItem) => {
    const qty = Math.max(item.qty ?? 1, 1);
    dispatch({ type: "ADD", payload: { ...item, qty } });
    toast.success(`${item.title} added to cart`);
  }, []);

  const remove = React.useCallback((id: string) => {
    dispatch({ type: "REMOVE", id });
    toast.warning(`Item removed`);
  }, []);

  const setQty = React.useCallback((id: string, qty: number) => {
    dispatch({ type: "SET_QTY", id, qty });
  }, []);

  const clear = React.useCallback(() => {
    dispatch({ type: "CLEAR" });
    toast.success("Shopping cart emptied");
  }, []);

  const totalQty = React.useMemo(
    () => state.items.reduce((s, i) => s + i.qty, 0),
    [state.items]
  );

  const totalCost = React.useMemo(
    () => state.items.reduce((s, i) => s + i.qty * i.price, 0),
    [state.items]
  );

  const value = React.useMemo(
    () => ({ state, add, remove, setQty, clear, totalQty, totalCost }),
    [state, add, remove, setQty, clear, totalQty, totalCost]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = React.useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

export { cartReducer } from "./cartReducer";