import React, {Component, Fragment} from 'react';
import ReactMapGL, {Marker, NavigationControl} from 'react-map-gl';
import { graphql } from 'react-apollo';
import gql from "graphql-tag";
import Pin from "./Pin";
import {FETCH_SPOT_FROM_LOCATIONID} from "../utils/queries";

class SpotMarker extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log("inside spot marker", this.props)
    if (!this.props.data) {
      return "Loading..."
    }
    console.log("inside spot marker", this.props)
    return (
      <Marker longitude={this.props.longitude} latitude={this.props.latitude}>
        <Pin size={20} />
      </Marker>
    )
  }
}

export default graphql(gql`${FETCH_SPOT_FROM_LOCATIONID}`, {
  options: (props) => {return {variables: {locationId: props.id}}}
})(SpotMarker)
