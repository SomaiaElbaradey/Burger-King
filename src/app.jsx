import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import axios from "axios";

import Menu from './components/menu/menu.jsx';
import Navbar from './components/navbar.jsx';
import Header from './components/header';

class App extends Component {

  render() {
    return (
      <>
      <Header/>
      <Menu/>
      </>
    );
  }
}

export default App;
