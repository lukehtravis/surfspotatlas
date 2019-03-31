import React, { Component, Fragment } from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import logo from '../logo.svg';
import '../App.css';
import ApolloClient from "apollo-boost";
import Header from "./Header";

class App extends Component {
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
              <Query
        query={gql`
          {
      Users {
        FirstName
        LastName
      }
    }
        `}
      >
      {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;

          return data.Users.map(({ FirstName, LastName }) => (
            <div key={FirstName}>
              <p>{FirstName}: {LastName}</p>
            </div>
          ));
        }}
      </Query>
            </header>
          </div>
        </Fragment>

    );
  }
}

export default App;
