import React, {Component} from "react";
import {graphql} from "react-apollo";
import gql from "graphql-tag";
import {FETCH_LOCATION} from "../utils/queries";
import {FirebaseContext} from "./Firebase";
import WaveImageGallery from "./WaveImageGallery";
import WaveImageUploader from "./WaveImageUploader";
import { Auth0Context } from "../react-auth0-wrapper";

class WaveImagesSection extends Component {
  constructor(props) {
    super(props);

  }

  static contextType = Auth0Context;

  render(){
    if (!this.props.data.Locations) {
      return "Loading"
    }

    const { isAuthenticated, user } = this.context
    const waveLocationDetails = this.props.data.Locations[0];

    return (
      <FirebaseContext.Consumer>
        {firebase => (
          <div>
            <WaveImageGallery firebase={firebase.firebase_} location={waveLocationDetails} waveName={this.props.waveName} waveId={this.props.id} />

              <WaveImageUploader firebase={firebase.firebase_} location={waveLocationDetails} user={user} waveName={this.props.waveName} />

          </div>
        )}
      </FirebaseContext.Consumer>
    )
  }
}

export default (graphql(gql`${FETCH_LOCATION}`, {
  options: (props) => {return {variables: {id: props.locationId}}}
}))(WaveImagesSection);
