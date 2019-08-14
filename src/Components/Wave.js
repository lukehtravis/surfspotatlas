import React, { Component }  from 'react';
import Header from "./Header";
import Map from "./Map";
import Pin from "./Pin";
import Footer from "./Footer";
import ApolloClient from "apollo-boost";
import { graphql } from 'react-apollo';
import gql from "graphql-tag";
import {FETCH_WAVE} from "../utils/queries"
import WaveQuality from "./WaveQuality";
import WaveHollowness from "./WaveHollowness";

const Wave = (props) => {
  console.log(props)
  return (
    <div>
      <p>Wave</p>
      <WaveQuality waveId={props.match.params.id} />
      <WaveHollowness waveId={props.match.params.id} />
    </div>
  );
};

export default graphql(gql`${FETCH_WAVE}`, {
  options: (props) => { return { variables: {id: props.match.params.id}}}
})(Wave)
