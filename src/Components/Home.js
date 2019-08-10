import React, { Component, Fragment, If } from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import logo from '../logo.svg';
import '../App.css';
import ApolloClient from "apollo-boost";
import { graphql } from 'react-apollo';
import Header from "./Header";
import NavBar from "./NavBar"
import {Link} from "react-router-dom";
import {ALL_WAVES} from "../utils/queries";
const pathToRegexp = require('path-to-regexp');

const Home = (props) => {
    if (props.data.loading) {
      return 'Loading';
    }

    if (props.data.error || !props.data.Waves) {
      return 'Error';
    }
    /*
      path conversion strategy borrowed from following article
      https://stackoverflow.com/questions/38085893/react-router-link-pass-in-params
    */
    const WAVE_ROUTE = '/Wave/:id/';
    const toPath = pathToRegexp.compile(WAVE_ROUTE);
    return (
        <Fragment>
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                Edit <code>src/App.js</code> and save to reload.
              </p>
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
              </a>
              {props.data.Waves.map((wave) => {
                return <div>
                          <Link to={toPath({ id: wave.id })}>{wave.name}</Link>
                        </div>
              })}
            </header>
          </div>
        </Fragment>
    );
}

export default graphql(gql`${ALL_WAVES}`)(Home);
