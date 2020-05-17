import React, {Component} from 'react';
import ReactMapGL, {Popup} from 'react-map-gl';
import {MAPTOKEN} from "../utils/token";
import SpotMarker from "./SpotMarker";
import WavePopup from "./WavePopup";

const MAP_STYLE = 'mapbox://styles/mapbox/streets-v11';

class AreaMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        width: "100%",
        height: 400,
        zoom: 10,
        latitude: this.props.areaSpots[0].latitude,
        longitude: this.props.areaSpots[0].longitude
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
    console.log("_renderSpotMarker", spotAttributes)
    return (
      <SpotMarker key={spotAttributes.id} id={spotAttributes.id} longitude={spotAttributes.longitude} pinEvent={this.pinClick} latitude={spotAttributes.latitude}>

      </SpotMarker>
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
    if (!this.props.areaSpots) {
      return "Loading"
    }
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
      </ReactMapGL>
    )
  }
}

export default AreaMap
