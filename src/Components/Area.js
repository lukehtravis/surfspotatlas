import React, {Component, Fragment} from 'react';
import ReactMapGL, {Marker, NavigationControl} from 'react-map-gl';
import {MAPTOKEN} from "../utils/token";
import { graphql } from 'react-apollo';
import gql from "graphql-tag";
import Pin from "./Pin";
import AreaMap from "./AreaMap";
import AreaTable from "./AreaTable";
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
    let mapLocations = this.props.data.Locations.map(location => {
      return {id: location.id, latitude: location.latitude, longitude: location.longitude}
    })
    let tableLocations = this.props.data.Locations.map(location => {
      return {
        id: location.Wave.id,
        name: location.Wave.name,
        direction: location.Wave.wavedirection,
        bathymetry: location.Wave.bathymetry,
        quality: location.Wave.Wave_Ratings_aggregate.aggregate.avg.wavequality,
        danger: location.Wave.Wave_Ratings_aggregate.aggregate.avg.wavequality,
        area: this.props.match.params.areaName
      }
    })
    /*
    id: spot.Wave.id,
    name: spot.Wave.name,
    direction: spot.Wave.wavedirection,
    bathymetry: spot.Wave.bathymetry,
    quality: spot.Wave.Wave_Ratings_aggregate.aggregate.avg.wavequality,
    danger: spot.Wave.Wave_Ratings_aggregate.aggregate.avg.wavedanger,
    area: spot.area
    */
    return (
      <div>
        <p>Area</p>
        <AreaMap areaSpots={mapLocations} />
        <AreaTable spots={tableLocations} />
      </div>
    )
  }
}

export default graphql(gql`${FETCH_AREA_LOCATION_DATA}`, {
  options: (props) => {return {variables: {areaName: props.match.params.areaName} } }
})(Area)
/*
{
  "data": {
    "Locations": [
      {
        "latitude": 32.9975969236175,
        "longitude": -117.27655321564285,
        "id": 36,
        "Wave": {
          "name": "tabletops",
          "Wave_Ratings_aggregate": {
            "aggregate": {
              "avg": {
                "wavequality": 80,
                "wavedanger": 54
              }
            }
          },
          "bathymetry": "reef",
          "wavedirection": "left",
          "id": 40
        }
      },
      {
        "latitude": 33.03498381683269,
        "longitude": -117.29280788193414,
        "id": 35,
        "Wave": {
          "name": "Swamis",
          "Wave_Ratings_aggregate": {
            "aggregate": {
              "avg": {
                "wavequality": 64.66666666666667,
                "wavedanger": 74
              }
            }
          },
          "bathymetry": "sand-reef",
          "wavedirection": null,
          "id": 39
        }
      }
    ]
  }
}
*/
