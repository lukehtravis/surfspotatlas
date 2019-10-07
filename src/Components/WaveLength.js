import React, {Component} from "react";
import PercentageCircle from "./PercentageCircle";
import {FETCH_WAVE_LENGTH} from "../utils/queries";
import {graphql} from "react-apollo";
import gql from "graphql-tag";

const WaveLength = (props) => {

  const waveLength = props.attributeValue

  return(
    <div>
      <PercentageCircle radius={50} percent={waveLength} >
        <p>Wave Length</p>
        <span>{waveLength}</span>
      </PercentageCircle>
    </div>
  )
}

export default WaveLength
