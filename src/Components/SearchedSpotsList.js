import React, {Component} from "react";
import {graphql} from "react-apollo";
import gql from "graphql-tag";
import {FETCH_SEARCHED_SPOTS} from "../utils/queries"

class SearchedSpotsList extends Component {

  render() {
    if (!this.props.spotId) {
      return "Loading..."
    }

    const spots = this.props.spotId.map(spot => {
      return {
        area: spot.area,
        name: spot.Wave.name,
        direction: spot.Wave.wavedirection,
        bathymetry: spot.Wave.bathymetry,
        quality: spot.Wave.Wave_Ratings_aggregate.aggregate.avg.wavequality,
        danger: spot.Wave.Wave_Ratings_aggregate.aggregate.avg.wavedanger
      }
    })
    return(
      <div>
        {spots.map(spot => {
          return <div>{spot.name} {spot.area}</div>
        })}
      </div>
    )
  }
}

export default SearchedSpotsList;
