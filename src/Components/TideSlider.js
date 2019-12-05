import React from "react";
import {graphql} from "react-apollo";
import gql from "graphql-tag";
import Slider from '@material-ui/core/Slider';
import {FETCH_TIDES} from '../utils/queries';
import {withStyles} from "@material-ui/core/styles";
import {tideMarks} from "../utils/labels";
import Typography from "@material-ui/core/Typography";

/*
  This component represents sliders with two inputs, which do not allow user
  interaction.
  The sliders take in two values, each of which represents one "thumb" or circle,
  which represents the extremes of a range (a range that is the average of user)
  contributed attribute rankings in a database.
  The bar height is set to default breakpoint by breakpoint, and then elements are
  adjusted around that (numbers below were fidgeted with to meet design spec)

  TODO... MuiSlider-markLabel & MuiSlider-mark are classes that control the marks (words below the bar)
  The docs don't say anything about how to style them via component, so currently that styling
  lives in App.css
*/


const barHeight = 15
// const thumbSize = barHeight * 1.66

const styles = theme => {
  return {
    root: {
      height: theme.breakpoints.width
    },
    track: {
      height: barHeight,
      borderRadius: barHeight * 0.5,
    },
    /*thumb: {
      height: thumbSize,
      width: thumbSize,
      marginTop: barHeight * -0.33,
      opacity: 0.4,
      marginLeft: thumbSize * -0.5
    },*/
    thumb: {
      display: "none"
    },
    rail: {
      height: barHeight
    },
    header: {
      textAlign: "center",
      textTransform: "uppercase",
      color: "#616161",
    },
    h6: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(0),
      color: "#616161",
      fontSize: "1rem",
      textTransform: "uppercase"
    }
  }
}

const TideSlider = (props) => {
  if (props.data.loading) {
    return "Loading..."
  }
  const classes = props.classes;
  const lowtide = props.data.Wave_Ratings_aggregate.aggregate.avg.lowtide
  const hightide = props.data.Wave_Ratings_aggregate.aggregate.avg.hightide
  return (
    <div>
      <Typography className={`${classes.header} ${classes.h6}`}>Ideal Tide Range</Typography>
      <Slider marks={tideMarks} value={[lowtide, hightide]} classes={{...classes}} />
    </div>
  )
}

export default graphql(gql`${FETCH_TIDES}`, {
  options: (props) => {return {variables: {id: props.waveId}}}
})(withStyles(styles)(TideSlider))
