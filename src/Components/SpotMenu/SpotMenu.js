import React, {Component} from "react";
import {graphql} from "react-apollo";
import gql from "graphql-tag";
import {FETCH_LOCATION_CATEGORIES} from "../../utils/queries";
import SpotChooser from "./SpotChooser";

class SpotMenu extends Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
      <div>
        <SpotChooser />
        <SpotChooser />
      </div>
    )
  }
}

export default graphql(gql`${FETCH_LOCATION_CATEGORIES}`)(SpotMenu)
