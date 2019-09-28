import React, {Component} from "react";
import {graphql} from "react-apollo";
import gql from "graphql-tag";
import {FETCH_SEARCHED_SPOTS} from "../utils/queries";
import SearchedSpotsList from "./SearchedSpotsList";
import SearchMap from "./SearchMap";

class SearchedSpots extends Component {
  render(){
    if (this.props.data.loading) {
      return "Loading"
    }

    // Check if filteredResults object is empty
    if  (!Object.keys(this.props.filterResults).length) {
      return "Choose a few areas where you would like to look at the spots";
    }

    const waveQualityLow = this.props.filterResults.waveQuality.low
    const waveQualityHigh = this.props.filterResults.waveQuality.high
    const waveDangerLow = this.props.filterResults.waveDanger.low
    const waveDangerHigh = this.props.filterResults.waveDanger.high
    const spots = this.props.data.Locations
    // Add property to spot object that enumerates whether it meets the quality criteria set by filters
    spots.map(spot => {
      if (
        (spot.Wave.Wave_Ratings_aggregate.aggregate.avg.wavequality >= waveQualityLow && spot.Wave.Wave_Ratings_aggregate.aggregate.avg.wavequality <= waveQualityHigh)
        &&
        (spot.Wave.Wave_Ratings_aggregate.aggregate.avg.wavedanger >= waveDangerLow && spot.Wave.Wave_Ratings_aggregate.aggregate.avg.wavedanger <= waveDangerHigh)) {
           return spot.chosen = true
          } else {
           return spot.chosen = false
          }
      })

    let coordAverages = {}

    const mapMarkerInfo = spots.map(spot => {
      return {
        latitude: spot.latitude,
        longitude: spot.longitude,
        id: spot.Wave.id,
        name: spot.Wave.name,
        waveDirection: spot.Wave.wavedirection,
        waveType: spot.wavetype,
        waveQuality: spot.Wave.Wave_Ratings_aggregate.aggregate.avg.wavequality
      }
    })

    for (var i = 0; i < mapMarkerInfo.length; i++) {
      if (!Object.keys(coordAverages).length) {
        coordAverages.latLow = mapMarkerInfo[i].latitude
        coordAverages.latHigh = mapMarkerInfo[i].latitude
        coordAverages.longLow = mapMarkerInfo[i].longitude
        coordAverages.longHigh = mapMarkerInfo[i].longitude
      }
      if (mapMarkerInfo[i].latitude < coordAverages.latLow) {
        coordAverages.latLow = mapMarkerInfo[i].latitude
      }
      if (mapMarkerInfo[i].latitude > coordAverages.latHigh) {
        coordAverages.latHigh = mapMarkerInfo[i].latitude
      }
      if (mapMarkerInfo[i].longitude < coordAverages.longLow) {
        coordAverages.longLow = mapMarkerInfo[i].longitude
      }
      if (mapMarkerInfo[i].longitude > coordAverages.longHigh) {
        coordAverages.longHigh = mapMarkerInfo[i].longitude
      }
    }
    return(
      <div>
        <SearchMap areaSpots={mapMarkerInfo} coordAverages={coordAverages} />
        <SearchedSpotsList
          spotId={spots}
        />
      </div>
    )
  }
}

export default graphql(gql`${FETCH_SEARCHED_SPOTS}`, {
  options: (props) => {return {variables: {listOfAreas: props.filterResults.areas}}}
})(SearchedSpots);
