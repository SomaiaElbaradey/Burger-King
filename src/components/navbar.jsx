import React, { useState } from "react";
import './styles.css'

export default function Navbar() {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  const navStyle = {
    backgroundColor: "#0d0c0a",
    color: "white",
    fontFamily: "bebe"
  }

  return (
    <nav style={navStyle} class="navbar navbar-expand-lg justify-content-between fixed-top text-center">
      <a class="navbar-brand promotion" href="/">
        Promotions
      </a>
      <button
        class="custom-toggler navbar-toggler"
        type="button"
        data-toggle="collapse"
        aria-controls="navbarsExample09"
        aria-expanded={!isNavCollapsed ? true : false}
        onClick={handleNavCollapse}
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div
        class={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`}
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
          />
        </a>
      </div>

      <form className="form-inline cart-badge text-center">
        <i class="fas fa-shopping-bag"> <span class="ml-2 badge badge-light">4</span></i>
      </form>
    </nav>
  );
}
