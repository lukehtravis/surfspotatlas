import React, {Component, Fragment} from 'react';
import mapboxgl from 'mapbox-gl';
import {MAPTOKEN} from "../utils/token";

class Map extends Component {
  state = {
    lat: '',
    long: ''
  }

  componentDidMount() {
    mapboxgl.accessToken = MAPTOKEN;
    var map = new mapboxgl.Map({
    container: 'mapbox',
    style: 'mapbox://styles/mapbox/streets-v11'
    });
  }

  render() {
    return (
      <div id="mapbox"></div>
    )
  }
}

export default Map
