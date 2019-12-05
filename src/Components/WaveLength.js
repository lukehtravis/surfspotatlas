import React from "react";
import {withStyles} from "@material-ui/core/styles";
import WaveAttributeVote from "./WaveAttributeVote";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import StaticProgressBar from "./StaticProgressBar";
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';
import { waveAttributeHeadings } from "../utils/styleComponents";
import { useAuth0 } from "../react-auth0-wrapper";

const styles = theme => ({
  attributeHeader: waveAttributeHeadings
})

const WaveLength = (props) => {

  const { isAuthenticated } = useAuth0()
  const waveLength = props.attributeValue
  const {classes} = props
  return (
    <div>
      <Typography className={classes.attributeHeader}>Length</Typography>
      <Grid container>
        <Grid item xs={1}>
          <SettingsEthernetIcon />
        </Grid>
        <Grid item xs={10}>
          <StaticProgressBar value={waveLength} />
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

export default withStyles(styles)(WaveLength)
