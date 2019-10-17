import React, { Component } from 'react';
import {Link} from "react-router-dom";
import { graphql } from 'react-apollo';
import gql from "graphql-tag";
import {ALL_WAVES} from "../utils/queries";
import logo from '../logo.svg';

const pathToRegexp = require('path-to-regexp');

class HomeSpotList extends Component {

  render() {
    if (this.props.data.loading) {
      return 'Loading';
    }

    if (this.props.data.error || !this.props.data.Waves) {
      return 'Error';
    }
    /*
      path conversion strategy borrowed from following article
      https://stackoverflow.com/questions/38085893/react-router-link-pass-in-params
    */
    const WAVE_ROUTE = '/Wave/:id/';
    const toPath = pathToRegexp.compile(WAVE_ROUTE);
    return (
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to the surf spot atlas
        </p>
        {this.props.data.Waves.map((wave) => {
          return <div>
                    <Link to={toPath({ id: wave.id })}>{wave.name}</Link>
                  </div>
        })}
      </header>
    )
  }
}

export default graphql(gql`${ALL_WAVES}`)(HomeSpotList);
