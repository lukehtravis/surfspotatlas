import React, {Component} from "react";
import PropTypes from "prop-types";
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
    if (searchFilters.waveDanger === undefined) {
      searchFilters.waveDanger = {low: 1, high: 100}
    }
    if (searchFilters.waveQuality === undefined) {
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

Search.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
}

export default Search
