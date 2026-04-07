import { useMemo, useState } from "react";

import type { CartItem, Product } from "../types/shop";

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = (product: Product) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }

      return [...currentItems, { ...product, quantity: 1 }];
    });

    setIsOpen(true);
  };

  const updateQuantity = (id: number, delta: number) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item,
      ),
    );
  };

  const removeItem = (id: number) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  };

  const count = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items],
  );

  return {
    items,
    count,
    isOpen,
    addItem,
    updateQuantity,
    removeItem,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  };
}
