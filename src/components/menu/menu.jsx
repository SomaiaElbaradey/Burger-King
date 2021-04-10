import React, { useEffect, useState } from "react";
import axios from "axios";

import { Pagination } from "@material-ui/lab";
import "./menuStyle.css";

import Navbar from "../navbar";
import Loading from "../loading";
import CartIcon from "../cart/carticon";

const Menu = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [postsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [allProducts, setAllProducts] = useState([]);
  const [refetch, setrefetch] = useState(false);
  const [oldProd, setoldProd] = useState([]);

  const filteredProducts = allProducts.filter((p) => p.inCart === true);
  const count = filteredProducts.length;

  let defaultSelectedPage = false;

  const getPosts = async function () {
    setIsLoading(true);
    axios
      .get("http://localhost:8000/products")
      .then((response) => {
        defaultSelectedPage = true;
        setAllProducts(response.data);
        let indexOfLastPost = currentPage * postsPerPage;
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

  useEffect(() => {
    const paginate = async function () {
      defaultSelectedPage = false;
      let indexOfLastPost = currentPage * postsPerPage;
      let indexOfFirstPost = indexOfLastPost - postsPerPage;
      await setPosts(allProducts.slice(indexOfFirstPost, indexOfLastPost));
    };
    paginate();
  }, [currentPage]);

  useEffect(() => {
    getPosts();
  }, [refetch]);

  const searching = async function (item) {
    setIsLoading(true);
    await setoldProd(allProducts);
    let products = [...oldProd];
    products = products.filter((product) =>
      product.name.toLocaleLowerCase().includes(item)
    );
    await setAllProducts(products);
    let indexOfLastPost = 1 * postsPerPage;
    let indexOfFirstPost = indexOfLastPost - postsPerPage;
    await setPosts(products.slice(indexOfFirstPost, indexOfLastPost));
    setIsLoading(false);
  };

  return (
    <div style={{ backgroundColor: "#0d0c0a" }}>
      <Navbar
        count={count}
        searching={searching}
        getPosts={refetchProdcts}
        allProducts={allProducts}
        setAllProducts={setAllProducts}
        setPosts={setPosts}
        postsPerPage={postsPerPage}
        refetchPosts={setrefetch}
        refetched={refetch}
        setIsLoading={setIsLoading}
      />

      <div className="row container"></div>
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
          variant="outlined"
          count={Math.ceil(allProducts.length / postsPerPage)}
          onChange={(event, page) => {
            {defaultSelectedPage?setCurrentPage(1) : setCurrentPage(page)}
          }}
        />
      </div>
    </div>
  );
};

export default Menu;
