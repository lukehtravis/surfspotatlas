import React, {Component} from "react";
import {graphql} from "react-apollo";
import gql from "graphql-tag";
import {FETCH_SEARCHED_SPOTS} from "../utils/queries"

class SearchedSpotsList extends Component {
  render(){
    return(
      <div>Searched Spots Component</div>
    )
  }
}

export default graphql(gql`${FETCH_SEARCHED_SPOTS}`, {
  options: (props) => {return {variables: {searchedSpotsList: props.spots, waveQualityLow: props.waveQualityLow, waveQualityHigh: props.waveQualityHigh, waveDangerLow: props.waveDangerLow, waveDangerHigh: props.waveDangerHigh}}}
})(SearchedSpotsList);
