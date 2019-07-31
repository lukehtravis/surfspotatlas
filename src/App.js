import React, { Component, Fragment } from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Components/Home";
import AddSpot from "./Components/AddSpot";
import Search from "./Components/Search";
import Profile from "./Components/Profile";
import PrivateRoute from "./Components/PrivateRoute";

class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/AddSpot" component={AddSpot} />
            <Route path="/Search" component={Search} />
            <PrivateRoute path="/Profile" component={Profile} />
          </Switch>
        </Fragment>
      </Router>
    );
  }
}

export default App;
