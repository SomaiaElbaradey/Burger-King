import React from "react";
import { NavLink } from "react-router-dom";

import img from "../img/1.jpg";

const Aboout = () => {
  const cartImg = {
    border: "3px solid #f2ce5f",
  };

  const container = {
    padding: "70px",
    paddingTop: "20px",
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
      <div className="container row pt-5">
        <div  style={container} className="col-md-7 text-center">
          <img width="90%" style={cartImg} src={img} />
        </div>
        <div className="row col text-center">
          <div style={text} className="col-md pl-2 mt-5 mb-5">
            <h1 style={h1}>About</h1>
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

export default Aboout;
