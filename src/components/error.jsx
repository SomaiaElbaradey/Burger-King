import React from "react";
import { NavLink } from "react-router-dom";

import img from "../img/1.jpg";

const Error = () => {
  const cartImg = {
    border: "3px solid #f2ce5f",
  };

  const container = {
    padding: "100px",
  };

  const text = {
    color: "#ffffff75",
  };

  const h1 = {
    color: "#ffffffe1",
  };

  const link = {
      style:"none",
      width:"100px!important",
  }

  return (
    <div style={{ backgroundColor: "#0d0c0a" }}>
      <div style={container} className="container row">
        <div className="col-md-8">
          <img width="100%" style={cartImg} src={img} />
        </div>
        <div className="row col text-center">
          <div style={text} className="col-md pl-5 pt-5">
            <h1 style={h1}>Error</h1>
            <p>
              We bring the season’s best mix of organic produce and hand-crafted
              farm products conveniently to your door by growing and partnering
              with local farms and artisans in your area.
            </p>
            <NavLink style={link} className="cart-btn" to="/">Home<i className="fas fa-arrow-right pl-2"></i></NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;
