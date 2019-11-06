import React, {Component} from "react";
import {graphql} from "react-apollo";
import gql from "graphql-tag";
import {FETCH_LOCATION} from "../utils/queries";
import {FirebaseContext} from "./Firebase";
import WaveImageGallery from "./WaveImageGallery";
import WaveImageUploader from "./WaveImageUploader";
import { Auth0Context } from "../react-auth0-wrapper";

/*
  In this component, the FirebaseContext.Consumer is summoned
  (instantiated in Index.js -- we use the Provide - Consumer Context component so firebase is only initiated once through the entire app)
  It is passed down to both

*/

class WaveImagesSection extends Component {

  static contextType = Auth0Context;

  render(){
    if (!this.props.data.Locations) {
      return "Loading"
    }
    console.log("refetcher", this.props.data)
    const { isAuthenticated, user } = this.context
    const waveLocationDetails = this.props.data.Locations[0];
    console.log("isAuthenticated", isAuthenticated, "user", user)
    return (
      <FirebaseContext.Consumer>
        {firebase => (
          <div>
            <WaveImageGallery firebase={firebase.firebase_} location={waveLocationDetails} waveName={this.props.waveName} waveId={this.props.waveId} />
            {isAuthenticated && (
              <WaveImageUploader firebase={firebase.firebase_} location={waveLocationDetails} user={user.sub} waveName={this.props.waveName} waveId={this.props.waveId} />
            )}
          </div>
        )}
      </FirebaseContext.Consumer>
    )
  }
}

export default (graphql(gql`${FETCH_LOCATION}`, {
  options: (props) => {return {variables: {id: props.locationId}}}
}))(WaveImagesSection);
