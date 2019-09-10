import React, {Component} from "react";
import ApolloClient from "apollo-boost";
import {graphql} from "react-apollo";
import gql from "graphql-tag";
import {WAVE_DANGER} from "../utils/queries";
import PercentageCircle from './PercentageCircle';

const WaveDanger = (props) => {
  const loading = props.data.loading;
  if (loading) {
    return "Loading..."
  }
  const waveDanger = props.data.Wave_Ratings_aggregate.aggregate.avg.wavedanger
  return (
    <div>
      <PercentageCircle radius={50} percent={waveDanger}>
        <p>Danger</p>
        <span>{waveDanger}%</span>
      </PercentageCircle>
    </div>
  )
}

export default graphql(gql`${WAVE_DANGER}`, {
  options: (props) => {return {variables: {id: props.waveId}}}
})(WaveDanger)
