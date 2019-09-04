import React, {Component, Fragment} from 'react';
import ReactMapGL, {Marker, NavigationControl} from 'react-map-gl';
import {MAPTOKEN} from "../utils/token";
import { graphql } from 'react-apollo';
import gql from "graphql-tag";
import Pin from "./Pin";
import {FETCH_SPOT_FROM_LOCATIONID} from "../utils/queries";
import SpotMarker from "./SpotMarker";

const MAP_STYLE = 'mapbox://styles/mapbox/streets-v11';

class AreaMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        width: 400,
        height: 400,
        zoom: 10,
      },
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

  _renderSpotMarker = (spotAttributes) => {
    console.log("inside state func", spotAttributes)
    return (
      <SpotMarker key={spotAttributes.id} id={spotAttributes.id} longitude={spotAttributes.longitude} latitude={spotAttributes.latitude}>
        <Pin size={20} />
      </SpotMarker>
    );
  }

  render() {
    if (!this.props.areaSpots) {
      return "Loading"
    }
    console.log("wavearea", this.props)
    console.log("wavearea", this.state)
    return (
      <ReactMapGL
        {...this.state.viewport}
        latitude={this.props.areaSpots[0].latitude}
        longitude={this.props.areaSpots[0].longitude}
        mapboxApiAccessToken={MAPTOKEN}
        mapStyle={MAP_STYLE}
      >
        {
          this.props.areaSpots.map(location => {
            return this._renderSpotMarker(location);
          })
        }

      </ReactMapGL>
    )
  }
}

export default AreaMap
