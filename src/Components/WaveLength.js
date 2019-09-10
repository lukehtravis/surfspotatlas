import React, {Component} from "react";
import PercentageCircle from "./PercentageCircle";
import {FETCH_WAVE_LENGTH} from "../utils/queries";
import {graphql} from "react-apollo";
import gql from "graphql-tag";

const WaveLength = (props) => {
  if (props.data.loading) {
    return "Loading..."
  }
  const waveLength = props.data.Wave_Ratings_aggregate.aggregate.avg.wavelength
  return(
    <div>
      <PercentageCircle radius={50} percent={waveLength} >
        <p>Wave Length</p>
        <span>{waveLength}</span>
      </PercentageCircle>
    </div>
  )
}

export default graphql(gql`${FETCH_WAVE_LENGTH}`, {
  options: (props) => {return {variables: {id: props.waveId}}}
})(WaveLength)
