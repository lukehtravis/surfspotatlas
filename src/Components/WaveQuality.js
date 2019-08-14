import React, {Component} from "react";
import ApolloClient from "apollo-boost";
import {graphql} from "react-apollo";
import gql from "graphql-tag";
import {WAVE_QUALITY} from "../utils/queries";

const WaveQuality = (props) => {
  const loading = props.data.loading
  console.log("wave quality", props)
  if (loading) {
    return "Loading..."
  }

  const waveQuality = props.data.Wave_Ratings_aggregate.aggregate.avg.wavequality
  return (
    <div>
      <p>Wave Quality Component {props.waveId} has {waveQuality} Wave Quality</p>
    </div>
  )
};

export default graphql(gql`${WAVE_QUALITY}`, {
  options: (props) => {return {variables: {id: props.waveId}}}
})(WaveQuality)
