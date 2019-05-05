import React, { Component, Fragment } from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import logo from '../logo.svg';
import '../App.css';
import ApolloClient from "apollo-boost";
import { graphql } from 'react-apollo';
import Header from "./Header";
import {ALL_WAVES} from "../utils/queries"

class Home extends Component {
  state = {

  }

  render() {
    return (
        <Fragment>
          <Header />
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
                Learn React
              </a>
            </header>
          </div>
        </Fragment>
    );
  }
}

export default graphql(gql`${ALL_WAVES}`)(Home);
