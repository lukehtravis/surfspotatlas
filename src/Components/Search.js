import React, {Component} from "react";
import {graphql} from "react-apollo";
import gql from "graphql-tag";
import LocationSearchFilters from "./LocationSearchFilters";
import SearchedSpots from "./SearchedSpots";
import WaveQualityFilters from "./WaveQualityFilters";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    return (
      <div>
        <LocationSearchFilters />
        <WaveQualityFilters />
        <SearchedSpots />
      </div>
    )
  }
}

export default Search
