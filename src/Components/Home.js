import React, { Component, Fragment, If } from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import logo from '../logo.svg';
import '../App.css';
import ApolloClient from "apollo-boost";
import { graphql } from 'react-apollo';
import Header from "./Header";
import {ALL_WAVES} from "../utils/queries"

// new Home(props);
//
// const home = Home.constructor(props);
//
// home.state;
// home.props;
// home.render;
// home.foo

class Home extends Component {
  constructor(props) {
    // use for setting initial state based on props
    super(props);
    console.log('called Home constructor ', props);
    // this.state = {
    //   waves: this.props.data.Waves
    // }
    this.foo = 'bar';
  }

  foo = 'bar';

  // state = {
  //   waves: []
  // }

  // is called after initial render
  componentDidMount() {
    console.log('called Home componentDidMount', this.props);
  }

  // is called after initial render and after componentDidMount, anytime props or state updates
  componentDidUpdate(prevProps, prevState) {
    console.log('called Home componentDidUpdate', this.props);
  }

  render() {
    console.log('called Home render');
    // if (this.props.data.Waves !== undefined) {
    // never set state in render
    // always call this.setState instead of setting state directly
    //   this.state.waves = this.props.data.Waves
    // }
    // const { prop1, prop2 } = this.props;

    if (this.props.data.loading) {
      return 'Loading';
    }

    if (this.props.data.error || !this.props.data.Waves) {
      return 'Error';
    }

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
              </a>
              {this.props.data.Waves.map((wave) => {
                return <div>
                          <p>{wave.name}</p>
                          <p>{wave.description}</p>
                        </div>
              })}
            </header>
          </div>
        </Fragment>
    );
  }
}

export default graphql(gql`${ALL_WAVES}`)(Home);
