import React, {Component} from "react";
import {graphql} from "react-apollo";
import gql from "graphql-tag";
import LocationSearchFilters from "./LocationSearchFilters";
import WaveQualityFilters from "./WaveQualityFilters";
import SearchedSpots from "./SearchedSpots";

// This component get information from the WaveQualityFilters component whenever
// a user changes one of the form inputs, and stores it in local state so that
// user can submit them all at once whenever they choose. When submit button is
// pressed, the state is sent back up the chain to the Search.js component.

class SearchFilters extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  // We must use a different function for each wave attribute because material ui
  // doesnt send information about which thing was clicked through the event handdler
  handleWaveQualityChange = (event, newValue) => {
    console.log(event.target)
    this.setState({waveQuality: {low: newValue[0], high: newValue[1]}})
  };

  handleWaveDangerChange = (event, newValue) => {
    this.setState({waveDanger: {low: newValue[0], high: newValue[1]}})
  }

  handleAreaChange = (areas) => {
    this.setState({areas: areas})
  }

  render() {
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
