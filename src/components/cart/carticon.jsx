import React, { useEffect, useState } from "react";
import axios from "axios";
import "./cartStyle.css";

const CartIcon = ({product}) => {
  useEffect(() => {
    // console.log("product", props.product);
  }, []);

  const addToCart = (e) => {
    console.log(product.id);
    let products = [...allProducts];
        const index = products.indexOf(product);
        products[index] = { ...products[index] };
        products[index].inCart = !products[index].inCart;
        setallProducts(products);
  };

  return (
    <button className="cart-btn" onClick={addToCart}>
      Add to cart
      <i className="fas fa-cart-plus"></i>
    </button>
  );
};

export default CartIcon;