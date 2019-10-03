import React, { Component }  from 'react';
import Header from "./Header";
import Footer from "./Footer";
import ApolloClient from "apollo-boost";
import { graphql } from 'react-apollo';
import gql from "graphql-tag";
import {FETCH_WAVE} from "../utils/queries";
import WaveMap from "./WaveMap";
import WaveAttributes from "./WaveAttributes";

const Wave = (props) => {

  if (!props.data.Waves) {
    return "Loading"
  }

  return (
    <div>
      <p>Wave</p>
      <WaveMap waveId={props.match.params.id} locationId={props.data.Waves[0].locationid} />
      <WaveAttributes waveId={props.match.params.id} />
    </div>
  );
};

export default graphql(gql`${FETCH_WAVE}`, {
    options: (props) => { return { variables: {id: props.match.params.id}}}
})(Wave)
