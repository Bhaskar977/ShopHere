import React from "react";
import "./DescriptionBox.css";

const DescriptionBox = () => {
  return (
    <div className="descriptionbox">
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>
        <div className="descriptionbox-nav-box fade">Reviews(122)</div>
      </div>
      <div className="descriptionbox-description">
        <p>
          An e-commerce website is an online platform where businesses sell
          products or services to consumers over the internet. These websites
          facilitate transactions by allowing customers to browse products, add
          items to a virtual shopping cart, and complete purchases
          electronically using various payment methods. E-commerce sites often
          feature product catalogs, secure payment gateways, customer reviews,
          and order tracking systems to enhance the shopping experience.
        </p>
      </div>
    </div>
  );
};

export default DescriptionBox;
