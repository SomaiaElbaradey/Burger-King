import React, { useEffect, useState } from "react";
import axios from "axios";
import "./cartStyle.css";

const CartIcon = (props) => {
  useEffect(() => {
    console.log("product", props.product);
  }, []);

  return (
    <button className="cart-btn">
      Add to cart  
      <i
        className="fas fa-cart-plus"
        onClick={(e) => {
          console.log("clicked", props.product);
        }}
      ></i>
    </button>
  );
};

export default CartIcon;
