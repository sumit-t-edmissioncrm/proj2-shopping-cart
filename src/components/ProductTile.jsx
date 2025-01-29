import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCartContext } from "../context";

function ProductTile({ singleProductTile }) {
  const navigate = useNavigate();
  const { addProductToCart, cartItems } = useContext(ShoppingCartContext);

  function handleNavigateToProductDetailsPage(getCurrentProductId) {
    navigate(`/product-details/${getCurrentProductId}`);
  }

  return (
    <div className="relative group border border-cyan-700 p-6 cursor-pointer rounded-lg shadow-sm transition-all duration-300 flex flex-col justify-between h-full">
      {/* Product Image */}
      <div className="overflow-hidden aspect-w-1 aspect-h-1 rounded-lg">
        <img
          src={singleProductTile?.thumbnail}
          alt={singleProductTile?.title}
          className="object-cover w-full h-full transition-all duration-300 group-hover:scale-110 sm:group-hover:scale-125"
        />
      </div>

      {/* Product Title and Price */}
      <div className="flex items-start justify-between mt-4 space-x-4 w-full">
        <div className="font-bold text-gray-900 text-sm md:text-base flex-1">
          <p className="truncate break-words whitespace-normal">
            {singleProductTile?.title}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm font-bold text-gray-900">
            ${singleProductTile?.price}
          </p>
        </div>
      </div>

      {/* View Details Button */}
      <button
        onClick={() =>
          handleNavigateToProductDetailsPage(singleProductTile?.id)
        }
        className="px-5 mt-5 w-full py-2 rounded-md bg-black text-white font-bold text-lg sm:text-base"
      >
        View Details
      </button>

      {/* Add to Cart Button */}
      <button
        disabled={
          cartItems.findIndex((item) => item.id === singleProductTile.id) > -1
        }
        onClick={() => addProductToCart(singleProductTile)}
        className="disabled:opacity-65 px-5 mt-3 w-full py-2 rounded-md bg-black text-white font-bold text-lg sm:text-base"
      >
        Add To Cart
      </button>
    </div>
  );
}

export default ProductTile;
