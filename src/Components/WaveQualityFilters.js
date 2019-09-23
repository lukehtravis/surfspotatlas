import React, {Component} from "react";
import {graphql} from "react-apollo";
import gql from "graphql-tag";
import Slider from '@material-ui/core/Slider';
import {waveQualityMarks} from "../utils/labels";


class WaveQualityFilters extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  handleWaveQualityChange = (event, newValue) => {
    this.setState({waveQuality: {low: newValue[0], high: newValue[1]}})
  };

  handleWaveDangerChange = (event, newValue) => {
    this.setState({waveDanger: {low: newValue[0], high: newValue[1]}})
  }

  render() {

    return (
      <div>
        <form>
          <Slider
            id="waveQuality"
            marks={waveQualityMarks}
            valueLabelDisplay="on"
            defaultValue={[20, 80]}
            onChange={this.props.handleWaveQualityChange}
          />
          <Slider
            id="waveDanger"
            marks={waveQualityMarks}
            valueLabelDisplay="on"
            defaultValue={[20, 80]}
            onChange={this.props.handleWaveDangerChange}
          />

        </form>
      </div>
    )
  }

}

export default WaveQualityFilters
