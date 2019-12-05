import React from "react";
import {withStyles} from "@material-ui/core/styles";
import WaveAttributeVote from "./WaveAttributeVote";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import StaticProgressBar from "./StaticProgressBar";
import PoolIcon from '@material-ui/icons/Pool';
import { waveAttributeHeadings } from "../utils/styleComponents";
import { useAuth0 } from "../react-auth0-wrapper";

const styles = theme => ({
  attributeHeader: waveAttributeHeadings
})

const WaveDanger = (props) => {

  const { isAuthenticated } = useAuth0()
  const waveDanger = props.attributeValue
  const {classes} = props
  return (
    <div>
      <Typography className={classes.attributeHeader}>Danger</Typography>
      <Grid container>
        <Grid item xs={1}>
          <PoolIcon />
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

export default withStyles(styles)(WaveDanger)
