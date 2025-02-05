import React, {Component} from 'react';
import {graphql} from "react-apollo";
import gql from "graphql-tag";
import {FETCH_WAVE_QUALITY} from "../utils/queries"

const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

const pinStyle = {
  fill: '#d00',
  stroke: 'none'
};

class WavePin extends Component {
  render() {
    if (this.props.data.loading) {
      return "Loading..."
    }
    const {size = 20} = this.props;
    const waveQuality = this.props.data.Wave_Ratings_aggregate.aggregate.avg.wavequality
    const {id, waveName, waveDirection, longitude, latitude, waveType} = this.props
    return (
      <svg
        height={size}
        viewBox="0 0 24 24"
        style={pinStyle}
        onClick={() => this.props.pinEvent({id, longitude, latitude, waveName, waveQuality, waveDirection, waveType})}
      >
        <path d={ICON}/>
      </svg>
    );
  }
}
export default graphql(gql`${FETCH_WAVE_QUALITY}`, {
  options: (props) => {return {variables: {id: props.id}}}
})(WavePin)
