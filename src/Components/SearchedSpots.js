import React, {Component} from "react";
import {graphql} from "react-apollo";
import gql from "graphql-tag";
import {FETCH_SEARCHED_SPOTS} from "../utils/queries";
import SearchedSpotsList from "./SearchedSpotsList";
import SearchMap from "./SearchMap";

// This component triggers the FETCH_SEARCHED_SPOTS graphql query, which takes in
// a variable of the area(s) a user chose to explore (see SearchFilters component),
// and returns a list of ALL spots in those areas. It then proceeds to run those spots
// through a series of functions that filter user-generated filters (also see SearchFilters component)
// Finally, the filtered array of spots, as well as a calculated default zoom for the SearchMap's initial
// state, are sent to SearchMap

class SearchedSpots extends Component {
  render(){
    if (this.props.data.loading) {
      return "Loading"
    }

    // Check if filteredResults object is empty. Necessary to keep the Component
    // from returning an error the first time the page loads (before user has filled out the forms that generate this data)
    if  (!Object.keys(this.props.filterResults).length) {
      return "";
    }

    // Low and High Quality and Danger props are passed down from the Search.js Component
    // These represent the value ranges specified in the slider inputs in the LocationSearchFilters component
    const waveQualityLow = this.props.filterResults.waveQuality.low
    const waveQualityHigh = this.props.filterResults.waveQuality.high
    const waveDangerLow = this.props.filterResults.waveDanger.low
    const waveDangerHigh = this.props.filterResults.waveDanger.high

    // This is the data returned from the FETCH_SEARCHED_SPOTS mutation
    const spots = this.props.data.Locations

    // Inside of this map function, a property is added to each spot object
    // which enumerates whether it meets the quality criteria set by filters
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

    // This value will be passed to the SearchMap component.
    // This value must be created because we need a way to determine latitude and longitude
    // zoom boundaries for our map, without knowing beforehand what range of spots users will
    // be looking at.
    let coordAverages = {}

    // mapMarkerInfo is an array of objects.
    // We map over the existing spots array so that we can refine the objects that
    // we will be sending to the _renderSpotMarker function in SearchMap
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

    // Here we browse through the spots, and determine which spots represent the
    // farthest north, south, east, and west point of all the searched spots, and
    // we put those points into variables that are passed on to SearchMap, which
    // uses the points to find average latitude and longitude values to use for a
    // initial zoom setting on the map
    for (var i = 0; i < mapMarkerInfo.length; i++) {
      // This initiates the loop. If coordAverages is empty, then this is the first item in the loop
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
