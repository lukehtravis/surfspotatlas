import React, {Component} from "react";
import ApolloClient from "apollo-boost";
import {graphql} from "react-apollo";
import gql from "graphql-tag";
import {WAVE_QUALITY} from "../utils/queries";
import PercentageCircle from "./PercentageCircle";
import WaveAttributeVote from "./WaveAttributeVote";
import { useAuth0 } from "../react-auth0-wrapper";

const WaveQuality = (props) => {
  const loading = props.data.loading
  let userId = "";

  if (loading) {
    return "Loading..."
  }

  const { isAuthenticated, user } = useAuth0()
  const waveQuality = props.data.Wave_Ratings_aggregate.aggregate.avg.wavequality
  if (isAuthenticated) {
    userId = user.sub
  }

  return (
    <div>
      <PercentageCircle radius={50} percent={waveQuality}>
        <p>Epicness</p>
        <span>{waveQuality}%</span>
      </PercentageCircle>
      {isAuthenticated && <WaveAttributeVote refetch={props.data.refetch} userId={userId} />}
    </div>
  )
};

export default graphql(gql`${WAVE_QUALITY}`, {
  options: (props) => {return {variables: {id: props.waveId}}}
})(WaveQuality)
