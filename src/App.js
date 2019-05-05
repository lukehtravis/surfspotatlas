import React, { Component, Fragment } from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Components/Home";
import AddSpot from "./Components/AddSpot";
import LaunchAPI from "./utils/api.js";

class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <Header />
          <Route exact path="/" component={Home} />
          <Route path="/AddSpot" component={AddSpot} />
        </Fragment>
      </Router>
    );
  }
}

export default App;
