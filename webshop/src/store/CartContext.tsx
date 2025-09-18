"use client";

import React from "react";
import { toast } from "sonner";
import type { CartItem, CartState } from "./cartTypes";

type Action =
  | { type: "LOAD"; payload: CartState }
  | { type: "ADD"; payload: CartItem }
  | { type: "REMOVE"; id: string }
  | { type: "SET_QTY"; id: string; qty: number }
  | { type: "CLEAR" };

export function cartReducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "LOAD": {
      const items = Array.isArray(action.payload?.items) ? action.payload.items : [];
      return { items };
    }
    case "ADD": {
      const exists = state.items.find(i => i.id === action.payload.id);
      const items = exists
        ? state.items.map(i =>
            i.id === action.payload.id
              ? { ...i, qty: i.qty + action.payload.qty }
              : i
          )
        : [...state.items, action.payload];
      return { items };
    }
    case "REMOVE":
      return { items: state.items.filter(i => i.id !== action.id) };
    case "SET_QTY":
      return {
        items: state.items.map(i =>
          i.id === action.id ? { ...i, qty: Math.max(1, action.qty) } : i
        ),
      };
    case "CLEAR":
      return { items: [] };
    default: {
      ((x: never) => x)(action as never);
      return state;
    }
  }
}

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

// Viktig: stabil init for både SSR og første klient-render
function init(): CartState {
  return { items: [] };
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(cartReducer, undefined as any, init);

  // Hydrer fra localStorage ETTER mount (unngår hydration mismatch)
  React.useEffect(() => {
    try {
      const raw = localStorage.getItem("cart");
      if (raw) {
        const parsed = JSON.parse(raw) as CartState;
        dispatch({ type: "LOAD", payload: parsed });
      }
    } catch {}
  }, []);

  // Persist ved endringer
  React.useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(state));
    } catch {}
  }, [state]);

  const add = React.useCallback((item: CartItem) => {
    const qty = Math.max(item.qty ?? 1, 1);
    dispatch({ type: "ADD", payload: { ...item, qty } });
    toast.success(`${item.title} lagt i handlekurven`);
  }, []);

  const remove = React.useCallback((id: string) => {
    dispatch({ type: "REMOVE", id });
    toast.warning(`Vare fjernet`);
  }, []);

  const setQty = React.useCallback((id: string, qty: number) => {
    dispatch({ type: "SET_QTY", id, qty });
  }, []);

  const clear = React.useCallback(() => {
    dispatch({ type: "CLEAR" });
    toast.success("Handlekurv tømt");
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