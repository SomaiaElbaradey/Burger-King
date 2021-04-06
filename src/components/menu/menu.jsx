import React, { useEffect, useState } from "react";
import axios from "axios";

import "./menuStyle.css";
import Navbar from "../navbar";
import Loading from "../loading";
import CartIcon from "../cart/carticon";
import Cart from "../cart/cart";
import { toast } from "react-toastify";

const Menu = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setSearching] = useState(false);
  const filteredProducts = posts.filter((p) => p.inCart == true);
  const count = filteredProducts.length;
  const getPosts = async function () {
    console.log('getProudcts')
    setIsLoading(true);

    axios
      .get("http://localhost:8000/products")
      .then((response) => {
        console.log(response.data, "response.data");
        setPosts(response.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err, "err"));
  };
  const refetchProdcts = async function () {
    toast("Refreshing Data!")
    axios
      .get("http://localhost:8000/products")
      .then((response) => {
        console.log(response.data, "response.data");
        setPosts(response.data);
      })
      .catch((err) => console.log(err, "err"));
  };

  // useEffect(() => {
  //   setCount((count) => {
  //     count++;
  //   });
  // }, [count]);

  useEffect(() => {
    console.log("e0");
    getPosts();
  }, []);

  console.log(count, "menue");

  const searching = async function (item) {
    // if (item) {
    //   let products = [...allProducts];
    //   products = products.filter((product) => {
    //     return product.name.toLocaleLowerCase().includes(item);
    //   });
    //   setPosts(products);
    // }
  };

  console.log("count");

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
          {!isLoading ? (
            posts.map((product) => (
              <div key={product.id} className="card col-lg-3 col-md-4">
                <div className="card-icon-div">
                  <img src={product.image} className="card-img m-2" />
                </div>
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-price">{product.price}$</p>
                  <CartIcon product={product} getPosts={refetchProdcts} />
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
