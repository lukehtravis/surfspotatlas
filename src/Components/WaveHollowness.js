import React, {Component} from "react";
import ApolloClient from "apollo-boost";
import {graphql} from "react-apollo";
import gql from "graphql-tag";
import {WAVE_HOLLOWNESS} from "../utils/queries"

const WaveHollowness = (props) => {
  const loading = props.data.loading
  if (loading) {
    return "Loading..."
  }
  const waveHollowness = props.data.Wave_Ratings_aggregate.aggregate.avg.wavehollowness
  return (
    <div>
      <p>Wave hollowness is {waveHollowness}</p>
    </div>
  )
}

export default graphql(gql`${WAVE_HOLLOWNESS}`, {
  options: (props) => {return {variables: {id: props.waveId}}}
})(WaveHollowness)
