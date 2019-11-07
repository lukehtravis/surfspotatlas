import React, {Component} from "react";
import {Link} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {directionStringConverter, waveTypeStringConverter} from "../utils/dbNameConversions";
import StaticProgressBar from "./StaticProgressBar";

const styles = theme => ({
  capitalize: {
    textTransform: "capitalize"
  },
  spacing: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
})

const WavePopup = (props) => {
  console.log("Wave Popup Props", props)
  const {classes} = props
  return (
    <div>
      <Typography className={classes.capitalize}>Name: {props.waveDetails.waveName}</Typography>
      <Typography className={classes.spacing}>Wave Type: {waveTypeStringConverter(props.waveDetails.waveType)}</Typography>
      <Typography className={classes.spacing}>Direction: {directionStringConverter(props.waveDetails.waveDirection)}</Typography>
      <Typography>Quality</Typography>
      <StaticProgressBar value={props.waveDetails.waveQuality} />
    </div>
  )
}

export default withStyles(styles)(WavePopup);
