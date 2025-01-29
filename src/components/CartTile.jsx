import React from "react";
import { Fragment, useContext } from "react";
import { ShoppingCartContext } from "../context";

const CartTile = ({ singleCartItem }) => {
  const { handleRemoveFromCart, addProductToCart } =
    useContext(ShoppingCartContext);

  return (
    <Fragment>
      <div className="grid sm:grid-cols-1 md:grid-cols-3 items-start gap-5">
        {/* Cart Item Details */}
        <div className="col-span-2 flex sm:flex-col sm:items-center md:flex-row items-start gap-4">
          {/* Product Image */}
          <div className="w-28 h-28 max-sm:w-20 shrink-0 bg-gray-400 p-1 rounded-sm">
            <img
              src={singleCartItem?.thumbnail}
              alt={singleCartItem?.title}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Product Information and Remove Button */}
          <div className="flex flex-col sm:items-center md:items-start">
            <h3 className="text-base font-bold text-gray-900">
              {singleCartItem?.title}
            </h3>

            {/* REMOVE Button */}
            <button
              onClick={() => handleRemoveFromCart(singleCartItem, true)}
              className="mt-2 text-sm px-4 py-2 bg-red-500 text-white font-extrabold rounded-md hover:bg-red-600"
            >
              REMOVE
            </button>
          </div>
        </div>

        {/* Price & Quantity Controls */}
        <div className="ml-auto sm:mt-4 md:mt-0 flex flex-col items-end gap-2">
          {/* Price Display */}
          <h3 className="text-lg font-bold text-gray-900">
            ${singleCartItem?.totalPrice.toFixed(2)}
          </h3>

          {/* Quantity */}
          <p className="font-bold text-sm">
            Quantity: {singleCartItem?.quantity}
          </p>

          {/* Quantity Control Buttons */}
          <div className="mt-2 flex gap-3">
            <button
              onClick={() => handleRemoveFromCart(singleCartItem, false)}
              className="px-3 py-2 border border-gray-700 rounded-md disabled:opacity-60"
              disabled={singleCartItem?.quantity === 1}
            >
              -
            </button>
            <button
              onClick={() => addProductToCart(singleCartItem)}
              className="px-3 py-2 border border-gray-700 rounded-md"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <hr className="border-gray-300 mt-4" />
    </Fragment>
  );
};

export default CartTile;
