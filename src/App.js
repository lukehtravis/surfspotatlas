import React, { Component, Fragment } from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import AddSpot from "./Components/AddSpot";
import Search from "./Components/Search";
import Profile from "./Components/Profile";
import PrivateRoute from "./Components/PrivateRoute";
import Wave from "./Components/Wave";
import Area from "./Components/Area";

class App extends Component {

  render() {
    return (
      <Router>
        <Fragment className="app-container">
          <Header className="app-header" />
          <div className="app-body" >
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/AddSpot" component={AddSpot} />
              <Route path="/Search" component={Search} />
              <Route path="/Wave/:id" component={Wave} />
              <Route path="/Area/:areaName" component={Area} />
              <PrivateRoute path="/Profile" component={Profile} />
            </Switch>
          </div>
          <Footer className="app-footer" />
        </Fragment>
      </Router>
    );
  }
}

export default App;
