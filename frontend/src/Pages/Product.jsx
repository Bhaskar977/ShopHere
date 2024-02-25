import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useParams } from "react-router-dom";
import Breadcrumb from "../Components/Breadcrumb/Breadcrumb";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay";
import DescriptionBox from "../Components/DescriptionBox/DescriptionBox";
import RelatedProducts from "../Components/RelatedProducts/RelatedProducts";


const Product = () => {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();

  // To get the product of the given productId that we are searching for.
  const product = all_product.find((el) => el.id === +productId);

  return (
    <div>
      <Breadcrumb product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox />
      <RelatedProducts  />
    </div>
  );
};

export default Product;
