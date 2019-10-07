import React, {Component} from "react";
import ApolloClient from "apollo-boost";
import {graphql} from "react-apollo";
import gql from "graphql-tag";
import {WAVE_DANGER} from "../utils/queries";
import PercentageCircle from './PercentageCircle';

const WaveDanger = (props) => {

  const waveDanger = props.attributeValue

  return (
    <div>
      <PercentageCircle radius={50} percent={waveDanger}>
        <p>Danger</p>
        <span>{waveDanger}%</span>
      </PercentageCircle>
    </div>
  )
}

export default WaveDanger
