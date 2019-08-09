import React, { Component }  from 'react';
import Header from "./Header";
import Map from "./Map";
import Pin from "./Pin";
import Footer from "./Footer";
import ApolloClient from "apollo-boost";
import { graphql } from 'react-apollo';
import gql from "graphql-tag";
import {FETCH_WAVE} from "../utils/queries"

const Wave = (props) => {
  console.log(props)
  return (
    <div>
      <p>Wave</p>
    </div>
  );
};

export default graphql(gql`${FETCH_WAVE}`, {
  options: (props) => { return { variables: {id: props.match.params.id}}}
})(Wave)
