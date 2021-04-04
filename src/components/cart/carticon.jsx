import React from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./cartStyle.css";

const CartIcon = ({ product }) => {
  const editPosts = async function (product) {
    await axios.patch(`http://localhost:8000/products/${product.id}`, {
      inCart: true,
      count: 1
    });
    toast.success("Product Added to cart successfully!");
  };

  const addToCart = () => {
    editPosts(product);
  };

  return (
    <div>
      <ToastContainer autoClose={2500} />
      <button className="cart-btn" onClick={addToCart}>
        Add to cart
        <i className="fas fa-cart-plus"></i>
      </button>
    </div>
  );
};

export default CartIcon;
