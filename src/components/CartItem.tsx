import { useShoppingCart } from "../context/ShoppingCartContext";
import storeItems from "../data/items.json";
import { formatCurrency } from "../utilities/PriceFormatter";
type CartItemProps = {
  id: number;
  quantity: number;
};

const CartItem = ({ id, quantity }: CartItemProps) => {
  const { removeFromCart } = useShoppingCart();
  const item = storeItems.find((e) => e.id === id);
  if (item === null) return;
  return (
    <div className="flex items-center justify-between gap-2 flex-wrap">
      <div className="flex items-center gap-2">
        <img
          src={item?.imgUrl}
          className="w-32 object-cover flex-shrink-0 h-20"
          alt=""
        />
        <div className="flex flex-col gap-1">
          <span>
            {item?.name}{" "}
            <span className="text-[.65rem] text-gray-500">
              {quantity}&times;
            </span>
          </span>
          <span className="text-gray-500 text-sm">
            {item?.price !== undefined && formatCurrency(item?.price)}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-500">
        {item?.price && formatCurrency(item?.price * quantity)}
        <button
          onClick={() => removeFromCart(id)}
          className="py-1 px-2 transition-colors rounded hover:bg-red-600 hover:text-white border"
        >
          &times;
        </button>
      </div>
    </div>
  );
};
export default CartItem;
