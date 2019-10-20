import React, {Component} from "react";
import {graphql} from "react-apollo";
import gql from "graphql-tag";
import LocationSearchFilters from "./LocationSearchFilters";
import SearchFilters from "./SearchFilters";
import SearchedSpots from "./SearchedSpots";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  handleSubmit = (searchFilters, event) => {
    event.preventDefault();
    console.log("searchFilters", searchFilters)
    if (searchFilters.waveDanger == undefined) {
      searchFilters.waveDanger = {low: 1, high: 100}
    }
    if (searchFilters.waveQuality == undefined) {
      searchFilters.waveQuality = {low: 1, high: 100}
    }
    this.setState(searchFilters)
  }
  render() {
    return (
      <div>
        <SearchFilters formSubmit={this.handleSubmit} />
        <SearchedSpots filterResults={this.state} />
      </div>
    )
  }
}

export default Search
