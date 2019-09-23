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
    this.setState({searchFilters})
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
