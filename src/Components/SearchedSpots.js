import React, {Component} from "react";
import {graphql} from "react-apollo";
import gql from "graphql-tag";
import {FETCH_CHOSEN_AREAS} from "../utils/queries"

class SearchedSpots extends Component {
  render(){
    return(
      <div>Searched Spots Component</div>
    )
  }
}

export default graphql(gql`${FETCH_CHOSEN_AREAS}`, {
  options: (props) => {return {variables: {listOfAreas: props.filterResults.areas}}}
})(SearchedSpots);
