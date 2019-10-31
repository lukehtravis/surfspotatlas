import React, {Component, Fragment} from 'react';
import ReactMapGL, {Marker, NavigationControl} from 'react-map-gl';
import {MAPTOKEN} from "../utils/token";
import {geonamesLocations, GEONAME_LOGIN} from "../utils/geonames";
import Pin from "./Pin";
import {mapNavStyle} from "../utils/styleComponents";

const MAP_STYLE = 'mapbox://styles/mapbox/streets-v11';

class Map extends Component {
  state = {
    viewport: {
      width: "100%",
      height: 400,
      zoom: 2
    },
    marker: {
      longitude: 0,
      latitude: 0
    }
  };

  handleClick = (event) => {
    geonamesLocations(`http://api.geonames.org/hierarchyJSON?lat=${event.lngLat[1]}&lng=${event.lngLat[0]}&username=${GEONAME_LOGIN}`, this, event)
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
    geonamesLocations(`http://api.geonames.org/extendedFindNearbyJSON?lat=${event.lngLat[1]}&lng=${event.lngLat[0]}&username=${GEONAME_LOGIN}`, this)
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
          longitude={this.state.marker.longitude}
          latitude={this.state.marker.latitude}
          draggable
          onDragStart={this.onMarkerDragStart}
          onDrag={this.onMarkerDrag}
          onDragEnd={this.onMarkerDragEnd} >
          <Pin size={20} />
        </Marker>
        <div className="nav" style={mapNavStyle}>
          <NavigationControl onViewportChange={this._updateViewport} />
        </div>
      </ReactMapGL>
    )
  }
}

export default Map
