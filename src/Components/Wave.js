import React, { Component }  from 'react';
import Header from "./Header";
import Footer from "./Footer";
import ApolloClient from "apollo-boost";
import { graphql } from 'react-apollo';
import gql from "graphql-tag";
import {FETCH_WAVE} from "../utils/queries";
import WaveMap from "./WaveMap";
import WaveQuality from "./WaveQuality";
import WaveHollowness from "./WaveHollowness";
import WaveDanger from "./WaveDanger";
import WaveLength from "./WaveLength";
import WindAngle from "./WindAngle";
import TideSlider from "./TideSlider";

const Wave = (props) => {
  if (!props.data.Waves) {
    return "Loading"
  }

  return (
    <div>
      <p>Wave</p>
      <WaveMap waveId={props.match.params.id} locationId={props.data.Waves[0].locationid} />
      <WaveQuality waveId={props.match.params.id} />
      <WaveHollowness waveId={props.match.params.id} />
      <WaveDanger waveId={props.match.params.id} />
      <WaveLength waveId={props.match.params.id} />
      <WindAngle waveId={props.match.params.id} />
      <TideSlider waveId={props.match.params.id} />
    </div>
  );
};

export default graphql(gql`${FETCH_WAVE}`, {
    options: (props) => { return { variables: {id: props.match.params.id}}}
})(Wave)
