import { createContext, useEffect, useState } from "react";
import { data, useNavigate } from "react-router-dom";

export const ShoppingCartContext = createContext(null);

function ShoppingCartProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [productList, setProductList] = useState([]);
  const [productDetails, setProductDetails] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  const navigate = useNavigate();

  async function fetchAllProducts() {
    try {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      if (data.products.length > 0) {
        setProductList(data.products);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const addProductToCart = (productDetails) => {
    console.log(productDetails);
    const copyExistingCartItems = [...cartItems];
    const findIndexOfCurrentItem = copyExistingCartItems.findIndex(
      (cartItem) => cartItem.id === productDetails.id
    );
    if (findIndexOfCurrentItem === -1) {
      copyExistingCartItems.push({
        ...productDetails,
        quantity: 1,
        totalPrice: productDetails.price,
      });
    } else {
      console.log("its coming here");
      copyExistingCartItems[findIndexOfCurrentItem] = {
        ...copyExistingCartItems[findIndexOfCurrentItem],
        quantity: copyExistingCartItems[findIndexOfCurrentItem].quantity + 1,
        totalPrice:
          (copyExistingCartItems[findIndexOfCurrentItem].quantity + 1) *
          copyExistingCartItems[findIndexOfCurrentItem].price,
      };
    }

    setCartItems(copyExistingCartItems);
    localStorage.setItem("cartItems", JSON.stringify(copyExistingCartItems));
    navigate("/cart");
  };

  function handleRemoveFromCart(getProductDetails, isFullyRemoveFromCart) {
    let cpyExistingCartItems = [...cartItems];
    const findIndexOfCurrentCartItem = cpyExistingCartItems.findIndex(
      (item) => item.id === getProductDetails.id
    );

    if (isFullyRemoveFromCart) {
      cpyExistingCartItems.splice(findIndexOfCurrentCartItem, 1);
    } else {
      cpyExistingCartItems[findIndexOfCurrentCartItem] = {
        ...cpyExistingCartItems[findIndexOfCurrentCartItem],
        quantity: cpyExistingCartItems[findIndexOfCurrentCartItem].quantity - 1,
        totalPrice:
          (cpyExistingCartItems[findIndexOfCurrentCartItem].quantity - 1) *
          cpyExistingCartItems[findIndexOfCurrentCartItem].price,
      };
    }

    localStorage.setItem("cartItems", JSON.stringify(cpyExistingCartItems));
    setCartItems(cpyExistingCartItems);
  }

  useEffect(() => {
    fetchAllProducts();
    setCartItems(JSON.parse(localStorage.getItem("cartItems")) || []);
  }, []);
  console.log(cartItems);

  return (
    <ShoppingCartContext.Provider
      value={{
        productList,
        loading,
        setLoading,
        productDetails,
        setProductDetails,
        addProductToCart,
        cartItems,
        handleRemoveFromCart,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
export default ShoppingCartProvider;
