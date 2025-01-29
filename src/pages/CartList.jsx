import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCartContext } from "../context";
import CartTile from "../components/CartTile";

const CartList = () => {
  const { cartItems } = useContext(ShoppingCartContext);
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-800 text-center">
        My Cart Page
      </h1>

      {/* Responsive Grid Layout */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {/* Cart Items Section */}
        <div className="md:col-span-2 space-y-4">
          {cartItems?.length ? (
            cartItems.map((singleCartItem) => (
              <CartTile
                key={singleCartItem.id}
                singleCartItem={singleCartItem}
              />
            ))
          ) : (
            <h1 className="text-center text-gray-500">
              No items available in cart! Please add some items.
            </h1>
          )}
        </div>

        {/* Order Summary */}
        <div className="bg-gray-100 rounded-lg shadow-md p-6 h-max">
          <h3 className="text-xl font-extrabold text-gray-900 border-b border-gray-300 pb-3">
            Order Summary
          </h3>
          <ul className="text-gray-700 mt-4 space-y-2">
            <p className="flex justify-between text-sm font-bold">
              Total:
              <span className="text-lg font-semibold">
                $
                {cartItems
                  .reduce((acc, curr) => acc + curr.totalPrice, 0)
                  .toFixed(2)}
              </span>
            </p>
          </ul>

          {/* Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              disabled={cartItems.length === 0}
              className="disabled:opacity-60 text-sm px-4 py-3 bg-black text-white font-extrabold w-full sm:w-auto"
            >
              Checkout
            </button>
            <button
              onClick={() => navigate("/product-list")}
              className="text-sm px-4 py-3 bg-black text-white font-extrabold w-full sm:w-auto"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartList;
