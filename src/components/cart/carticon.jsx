import React, { useEffect, useState } from "react";
import axios from 'axios';

const CartIcon = (props) => {
    useEffect(() => {
        console.log(props)
      }, []);
      
    return ( <h1>cart</h1> );
}
 
export default CartIcon;