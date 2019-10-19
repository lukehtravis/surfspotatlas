import React, {Component} from "react";
import {graphql} from "react-apollo";
import gql from "graphql-tag";
import LocationSearchFilters from "./LocationSearchFilters";
import WaveQualityFilters from "./WaveQualityFilters";
import SearchedSpots from "./SearchedSpots";


class SearchFilters extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  handleWaveQualityChange = (event, newValue) => {
    this.setState({waveQuality: {low: newValue[0], high: newValue[1]}})
  };

  handleWaveDangerChange = (event, newValue) => {
    this.setState({waveDanger: {low: newValue[0], high: newValue[1]}})
  }

  handleAreaChange = (areas) => {
    this.setState({areas: areas})
  }

  render() {
    console.log("SearchFilters State", this.state);
    return (
      <div>
        <form>
          <LocationSearchFilters handleAreaChange={this.handleAreaChange} />
          <WaveQualityFilters handleWaveQualityChange={this.handleWaveQualityChange} handleWaveDangerChange={this.handleWaveDangerChange} />
          <button onClick={(event) => this.props.formSubmit(this.state, event)} />
        </form>
      </div>
    )
  }
}

export default SearchFilters
