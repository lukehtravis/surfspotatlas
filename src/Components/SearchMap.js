import React, {Component, Fragment} from 'react';
import ReactMapGL, {Marker, Popup, NavigationControl} from 'react-map-gl';
import {MAPTOKEN} from "../utils/token";
import { graphql } from 'react-apollo';
import gql from "graphql-tag";
import Pin from "./Pin";
import {FETCH_SPOT_FROM_LOCATIONID} from "../utils/queries";
import SpotMarker from "./SpotMarker";
import WavePopup from "./WavePopup";
import SearchMapPin from "./SearchMapPin";
import {mapNavStyle} from "../utils/styleComponents"

/*
  Map that appears on the search page of the application (Search.js)
*/

const MAP_STYLE = 'mapbox://styles/mapbox/streets-v11';

class SearchMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        width: "100%",
        height: 400,
        zoom: 5,
        latitude: (this.props.coordAverages.latHigh + this.props.coordAverages.latLow) / 2,
        longitude: (this.props.coordAverages.longHigh + this.props.coordAverages.longLow) / 2,
      },
      popupInfo: null
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
    this.setState({viewport});
  };

  onMarkerDragEnd = (event) => {

  };

  pinClick = (attributes) => {
    this.setState({popupInfo: attributes})
  }

  _renderSpotMarker = (spotAttributes) => {
    console.log("searchMap", spotAttributes)
    return (
      <Marker longitude={spotAttributes.longitude} latitude={spotAttributes.latitude}>
          <SearchMapPin spotClick={this.pinClick} waveName={spotAttributes.name} waveQuality={spotAttributes.waveQualty} waveType={spotAttributes.waveType} waveDirection={spotAttributes.waveDirection} longitude={spotAttributes.longitude} latitude={spotAttributes.latitude} id={spotAttributes.id} />
      </Marker>
    );
  }

  _renderWavePopup() {
    const {popupInfo} = this.state;
    return (
      popupInfo && (
        <Popup
          tipSize={5}
          anchor="top"
          longitude={popupInfo.longitude}
          latitude={popupInfo.latitude}
          closeOnClick={false}
          onClose={() => this.setState({popupInfo: null})}
        >
          <WavePopup waveDetails={popupInfo} />
        </Popup>
      )
    )
  }

  render() {
    const {longitude, latitude} = this.state
    return (
      <ReactMapGL
        {...this.state.viewport}
        onViewportChange={(viewport) => this.setState({viewport})}
        mapboxApiAccessToken={MAPTOKEN}
        mapStyle={MAP_STYLE}
      >
        {
          this.props.areaSpots.map(location => {
            return this._renderSpotMarker(location);
          })
        }
        {this._renderWavePopup()}
        <div className="nav" style={mapNavStyle}>
          <NavigationControl onViewportChange={this._updateViewport} />
        </div>
      </ReactMapGL>
    )
  }
}

export default SearchMap
