import React, {Component, Fragment} from 'react';
import ReactMapGL, {Marker, NavigationControl} from 'react-map-gl';
import {MAPTOKEN} from "../utils/token";
import Pin from "./Pin";

const MAP_STYLE = 'mapbox://styles/mapbox/streets-v11';

class WaveMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        width: 400,
        height: 400,
        zoom: 2
      },
      marker: {
        longitude: this.props.long,
        latitude: this.props.lat
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
    return (
      <ReactMapGL
        {...this.state.viewport}
        mapboxApiAccessToken={MAPTOKEN}
        mapStyle={MAP_STYLE}
      >
        <Marker
          longitude={this.state.marker.longitude}
          latitude={this.state.marker.latitude}>
          <Pin size={20} />
        </Marker>
      </ReactMapGL>
    )
  }
}

export default WaveMap
