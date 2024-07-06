import { formatCurrency } from "../utilities/PriceFormatter";
// import { useLocalStorage } from "../hooks/LocalStorageHook";
import { useShoppingCart } from "../context/ShoppingCartContext";

type StoreItemProps = {
  id: number;
  imgUrl: string;
  name: string;
  price: number;
};

const Store = ({ id, imgUrl, name, price }: StoreItemProps) => {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();
  const quantity = getItemQuantity(id);
  return (
    <div key={id} className="bg-white rounded-sm overflow-hidden">
      <img className="w-full h-52 object-cover" src={imgUrl} alt="" />
      <div className="flex flex-col items-center p-3 gap-2">
        <div className="flex justify-between items-center w-full">
          <span className="text-lg">{name}</span>
          <span className="text-[13px] text-gray-500">
            {formatCurrency(price)}
          </span>
        </div>
        <div className="w-full">
          {+quantity === 0 ? (
            <button
              onClick={() => increaseCartQuantity(id)}
              className="bg-blue-600 text-white w-full py-1 rounded-sm hover:bg-blue-700"
            >
              + Add To Cart
            </button>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center justify-center gap-3">
                <button
                  className="bg-blue-600 text-white py-1 px-2 rounded-sm hover:bg-blue-700 w-6"
                  onClick={() => decreaseCartQuantity(id)}
                >
                  -
                </button>
                <div className="text-gray-500">
                  <span className="text-lg text-gray-700">{quantity}</span> in
                  cart
                </div>
                <button
                  className="bg-blue-600 text-white py-1 px-2 rounded-sm hover:bg-blue-700 w-6"
                  onClick={() => increaseCartQuantity(id)}
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeFromCart(id)}
                className="bg-red-600 hover:bg-red-700 text-white py-1 px-2 rounded-sm text-sm"
              >
                Remove
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Store;
