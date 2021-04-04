import React, { useEffect, useState } from "react";
import axios from "axios";

import "./menuStyle.css";
import Navbar from "../navbar";
import Loading from "../loading";
import CartIcon from "../cart/carticon";
import Cart from "../cart/cart";

const Menu = () => {
  const [posts, setPosts] = useState(false);
  const [postsFetched, setpostsFetched] = useState(false);
  const [allProducts, setallProducts] = useState([]);
  const [isSearching, setSearching] = useState(false);
  const [count, setCount] = useState(0);

  const getPosts = async function () {
    // if (!postsFetched) {
      const { data } = await axios.get("http://localhost:8000/products");
      setPosts(data);
      setallProducts(data);
      setpostsFetched(true);
    // }
  };

  const getCount = () => {
    const products = [...allProducts];
    const filteredProducts = products.filter((p) => p.inCart == true);
    setCount(filteredProducts.length);
  };

  useEffect(() => {
    console.log("use effect");
    getPosts();
    getCount();
  }, [allProducts]);

  useEffect(() => {
    console.log("e0");
    getPosts();
  }, []);

  const searching = async function (item) {
    if (item) {
      let products = [...allProducts];
      products = products.filter((product) => {
        return product.name.toLocaleLowerCase().includes(item);
      });
      setPosts(products);
      setSearching(true);
    }
  };

  console.log("reender0");

  return (
    <div style={{ backgroundColor: "#0d0c0a" }}>
      <Navbar count={count} searching={searching} />
      <div className="row container">
        {/* <Filter
              types={this.props.types}
              activeFilter={this.props.activeFilter}
              onActiveFilterChange={this.props.onActiveFilterChange}
            /> */}
      </div>
      {/* <div className="col"> */}

      {/* Pagination */}
      {/* {filteredProducts.length >= this.props.pageSize && (
              <Pagination
                pageSize={this.props.pageSize}
                activePage={this.props.activePage}
                count={filteredProducts.length}
                onActivePageChange={this.props.onActivePageChange}
              />
            )} */}
      {/* </div> */}
      {/* <Cart /> */}
      {/* <div className=" col m-4"> */}
      <div className="container cards">
        <div className="row d-flex justify-content-center">
          {postsFetched ? (
            posts.map((product) => (
              <div key={product.id} className="card col-lg-3 col-md-4">
                <div className="card-icon-div">
                  <img src={product.image} className="card-img m-2" />
                </div>
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-price">{product.price}$</p>
                  <CartIcon product={product} allProducts={allProducts} />
                </div>
              </div>
            ))
          ) : (
            <div>
              <Loading />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
