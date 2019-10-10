import React, { Component, Fragment } from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Components/Home";
import AddSpot from "./Components/AddSpot";
import Search from "./Components/Search";
import Profile from "./Components/Profile";
import PrivateRoute from "./Components/PrivateRoute";
import Wave from "./Components/Wave";
import Area from "./Components/Area";
const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");
// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: "AIzaSyAIwOaeqXqiJNqm_C5yvO_cWmm48fBiQNU",
  authDomain: "surfspotatlas.firebaseapp.com",
  projectId: "surfspotatlas",
  storageBucket: "surfspotatlas.appspot.com",
  storageBucket: "surfspotatlas.appspot.com",
  messagingSenderId: "348127454502",
  appId: "1:348127454502:web:4870568f0f2bab6da2cde7"
});

var db = firebase.firestore();

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
            <Route path="/Wave/:id" component={Wave} />
            <Route path="/Area/:areaName" component={Area} />
            <PrivateRoute path="/Profile" component={Profile} />
          </Switch>
        </Fragment>
      </Router>
    );
  }
}

export default App;
