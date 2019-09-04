import React, {Component, Fragment} from 'react';
import ReactMapGL, {Marker, NavigationControl} from 'react-map-gl';
import {MAPTOKEN} from "../utils/token";
import { graphql } from 'react-apollo';
import gql from "graphql-tag";
import Pin from "./Pin";
import AreaMap from "./AreaMap";
import {FETCH_AREA_LOCATION_DATA} from "../utils/queries";

const MAP_STYLE = 'mapbox://styles/mapbox/streets-v11';

class Area extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (!this.props.data.Locations) {
      return "Loading"
    }

    return (
      <div>
        <p>Area</p>
        <AreaMap areaSpots={this.props.data.Locations} />
      </div>
    )
  }
}

export default graphql(gql`${FETCH_AREA_LOCATION_DATA}`, {
  options: (props) => {return {variables: {areaName: props.match.params.areaName} } }
})(Area)
