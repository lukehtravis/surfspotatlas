import React, {Component} from "react";
import ApolloClient from "apollo-boost";
import {graphql} from "react-apollo";
import gql from "graphql-tag";
import {WAVE_QUALITY} from "../utils/queries";
import PercentageCircle from "./PercentageCircle";
import WaveAttributeVote from "./WaveAttributeVote";
import Grid from "@material-ui/core/Grid";
import StaticProgressBar from "./StaticProgressBar";
import { useAuth0 } from "../react-auth0-wrapper";

const WaveQuality = (props) => {

  const { isAuthenticated, user } = useAuth0()
  const waveQuality = props.attributeValue

  return (
    <div>
      <Grid container>
        <Grid item xs={7}>
          <StaticProgressBar value={waveQuality} />
        </Grid>
        {isAuthenticated && (
          <Grid item xs={7}>
            <WaveAttributeVote
              voteOnAttribute={props.voteOnAttribute}
              attributeValue={props.attributeValue}
              attributeName={props.attributeName}
            />
          </Grid>
        )}
      </Grid>
    </div>
  )
};

export default WaveQuality
