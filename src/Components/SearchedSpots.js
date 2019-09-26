import React, {Component} from "react";
import {graphql} from "react-apollo";
import gql from "graphql-tag";
import {FETCH_CHOSEN_AREAS} from "../utils/queries";
import SearchedSpotsList from "./SearchedSpotsList";

class SearchedSpots extends Component {
  render(){
    if (this.props.data.loading) {
      return "Loading"
    }
    
    // Check if filteredResults object is empty
    if  (!Object.keys(this.props.filterResults).length) {
      return "No Spots Found yet";
    }

    const spots = this.props.data.Locations.map(location => location.Wave.id)
    return(
      <div>
        <SearchedSpotsList
          spotId={spots}
          waveQualityLow={this.props.filterResults.waveQuality.low}
          waveQualityHigh={this.props.filterResults.waveQuality.high}
          waveDangerLow={this.props.filterResults.waveDanger.low}
          waveDangerHigh={this.props.filterResults.waveDanger.high}
        />
      </div>
    )
  }
}

export default graphql(gql`${FETCH_CHOSEN_AREAS}`, {
  options: (props) => {return {variables: {listOfAreas: props.filterResults.areas}}}
})(SearchedSpots);
