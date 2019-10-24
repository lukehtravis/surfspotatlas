import React, {Component} from "react";
import {graphql} from "react-apollo";
import gql from "graphql-tag";
import {FETCH_SEARCHED_SPOTS} from "../utils/queries";
import SearchedSpotsTable from "./SearchedSpotsTable"

class SearchedSpotsList extends Component {

  render() {
    if (!this.props.spots) {
      return "Loading..."
    }

    const spots = this.props.spots.map(spot => {
      return {
        id: spot.Wave.id,
        name: spot.Wave.name,
        direction: spot.Wave.wavedirection,
        bathymetry: spot.Wave.bathymetry,
        quality: spot.Wave.Wave_Ratings_aggregate.aggregate.avg.wavequality,
        danger: spot.Wave.Wave_Ratings_aggregate.aggregate.avg.wavedanger,
        area: spot.area
      }
    })
    return(
      <div>
        <SearchedSpotsTable spots={spots} />
      </div>
    )
  }
}

export default SearchedSpotsList;
