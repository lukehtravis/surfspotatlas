import React, {Component} from "react";
import ApolloClient from "apollo-boost";
import {graphql} from "react-apollo";
import gql from "graphql-tag";
import {WAVE_QUALITY} from "../utils/queries";
import PercentageCircle from "./PercentageCircle";
import WaveAttributeVote from "./WaveAttributeVote";
import { useAuth0 } from "../react-auth0-wrapper";

const WaveQuality = (props) => {

  const { isAuthenticated, user } = useAuth0()
  const waveQuality = props.attributeValue

  return (
    <div>
      <PercentageCircle radius={50} percent={waveQuality}>
        <p>Epicness</p>
        <span>{waveQuality}%</span>
      </PercentageCircle>
      {isAuthenticated && (
        <WaveAttributeVote
          voteOnAttribute={props.voteOnAttribute}
          attributeValue={props.attributeValue}
          attributeName={props.attributeName}
        />)}
    </div>
  )
};

export default WaveQuality
