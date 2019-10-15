import React, {Component} from "react";
import {graphql} from "react-apollo";
import gql from "graphql-tag";
import {FETCH_LOCATION} from "../utils/queries";
import {FirebaseContext} from "./Firebase";
import WaveImageGallery from "./WaveImageGallery";
import WaveImageUploader from "./WaveImageUploader";

class WaveImagesSection extends Component {
  constructor(props) {
    super(props);

  }

  render(){
    if (!this.props.data.Locations) {
      return "Loading"
    }

    const waveLocationDetails = this.props.data.Locations[0];

    return (
      <FirebaseContext.Consumer>
        {firebase => (
          <div>
            <WaveImageGallery firebase={firebase.firebase_} location={waveLocationDetails} />
            <WaveImageUploader firebase={firebase.firebase_} location={waveLocationDetails} />
          </div>
        )}
      </FirebaseContext.Consumer>
    )
  }
}

export default (graphql(gql`${FETCH_LOCATION}`, {
  options: (props) => {return {variables: {id: props.locationId}}}
}))(WaveImagesSection);
