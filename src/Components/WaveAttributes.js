import React, {Component} from "react";
import {graphql} from "react-apollo";
import gql from "graphql-tag";
import { compose } from 'react-apollo';
import WaveQuality from "./WaveQuality";
import WaveHollowness from "./WaveHollowness";
import WaveDanger from "./WaveDanger";
import WaveLength from "./WaveLength";
import WindAngle from "./WindAngle";
import TideSlider from "./TideSlider";
import { Auth0Context } from "../react-auth0-wrapper";
import {ADD_RATING} from "../utils/queries";
import {FETCH_WAVE} from "../utils/queries";
import {FETCH_WAVE_ATTRIBUTES} from "../utils/queries";

class WaveAttributes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rerender: false,
      waveAttributes: {}
    }
  }

  static contextType = Auth0Context;

  getAttributeName = (waveStatsObject, waveAttributeName) => {
    return Object.keys(waveStatsObject).find(key => waveStatsObject[key] === waveAttributeName);
  };

/*  componentDidUpdate(prevProps, prevState) {
    // This re-sets the re-render command to false after the user submits their
    // attribute votes and triggers the addRating mutation, so that components
    // don't keep re-rendering after users submit their first vote.
    if (this.state.rerender == true) {
      this.setState({rerender: false})
    }
  }*/

  voteOnAttribute = (someObject) => {
    this.setState({
      waveAttributes: {
        ...this.state.waveAttributes,
        ...someObject
      }
    })
  }

  handleVoteSubmit = (user) => {
    Object.keys(this.state)
    console.log("inside handle submit");
    this.props.addRating({
      variables: {
        waveid: this.props.waveId,
        ...this.state.waveAttributes,
        userid: user.sub
      },
      refetchQueries: () => [{ query: gql`${FETCH_WAVE_ATTRIBUTES}`, variables: {id: this.props.waveId} }]
    }).then((graphqlObject) => {
      console.log("arrive at thennable", graphqlObject)
    })
  }

  render() {
    if (this.props.FetchWaveAttributes.loading) {
      return "Loading.."
    }
    const { isAuthenticated, loginWithRedirect, logout, user } = this.context
    const waveStats = this.props.FetchWaveAttributes.Waves[0].Wave_Ratings_aggregate.aggregate.avg
    console.log("waveDetails", waveStats)
    return (
      <div>
        <WaveQuality voteOnAttribute={this.voteOnAttribute} attributeValue={waveStats.wavequality} attributeName="wavequality" />
        <WaveHollowness attributeValue={waveStats.wavehollowness} attributeName="wavehollowness" />
        <WaveDanger attributeValue={waveStats.wavedanger} attributeName="wavedanger" />
        <WaveLength attributeValue={waveStats.wavelength} attributeName="wavelength" />
        <WindAngle voteOnAttribute={this.voteOnAttribute} attributeValue={[waveStats.windangleone, waveStats.windangletwo]} attributeName={["windangleone", "windangletwo"]} />
        <TideSlider />
        {isAuthenticated && (
          <div>
            <button onClick={() => this.handleVoteSubmit(user)}>Vote On Wave Attributes</button>
          </div>
        )}
      </div>
    )
  }
}

export default compose(
  graphql(gql`${FETCH_WAVE_ATTRIBUTES}`, {
    options: (props) => {return {variables: {id: props.waveId}}},
    name: "FetchWaveAttributes"
  }),
  graphql(gql`${ADD_RATING}`, {
    name: "addRating"
  })
)(WaveAttributes);
