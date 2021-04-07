import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pagination } from "@material-ui/lab";
import { makeStyles } from "@material-ui/styles";

import "./menuStyle.css";

import Navbar from "../navbar";
import Loading from "../loading";
import CartIcon from "../cart/carticon";
import Cart from "../cart/cart";

const Menu = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [postsPerPage, setPostsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [allProducts, setAllProducts] = useState([]);

  const filteredProducts = allProducts.filter((p) => p.inCart == true);
  const count = filteredProducts.length;

  const getPosts = async function () {
    setIsLoading(true);
    axios
      .get("http://localhost:8000/products")
      .then((response) => {
        setAllProducts(response.data);
        let indexOfLastPost = 1 * postsPerPage;
        let indexOfFirstPost = indexOfLastPost - postsPerPage;
        setPosts(response.data.slice(indexOfFirstPost, indexOfLastPost));
        setIsLoading(false);
      })
      .catch((err) => console.log(err, "err"));
  };

  const refetchProdcts = async function () {
    axios
      .get("http://localhost:8000/products")
      .then((response) => {
        setAllProducts(response.data);
      })
      .catch((err) => console.log(err, "err"));
  };

  const paginate = async function () {
    let indexOfLastPost = currentPage * postsPerPage;
    let indexOfFirstPost = indexOfLastPost - postsPerPage;
    await setPosts(allProducts.slice(indexOfFirstPost, indexOfLastPost));
  };

  useEffect(() => {
    paginate();
  }, [currentPage]);

  useEffect(() => {
    getPosts();
  }, []);

  const searching = async function (item) {
    // if (item) {
    //   let products = [...allProducts];
    //   products = products.filter((product) => {
    //     return product.name.toLocaleLowerCase().includes(item);
    //   });
    //   setPosts(products);
    // }
  };

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
      {/* <Cart /> */}
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
      <div className="text-center">
        <Pagination
          //  defaultPage={1} siblingCount={0} boundaryCount={2}
          variant="outlined"
          count={Math.ceil(allProducts.length / postsPerPage)}
          onChange={(event, page) => {
            setCurrentPage(page);
          }}
        />
      </div>
    </div>
  );
};

export default Menu;
