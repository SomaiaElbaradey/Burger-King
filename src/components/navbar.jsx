import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import Cart from "./cart/cart";
import "./styles.css";

export default function Navbar({
  searching,
  count,
  getPosts,
  allProducts,
  setAllProducts,
  postsPerPage,
  setPosts,
  refetchPosts,
  refetched,
  setIsLoading
}) {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [item, setItem] = useState("");
  const [isAsc, setIsAsc] = useState(true);
  const [oldProd, setoldProd] = useState([]);
  const [isFiltered, setisFiltered] = useState(false);

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

  const handleToggleSort = () => {
    setIsLoading(true);
    let products = [...allProducts];
    products.sort((a, b) => (a.name > b.name ? 1 : -1));
    let asc = isAsc;
    if (!asc) products.reverse();
    asc = !isAsc;
    setIsAsc(asc);
    setAllProducts(products);
    let indexOfLastPost = 1 * postsPerPage;
    let indexOfFirstPost = indexOfLastPost - postsPerPage;
    setPosts(products.slice(indexOfFirstPost, indexOfLastPost));
    setIsLoading(false);
  };

  const refetch = () => {
    setisFiltered(false);
    refetchPosts(!refetched);
  };

  useEffect(async function()  {
    let products = [...oldProd];
    products = products.filter((product) => product.type == 2 || product.type == 3);
    await setAllProducts(products);
    let indexOfLastPost = 1 * postsPerPage;
    let indexOfFirstPost = indexOfLastPost - postsPerPage;
    await setPosts(products.slice(indexOfFirstPost, indexOfLastPost));
    setIsLoading(false);
  }, [oldProd]);

  const snackFilter = async function () {
    setIsLoading(true);
    setisFiltered(true);
    await setoldProd(allProducts);
  };

  return (
    <>
      <nav
        style={navStyle}
        className="navbar navbar-expand-lg justify-content-between fixed-top text-center"
      >
        <NavLink className="navbar-brand promotion" onClick={refetch} to="/">
          Promotions
        </NavLink>
        <button
          style={btnStyle}
          className="custom-toggler navbar-toggler"
          type="button"
          data-toggle="collapse"
          aria-controls="navbarsExample09"
          aria-expanded={!isNavCollapsed ? true : false}
          onClick={handleNavCollapse}
        >
          <span className="navbar-toggler-icon">__</span>
        </button>

        <div
          className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`}
          id="navbarsExample09"
        >
          <i
            style={{ cursor: "pointer" }}
            onClick={handleToggleSort}
            className="fas fa-sort"
          ></i>

          <NavLink onClick={refetch} className="nav-link" to="/menu">
            Menu
          </NavLink>
          <a className="nav-link" onClick={snackFilter}>
            Snacks
          </a>
          <NavLink className="nav-link" to="/about">
            About
          </NavLink>
          {/* <a>
            <input
              className="search"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={item}
              onChange={handleSearch}
            />
          </a> */}
        </div>

        <form className="form-inline cart-badge text-center">
          {!isFiltered?(<Cart count={count} getPosts={getPosts} />):(<></>)}
        </form>
      </nav>
    </>
  );
}