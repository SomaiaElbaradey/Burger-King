import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import Cart from "./cart/cart";
import "./styles.css";

export default function Navbar({ searching, count, getPosts }) {

  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [item, setItem] = useState("");
  
  const navStyle = {
    backgroundColor: "#0d0c0a",
    color: "white",
    fontFamily: "bebe",
  };

  const btnStyle = {
    backgroundColor: "#fff9",
    color: "black",
    fontFamily: "bebe",
  };

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  let handleSearch = (e) => {
    setItem(e.target.value);
    searching(item.toLocaleLowerCase());
    console.log(item.toLocaleLowerCase());
  };

  return (
    <>
      <nav
        style={navStyle}
        className="navbar navbar-expand-lg justify-content-between fixed-top"
      >
        <NavLink className="navbar-brand promotion" to="/">Promotions</NavLink>
        <button
          style={btnStyle}
          className="custom-toggler navbar-toggler"
          type="button"
          data-toggle="collapse"
          aria-controls="navbarsExample09"
          aria-expanded={!isNavCollapsed ? true : false}
          onClick={handleNavCollapse}
        >
          <span className="navbar-toggler-icon">___</span>
        </button>

        <div
          className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`}
          id="navbarsExample09"
        >
          <i style={{ cursor: "pointer" }} className="fas fa-sort ml-3"></i>
          <NavLink className="nav-link" to="/menu">Menu</NavLink>
          <a className="nav-link">Snacks</a>
          <a className="nav-link">Drinks</a>
          <NavLink className="nav-link" to="/about">About</NavLink>
          <a>
            <input
              className="search"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={item}
              onChange={handleSearch}
            />
          </a>
        </div>

        <form className="form-inline cart-badge text-center">
          <Cart count={count} getPosts={getPosts}/>
        </form>
      </nav>
    </>
  );
}
