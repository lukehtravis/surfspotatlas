import React, {Component} from "react";
import {graphql} from "react-apollo";
import gql from "graphql-tag";
import LocationSearchFilters from "./LocationSearchFilters";
import WaveQualityFilters from "./WaveQualityFilters";
import SearchedSpots from "./SearchedSpots"


const SearchFilters = (props) => {
  return (
    <div>
      <LocationSearchFilters />
      <WaveQualityFilters />
      <SearchedSpots />
    </div>
  )
}

export default
