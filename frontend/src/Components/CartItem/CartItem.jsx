import React, { useContext } from "react";
import "./CartItem.css";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../Assets/cart_cross_icon.png";

const CartItem = () => {
  const { all_product, cartItem, removeFromCart, getTotalCartAmount } =
    useContext(ShopContext);

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((item, i) => {
        if (cartItem[item.id] > 0) {
          return (
            <div key={item.id}>
              <div className="cartitems-format-main cartitems-format">
                <img
                  src={item.image}
                  alt=""
                  className="carticon-product-icon"
                />
                <p>{item.name}</p>
                <p>${item.new_price}</p>
                <button className="cartitems-quantity">
                  {cartItem[item.id]}
                </button>
                <p>${item.new_price * cartItem[item.id]}</p>
                <img
                  className="cartitems-remove-icon"
                  src={remove_icon}
                  onClick={() => removeFromCart(item.id)}
                  alt=""
                />
              </div>
              <hr />
            </div>
          );
        } else {
          return null;
        }
      })}
      <div className="cartitem-down">
        <div className="cartitem-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitem-total-item">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitem-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitem-total-item">
              <h3>Total</h3>
              <h3>${getTotalCartAmount()}</h3>
            </div>
          </div>
          <button>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cartitem-promocode">
          <p>If you have promo code, Enter it here</p>
          <div className="cartitem-promobox">
            <input type="text" placeholder="promo code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
