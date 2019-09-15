import React, {Component} from "react";
import Canvas from "./Canvas";
import {graphql} from "react-apollo";
import gql from "graphql-tag";
import {FETCH_WIND_ANGLES} from "../utils/queries";
import ReactSVG from 'react-svg';
import "../css/Compass.css"

const WindAngle = (props) => {
  const loading = props.data.loading
  if (loading) {
    return "Loading..."
  }
  const windAngleOne = props.data.Wave_Ratings_aggregate.aggregate.avg.windangleone
  const windAngleTwo = props.data.Wave_Ratings_aggregate.aggregate.avg.windangletwo
  console.log("windangles", props, windAngleOne, windAngleTwo)
  return (
    <div className="compass">
      <span className="north">0</span>
      <span className="east">90</span>
      <span className="south">180</span>
      <span className="west">270</span>
      <svg width={100} height={100}>
         <circle r={48} cx={50} cy={50} fill="transparent" stroke="#133C99" strokeWidth={6} strokeDasharray="1% 24%" />
      </svg>
      <Canvas windAngleOne={windAngleOne} windAngleTwo={windAngleTwo} />
    </div>
  )
}

export default graphql(gql`${FETCH_WIND_ANGLES}`, {
  options: (props) => {return {variables: {id: props.waveId}}}
})(WindAngle);
