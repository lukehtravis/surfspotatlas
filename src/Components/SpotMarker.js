import React, {Component, Fragment} from 'react';
import ReactMapGL, {Marker, NavigationControl} from 'react-map-gl';
import { graphql } from 'react-apollo';
import gql from "graphql-tag";
import Pin from "./Pin";
import WavePin from "./WavePin";
import {FETCH_SPOT_FROM_LOCATIONID} from "../utils/queries";

class SpotMarker extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    if (!this.props.data.Waves) {
      return "Loading..."
    }
    const wave = this.props.data.Waves[0]
    return (
      <Marker longitude={this.props.longitude} latitude={this.props.latitude}>
        <WavePin size={20} waveName={wave.name} waveDirection={wave.wavedirection} waveType={wave.wavetype} longitude={this.props.longitude} latitude={this.props.latitude} id={this.props.id} pinEvent={this.props.pinEvent} />
      </Marker>
    )
  }
}

export default graphql(gql`${FETCH_SPOT_FROM_LOCATIONID}`, {
  options: (props) => {return {variables: {locationId: props.id}}}
})(SpotMarker)
