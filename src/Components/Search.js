import React, {Component} from "react";
import {graphql} from "react-apollo";
import gql from "graphql-tag";
import SearchFilters from "./SearchFilters";
import SearchedSpots from "./SearchedSpots";
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    return (
      <div>
        <SearchFilters />
        <SearchedSpots />
      </div>
    )
  }
}

export default Search
