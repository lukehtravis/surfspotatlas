import React, {Component} from "react";
import {graphql} from "react-apollo";
import gql from "graphql-tag";
import SearchFilters from "./SearchFilters";
import SearchedSpots from "./SearchedSpots";
import AreaMap from "./AreaMap";
class Search extends Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
      <div>
        <AreaMap />
        <SearchFilters />
        <SearchedSpots />
      </div>
    )
  }
}

export default Search
