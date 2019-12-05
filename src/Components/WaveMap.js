import React, {Component} from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';
import {MAPTOKEN} from "../utils/token";
import { graphql } from 'react-apollo';
import gql from "graphql-tag";
import Pin from "./Pin";
import {FETCH_LOCATION} from "../utils/queries";

/*
  This map appears on the Wave.js component, and renders a of one specific wave
*/

const MAP_STYLE = 'mapbox://styles/mapbox/streets-v11';

class WaveMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        width: "100%",
        height: 400,
        zoom: 10,
      },
      marker: {
        longitude: 10,
        latitude: 10
      }
    };
  }

  handleClick = (event) => {

  };

  onMarkerDragStart = (event) => {
    //this._logDragEvent('onDragStart', event);
  };

  onMarkerDrag = (event) => {
  //  this._logDragEvent('onDrag', event);
  };

  _updateViewport = viewport => {

  };

  onMarkerDragEnd = (event) => {

  };

  render() {
    if (!this.props.data.Locations) {
      return "Loading"
    }
    console.log("wavemap", this.props)
    console.log("wavestate", this.state)
    return (
      <ReactMapGL
        {...this.state.viewport}
        latitude={this.props.data.Locations[0].latitude}
        longitude={this.props.data.Locations[0].longitude}
        mapboxApiAccessToken={MAPTOKEN}
        mapStyle={MAP_STYLE}
      >
        <Marker
          id={this.props.waveId}
          longitude={this.props.data.Locations[0].longitude}
          latitude={this.props.data.Locations[0].latitude}
        >
            <Pin />
        </Marker>
      </ReactMapGL>
    )
  }
}

export default graphql(gql`${FETCH_LOCATION}`, {
  options: (props) => {return {variables: {id: props.locationId} } }
})(WaveMap)
