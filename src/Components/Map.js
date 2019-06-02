import React, {Component, Fragment} from 'react';
import ReactMapGL, {Marker, NavigationControl} from 'react-map-gl';
import {MAPTOKEN} from "../utils/token";
import Pin from "./Pin";

const MAP_STYLE = 'mapbox://styles/mapbox/streets-v11';

class Map extends Component {
  state = {
    viewport: {
      width: 400,
      height: 400,
      zoom: 2
    },
    marker: {
      longitude: 0,
      latitude: 0
    }
  };

  handleClick = (event) => {
    this.setState({viewport: {...this.state.viewport, longitude: event.lngLat[0], latitude: event.lngLat[1]}})
  }

  onMarkerDragStart = (event) => {
    //this._logDragEvent('onDragStart', event);
  };

  onMarkerDrag = (event) => {
  //  this._logDragEvent('onDrag', event);
  };

  _updateViewport = viewport => {
    this.setState({viewport});
  };

  onMarkerDragEnd = (event) => {
    //this._logDragEvent('onDragEnd', event);
    this.setState(
      {
        viewport: {
          ...this.state.viewport,
          longitude: event.lngLat[0],
          latitude: event.lngLat[1]
        },
        marker: {
          longitude: event.lngLat[0],
          latitude: event.lngLat[1]
        }
      }
    )
  };

  render() {
    return (
      <ReactMapGL
        {...this.state.viewport}
        onViewportChange={(viewport) => this.setState({viewport})}
        mapboxApiAccessToken={MAPTOKEN}
        mapStyle={MAP_STYLE}
        onClick={this.handleClick}
      >
        <Marker
          longitude={this.state.marker.longitude || 0}
          latitude={this.state.marker.latitude || 0}
          draggable
          onDragStart={this.onMarkerDragStart}
          onDrag={this.onMarkerDrag}
          onDragEnd={this.onMarkerDragEnd} >
          <Pin size={20} />
        </Marker>
        <NavigationControl onViewportChange={this._updateViewport} />
      </ReactMapGL>
    )
  }
}

export default Map
