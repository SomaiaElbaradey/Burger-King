import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Menu from "./components/menu/menu.jsx";
import Header from "./components/header";
import Aboout from "./components/about";
import Error from "./components/error.jsx";

class App extends Component {
  render() {
    return (
      <>
        <Header />
        <Switch>
          <Route exact path="/menu" component={Menu} />
          <Route exact path="/about" component={Aboout} />
          <Route exact path="/" component={Menu} />
          <Route path="/error" component={Error} />
          <Redirect to="/error" />
        </Switch>
      </>
    );
  }
}

export default App;
