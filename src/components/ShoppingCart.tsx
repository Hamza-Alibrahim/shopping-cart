import { useRef } from "react";
import { useShoppingCart } from "../context/ShoppingCartContext";
import CartItem from "./CartItem";
import { formatCurrency } from "../utilities/PriceFormatter";
import storeItems from "../data/items.json";

const ShoppingCart = () => {
  const { closeCart, cartItems } = useShoppingCart();
  const totalPrice = cartItems
    .map((e) => {
      const x = storeItems.find((el) => el.id === e.id);
      return x !== undefined ? x.price * e.quantity : 0;
    })
    .reduce((a, b) => a + b, 0);
  const cart = useRef<HTMLDivElement | null>(null);
  setTimeout(() => {
    if (cart.current !== null) cart.current.style.transform = "translateX(0)";
  });
  function handleClick() {
    if (cart.current !== null)
      cart.current.style.transform = "translateX(100%)";
    setTimeout(() => {
      closeCart();
    }, 100);
  }
  return (
    <div
      onClick={handleClick}
      className="absolute w-full h-full min-h-screen left-0 top-0 bg-[rgb(0,0,0,.3)] overflow-hidden"
    >
      <div
        ref={cart}
        onClick={(e) => e.stopPropagation()}
        className="absolute right-0 translate-x-full top-0 w-full max-w-96 p-3 bg-white h-full transition-transform select-none"
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-xl">Cart</h1>
          <span onClick={handleClick} className="cursor-pointer text-2xl">
            &times;
          </span>
        </div>
        <div className="flex flex-col gap-3">
          {cartItems.map((e) => {
            return <CartItem key={e.id} {...e} />;
          })}
          <h1 className="text-lg font-semibold text-end mt-3">
            Total: {formatCurrency(totalPrice)}
          </h1>
        </div>
      </div>
    </div>
  );
};
export default ShoppingCart;
