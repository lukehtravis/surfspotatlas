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
    console.log(this.props)
    const spots = this.props.data.Locations.map(location => location.Wave.id)
    return(
      <div>
        <SearchedSpotsList
          spotId={spots}
          waveQualityLow={this.props.filterResults.waveQualityLow}
          waveQualityHigh={this.props.filterResults.waveQualityHigh}
          waveDangerLow={this.props.filterResults.waveDangerLow}
          waveDangerHigh={this.props.filterResults.waveDangerHigh}
        />
      </div>
    )
  }
}

export default graphql(gql`${FETCH_CHOSEN_AREAS}`, {
  options: (props) => {return {variables: {listOfAreas: props.filterResults.areas}}}
})(SearchedSpots);
