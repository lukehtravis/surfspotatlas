import React, {Component} from "react";
import ApolloClient from "apollo-boost";
import {graphql} from "react-apollo";
import gql from "graphql-tag";
import {WAVE_QUALITY} from "../utils/queries";
import {withStyles} from "@material-ui/core/styles";
import PercentageCircle from "./PercentageCircle";
import WaveAttributeVote from "./WaveAttributeVote";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import StaticProgressBar from "./StaticProgressBar";
import WhatshotIcon from '@material-ui/icons/Whatshot';
import { waveAttributeHeadings } from "../utils/styleComponents";
import { useAuth0 } from "../react-auth0-wrapper";

const styles = theme => ({
  attributeHeader: waveAttributeHeadings
})

const WaveHollowness = (props) => {

  const { isAuthenticated, user } = useAuth0()
  const waveHollowness = props.attributeValue
  const {classes} = props
  return (
    <div>
      <Typography className={classes.attributeHeader}>Hollowness</Typography>
      <Grid container>
        <Grid item xs={1}>
          <WhatshotIcon />
        </Grid>
        <Grid item xs={10}>
          <StaticProgressBar value={waveHollowness} />
        </Grid>
        {isAuthenticated && (
          <Grid item xs={1}>
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

export default withStyles(styles)(WaveHollowness)
