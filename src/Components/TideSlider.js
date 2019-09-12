import React, {Component} from "react";
import {graphql} from "react-apollo";
import gql from "graphql-tag";
import Slider from '@material-ui/core/Slider';
import {FETCH_TIDES} from '../utils/queries';

const TideSlider = (props) => {
  if (props.data.loading) {
    return "Loading..."
  }

  const lowtide = props.data.Wave_Ratings_aggregate.aggregate.avg.lowtide
  const hightide = props.data.Wave_Ratings_aggregate.aggregate.avg.hightide
  return (
    <Slider value={[lowtide, hightide]} valueLabelDisplay="on" getAriaValueText={(value, index) => {console.log(value, index)}} />
  )
}

export default graphql(gql`${FETCH_TIDES}`, {
  options: (props) => {return {variables: {id: props.waveId}}}
})(TideSlider)
