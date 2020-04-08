import React, {Component, useState} from "react";
import PropTypes from "prop-types";
import SearchFilters from "./SearchFilters";
import SearchedSpots from "./SearchedSpots";

const Search = () => {
  const [filters, setFilters] = useState({});
  const handleSubmit = (searchFilters, event) => {
    event.preventDefault();
    if (searchFilters.waveDanger === undefined) {
      searchFilters.waveDanger = {low: 1, high: 100}
    }
    if (searchFilters.waveQuality === undefined) {
      searchFilters.waveQuality = {low: 1, high: 100}
    }
    setFilters(searchFilters)
  }
  
  return (
    <div>
      <SearchFilters formSubmit={handleSubmit} />
      <SearchedSpots filterResults={filters} />
    </div>
  )
}

Search.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
}

export default Search
