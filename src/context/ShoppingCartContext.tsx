/* eslint-disable react-refresh/only-export-components */
import { ReactNode, createContext, useContext, useState } from "react";
import useLocalStorage from "../hooks/LocalStorageHook";
import ShoppingCart from "../components/ShoppingCart";

type ShoppingCartProps = {
  children: ReactNode;
};

type ShoppingCartContext = {
  cartQuantity: number;
  cartItems: CartItem[];
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
};

type CartItem = {
  id: number;
  quantity: number;
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProps) {
  const [cartItems, setCartItems] = useLocalStorage("ItemsCart", []);
  const [open, setOpen] = useState(false);
  function getItemQuantity(id: number) {
    return cartItems.find((i: CartItem) => i.id === id)?.quantity || 0;
  }
  function increaseCartQuantity(id: number) {
    setCartItems((currItems: CartItem[]) => {
      if (currItems.find((e: CartItem) => e.id === id) === undefined)
        return [...currItems, { id, quantity: 1 }];
      return currItems.map((item: CartItem) => {
        if (item.id === id) return { ...item, quantity: item.quantity + 1 };
        return item;
      });
    });
  }
  function decreaseCartQuantity(id: number) {
    setCartItems((currItems: CartItem[]) => {
      if (currItems.find((e: CartItem) => e.id === id)?.quantity === 1)
        removeFromCart(id);
      return currItems.map((item: CartItem) => {
        if (item.id === id) return { ...item, quantity: item.quantity - 1 };
        return item;
      });
    });
  }
  function removeFromCart(id: number) {
    setCartItems((currItems: CartItem[]) => {
      return currItems.filter((item: CartItem) => item.id !== id);
    });
  }
  const cartQuantity = cartItems.reduce(
    (q: number, i: CartItem) => q + i.quantity,
    0
  );
  const openCart = () => setOpen(true);
  const closeCart = () => setOpen(false);
  return (
    <ShoppingCartContext.Provider
      value={{
        cartItems,
        cartQuantity,
        openCart,
        closeCart,
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
      }}
    >
      <div className="relative">
        {children}
        {open && <ShoppingCart />}
      </div>
    </ShoppingCartContext.Provider>
  );
}
