import React, {Component, Fragment} from 'react';
import ReactMapGL, {Marker, NavigationControl} from 'react-map-gl';
import {MAPTOKEN} from "../utils/token";
import { graphql } from 'react-apollo';
import gql from "graphql-tag";
import Pin from "./Pin";
import {FETCH_AREA_SPOTS} from "../utils/queries";

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
      <Marker key={spotAttributes.id} longitude={spotAttributes.longitude} latitude={spotAttributes.latitude}>
        <Pin size={20} />
      </Marker>
    );
  }

  render() {
    if (!this.props.data.Locations) {
      return "Loading"
    }
    console.log("wavearea", this.props)
    console.log("wavearea", this.state)
    return (
      <ReactMapGL
        {...this.state.viewport}
        latitude={this.props.data.Locations[0].latitude}
        longitude={this.props.data.Locations[0].longitude}
        mapboxApiAccessToken={MAPTOKEN}
        mapStyle={MAP_STYLE}
      >
        {
          this.props.data.Locations.map(location => {
            return this._renderSpotMarker(location);
          })
        }

      </ReactMapGL>
    )
  }
}

export default graphql(gql`${FETCH_AREA_SPOTS}`, {
  options: (props) => {return {variables: {areaName: props.match.params.areaName} } }
})(AreaMap)
