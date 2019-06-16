import React, { Component, Fragment } from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Components/Home";
import AddSpot from "./Components/AddSpot";
import Search from "./Components/Search";
import Login from "./Components/Login";

class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <Header />
          <Route exact path="/" component={Home} />
          <Route path="/AddSpot" component={AddSpot} />
          <Route path="/Search" component={Search} />
          <Route path="/Login" component={Login} />
        </Fragment>
      </Router>
    );
  }
}

export default App;
