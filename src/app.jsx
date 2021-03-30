import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import axios from "axios";

import Menu from './components/menu/menu.jsx';
import Navbar from './components/navbar.jsx';

class App extends Component {

  render() {
    return (
      <>
      <Navbar/>
      <Menu/>
      </>
    );
  }
}

export default App;
