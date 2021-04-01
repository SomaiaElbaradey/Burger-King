import React, { useEffect, useState } from "react";
import axios from 'axios';
import './style.css'

const CartIcon = (props) => {
    useEffect(() => {
        console.log(props)
      }, []);
      
    return ( <i className="fas fa-cart-plus"></i> );
}
 
export default CartIcon;