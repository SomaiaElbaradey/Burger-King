import React, { useEffect, useState } from "react";
import axios from "axios";

import CartIcon from "../cart/carticon";
import Cart from "../cart/cart";

import "./menuStyle.css";

const Menu = (props) => {
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
    console.log(product);
  };

  return (
    <div style={{backgroundColor: '#0d0c0a'}}>
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
              <div className="card col-lg-3 col-md-4">
                <div className="card-icon-div">
                  <img src={product.image} className="card-img m-2" />
                </div>
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-price">{product.price}$</p>
                  <CartIcon
                    onClick={(event) => {
                      console.log(product);
                    }}
                    product={product}
                  />
                </div>
              </div>
            ))
          ) : (
            <div>loader</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
