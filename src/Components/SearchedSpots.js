import React, {Component} from "react";
import {graphql} from "react-apollo";
import gql from "graphql-tag";
import {FETCH_SEARCHED_SPOTS} from "../utils/queries";
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
    console.log("SearchedSpos : filterResults", this.props.filterResults)
    const spots = this.props.data.Locations
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

export default graphql(gql`${FETCH_SEARCHED_SPOTS}`, {
  options: (props) => {return {variables: {listOfAreas: props.filterResults.areas}}}
})(SearchedSpots);
