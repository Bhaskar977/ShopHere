import { createContext, useEffect, useState } from "react";
// import all_product from "../Components/Assets/all_product";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let i = 0; i <= 300 + 1; i++) {
    cart[i] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [all_product, setAll_Product] = useState([]);
  const [cartItem, setCartItem] = useState(getDefaultCart());

  useEffect(() => {
    fetch("http://localhost:4000/allproduct")
      .then((response) => response.json())
      .then((data) => setAll_Product(data));
  }, []);

  // Handling the item added to the cart
  const addToCart = (itemId) => {
    setCartItem((prev) => {
      const updatedCart = { ...prev };
      if (updatedCart[itemId] === undefined) {
        updatedCart[itemId] = 0; // Default to 0 if itemId is not yet in the cart
      } else {
        updatedCart[itemId] += 1; // Increment the quantity
      }
      return updatedCart;
    });
    if (localStorage.getItem("authToken")) {
      fetch("http://localhost:4000/addtocart", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    }
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
