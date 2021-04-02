import React, { useState } from "react";
import "./styles.css";

export default function Navbar({ searching }) {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  const [item, setItem] = useState("");
  const [count, setCount] = useState(0);

  const navStyle = {
    backgroundColor: "#0d0c0a",
    color: "white",
    fontFamily: "bebe",
  };

  let handleSeach = (e) => {
    setItem(e.target.value);
    searching(item.toLocaleLowerCase());
    console.log(item.toLocaleLowerCase());
  };

  return (
    <nav
      style={navStyle}
      className="navbar navbar-expand-lg justify-content-between fixed-top text-center"
    >
      <a className="navbar-brand promotion" href="/">
        Promotions
      </a>
      <button
        className="custom-toggler navbar-toggler"
        type="button"
        data-toggle="collapse"
        aria-controls="navbarsExample09"
        aria-expanded={!isNavCollapsed ? true : false}
        onClick={handleNavCollapse}
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div
        className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`}
        id="navbarsExample09"
      >
        <a className="nav-link">Menu</a>
        <a className="nav-link">Snacks</a>
        <a className="nav-link">Drinks</a>
        <a>
          <input
            className="search"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={item}
            onChange={handleSeach}
          />
        </a>
      </div>

      <form className="form-inline cart-badge text-center">
        <i className="fas fa-shopping-bag">
          <span className="ml-2 badge badge-light">{count}</span>
        </i>
      </form>
    </nav>
  );
}
