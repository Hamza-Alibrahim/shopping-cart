/* eslint-disable @typescript-eslint/no-unused-vars */
import { NavLink } from "react-router-dom";
import useLocalStorage from "../hooks/LocalStorageHook";
import { useShoppingCart } from "../context/ShoppingCartContext";

const Navbar = () => {
  const urls = ["Home", "Store", "About"];
  const { cartQuantity, openCart } = useShoppingCart();
  const [currentUrlId, setCurrentUrlId] = useLocalStorage("url", 1);
  return (
    <nav className="flex justify-between items-center py-2 px-5 shadow mb-5 bg-white sticky top-0 h-[56px]">
      <ul className="flex gap-6">
        {urls.map((e, i) => {
          return (
            <li
              className={`${
                i + 1 === +currentUrlId ? "text-gray-700" : "text-gray-500"
              }`}
              onClick={() => setCurrentUrlId(i + 1)}
              key={i}
            >
              <NavLink
                to={
                  e === "Home"
                    ? "shopping-cart/"
                    : "/shopping-cart/" + e.toLowerCase()
                }
              >
                {e}
              </NavLink>
            </li>
          );
        })}
      </ul>
      {cartQuantity !== 0 && (
        <button
          onClick={openCart}
          className="w-[2.5rem] h-[2.5rem] border rounded-full hover:bg-blue-600 text-blue-600 hover:text-white transition-colors relative p-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
            fill="currentColor"
          >
            <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
          </svg>
          <div className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 text-[9px] bg-red-600 text-white w-5 h-5 rounded-full flex items-center justify-center">
            {cartQuantity}
          </div>
        </button>
      )}
    </nav>
  );
};
export default Navbar;
