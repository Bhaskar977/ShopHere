import React, { useEffect, useState } from "react";
import "./Popular.css";
// import data_product from "../Assets/data";
import Item from "../Item/Item";

const Popular = () => {
  const [popularInWomen, setPopularInWomen] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_LINK}/popularinwomen`)
      .then((res) => res.json())
      .then((data) => setPopularInWomen(data));
  }, []);

  return (
    <div className="popular">
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      <div className="popular-item">
        {popularInWomen?.map((item, i) => {
          return (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Popular;
