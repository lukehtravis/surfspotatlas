import React, {Component} from "react";
import ApolloClient from "apollo-boost";
import {graphql} from "react-apollo";
import gql from "graphql-tag";
import {WAVE_QUALITY} from "../utils/queries";
import PercentageCircle from "./PercentageCircle";

const WaveQuality = (props) => {
  const loading = props.data.loading
  console.log("wave quality", props)
  if (loading) {
    return "Loading..."
  }

  const waveQuality = props.data.Wave_Ratings_aggregate.aggregate.avg.wavequality
  return (
    <div>
      <PercentageCircle radius={50} percent={waveQuality}>
        <p>Epicness</p>
        <span>{waveQuality}%</span>
      </PercentageCircle>
    </div>
  )
};

export default graphql(gql`${WAVE_QUALITY}`, {
  options: (props) => {return {variables: {id: props.waveId}}}
})(WaveQuality)
