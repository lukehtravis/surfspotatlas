import React, {Component} from "react";
import Canvas from "./Canvas";
import {graphql} from "react-apollo";
import gql from "graphql-tag";
import {FETCH_WIND_ANGLES} from "../utils/queries"

const WindAngle = (props) => {
  const loading = props.data.loading
  if (loading) {
    return "Loading..."
  }
  const windAngleOne = props.data.Wave_Ratings_aggregate.aggregate.avg.windangleone
  const windAngleTwo = props.data.Wave_Ratings_aggregate.aggregate.avg.windangletwo
  console.log("windangles", props, windAngleOne, windAngleTwo)
  return (
    <div>
      <Canvas windAngleOne={windAngleOne} windAngleTwo={windAngleTwo} />
    </div>
  )
}

export default graphql(gql`${FETCH_WIND_ANGLES}`, {
  options: (props) => {return {variables: {id: props.waveId}}}
})(WindAngle);
