import { createContext, useState } from "react";
import all_product from "../Components/Assets/all_product";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let i = 0; i <= all_product.length; i++) {
    cart[i] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [cartItem, setCartItem] = useState(getDefaultCart());

  // Handling the item added to the cart
  const addToCart = (itemId) => {
    setCartItem((prev) => {
      const updatedCart = { ...prev };
      if (updatedCart[itemId] === undefined) {
        updatedCart[itemId] = 0; // Default to 0 if itemId is not yet in the cart
      }
      updatedCart[itemId] += 1; // Increment the quantity
      return updatedCart;
    });
  };

  // Handling the item remove from the cart
  const removeFromCart = (itemId) => {
    setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  // console.log(cartItem)

  // Get total amount of the cart

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        let itemInfo = all_product.find((product) => product.id === +item);
        totalAmount += itemInfo.new_price * cartItem[item];
      }
    }
    return totalAmount;
  };

  const getTotalCartItem = () => {
    let totalItem = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        totalItem += cartItem[item];
      }
    }
    return totalItem;
  };

  const contextValue = {
    all_product,
    addToCart,
    removeFromCart,
    cartItem,
    getTotalCartAmount,
    getTotalCartItem,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
