import React from "react";
import {withStyles} from "@material-ui/core/styles";
import WaveAttributeVote from "./WaveAttributeVote";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import StaticProgressBar from "./StaticProgressBar";
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import { waveAttributeHeadings } from "../utils/styleComponents";
import { useAuth0 } from "../react-auth0-wrapper";

const styles = theme => ({
  attributeHeader: waveAttributeHeadings
})

const WaveCrowd = (props) => {

  const { isAuthenticated } = useAuth0()
  const waveDanger = props.attributeValue
  const {classes} = props
  return (
    <div>
      <Typography className={classes.attributeHeader}>Crowd</Typography>
      <Grid container>
        <Grid item xs={1}>
          <SupervisedUserCircleIcon />
        </Grid>
        <Grid item xs={10}>
          <StaticProgressBar value={waveDanger} />
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

export default withStyles(styles)(WaveCrowd)
