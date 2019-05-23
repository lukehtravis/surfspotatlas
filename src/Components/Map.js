import React, {Component, Fragment} from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';
import {MAPTOKEN} from "../utils/token";

const MAP_STYLE = 'mapbox://styles/mapbox/streets-v11';

class Map extends Component {
  state = {
    viewport: {
      width: 400,
      height: 400,
      latitude: 37.7577,
      longitude: -122.4376,
      zoom: 8
    }
  };

  handleClick = (event) => {
    this.setState({viewport: {...this.state.viewport, longitude: event.lngLat[0], latitude: event.lngLat[1]}})
  }

  render() {
    return (
      <ReactMapGL
        {...this.state.viewport}
        onViewportChange={(viewport) => this.setState({viewport})}
        mapboxApiAccessToken={MAPTOKEN}
        mapStyle={MAP_STYLE}
        onClick={this.handleClick}
      >
        <Marker longitude={this.state.viewport.longitude} latitude={this.state.viewport.latitude} >
          <div>You are here</div>
        </Marker>

      </ReactMapGL>
    )
  }
}

export default Map
