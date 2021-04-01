import React, { useEffect, useState } from "react";
import axios from "axios";

import CartIcon from "../cart/carticon";
import Cart from "../cart/cart";

import "./style.css";

const Menu = (props) => {
  const [name, setName] = useState(false);
  const [price, setPrice] = useState(false);
  const [posts, setPosts] = useState(false);
  const [postsFetched, setpostsFetched] = useState(false);

  useEffect(() => {
    const getProfile = async () => {
      if (!postsFetched) {
        const { data } = await axios.get("http://localhost:8000/products");
        setPosts(data);
        console.log(data);
        console.log(posts);
        setpostsFetched(true);
      }
    };

    getProfile();
  }, [posts]);

  const handleClick = (product) => {
    console.log(product)
  }
  
  return (
    <>
      <div className="row container">
        <div className="col-5">
          <div className="card m-4">ok</div>
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
        <div className=" col m-4">
          {postsFetched ? (
            posts.map((prdct) => (
              <div className="card menuCard mb-3 text-center">
                <div className="mt-2 d-flex flex-row ">
                  <img
                    src={prdct.image}
                    className="card-img m-2"
                  />
                  <div className="d-flex flex-column">
                    <h5 className="card-title mt-2">{prdct.name}</h5>
                    <p>{prdct.price}$</p>
                  </div>
                  <div className="m-2">
                    <CartIcon 
                    onClick={event => {
                      console.log(prdct)
                      handleClick(prdct)
                    }}
                    product={prdct} />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>loader</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Menu;
