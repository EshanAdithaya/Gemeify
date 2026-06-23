'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';

const CartContext = createContext(null);
const CART_KEY = 'gemify:cart';

function readCart() {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setItems(readCart());
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(CART_KEY, JSON.stringify(items));
    }
  }, [items]);

  const addItem = useCallback((gem, qty = 1) => {
    const maxQty = gem.maxQuantity ?? gem.quantity ?? 1;
    setItems((prev) => {
      const existing = prev.find((i) => i.id === gem.id);
      if (existing) {
        return prev.map((i) =>
          i.id === gem.id
            ? { ...i, quantity: Math.min(maxQty, i.quantity + qty) }
            : i,
        );
      }
      return [
        ...prev,
        {
          id: gem.id,
          slug: gem.slug,
          name: gem.name,
          price: Number(gem.price) || 0,
          mainImage: gem.mainImage,
          maxQuantity: maxQty,
          quantity: Math.min(maxQty, qty),
        },
      ];
    });
  }, []);

  const removeItem = useCallback((id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQty = useCallback((id, quantity) => {
    setItems((prev) =>
      prev
        .map((i) =>
          i.id === id
            ? { ...i, quantity: Math.max(1, Math.min(i.maxQuantity ?? 99, quantity)) }
            : i,
        )
        .filter((i) => i.quantity > 0),
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const count = items.reduce((n, i) => n + i.quantity, 0);
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        count,
        subtotal,
        open,
        setOpen,
        addItem,
        removeItem,
        updateQty,
        clear,
        has: (id) => items.some((i) => i.id === id),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}
