import React, { Component, Fragment, If } from 'react';
import { Query } from "react-apollo";
import '../App.css';
import ApolloClient from "apollo-boost";
import HomeHero from "./HomeHero";
import Header from "./Header";
import HomeSpotList from "./HomeSpotList";
import NavBar from "./NavBar"

const Home = () => {

    return (
        <Fragment>
          <div className="App">
            <HomeHero />
          </div>
          { /* <HomeSpotList /> */ }
        </Fragment>
    );
}

export default Home;
