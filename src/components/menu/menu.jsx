import React, {useEffect, useState} from 'react';
import axios from 'axios';

import CartIcon from '../cart/carticon';
import Cart from '../cart/cart';

const Menu = (props) => {
  const [name, setName] = useState(false);
  const [price, setPrice] = useState(false);
  const [posts, setPosts] = useState(false);
  const [postsFetched, setpostsFetched] = useState(false);

  useEffect(() => {
    const getProfile = async () => {
      if(!postsFetched) {
      const { data } = await axios.get("http://localhost:8000/products");
      setPosts(data);
      console.log(data);
      console.log(posts);
      setpostsFetched(true);
      }
    };

    getProfile();
  }, [posts]);

    return ( 
        <>
        <div className="row mt-4">
          <div className="col-3">
            {/* <Filter
              types={this.props.types}
              activeFilter={this.props.activeFilter}
              onActiveFilterChange={this.props.onActiveFilterChange}
            /> */}
          </div>
          <div className="col">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {postsFetched? (posts.map((prdct) => (
                  <tr>
                    <td>{prdct.name}</td>
                    <td>{prdct.price}</td>
                    <td style={{ cursor: "pointer" }}>
                      <CartIcon
                        product={prdct}
                        // onToggleInCart={this.props.onToggleInCart}
                      />
                    </td>
                  </tr>
                ))): <td>loader</td>}
              </tbody>
            </table>

            {/* Pagination */}
            {/* {filteredProducts.length >= this.props.pageSize && (
              <Pagination
                pageSize={this.props.pageSize}
                activePage={this.props.activePage}
                count={filteredProducts.length}
                onActivePageChange={this.props.onActivePageChange}
              />
            )} */}
          </div>
        </div>
        <Cart/>
        </>
     );
}
 
export default Menu;