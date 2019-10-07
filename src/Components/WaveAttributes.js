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

  shouldComponentUpdate(nextProps, nextState) {
    // Should component update is set to prevent child components of WaveAttributes from re-rendering
    // each time a user votes on one of them. The ui is designed so that WaveAttributes component
    // will only update once user have pressed the vote button at bottom. When vote button is
    // pressed, rerender part of state will equal true, and component will be re-rendered
    console.log("shouldComponentUpdate rerend", nextState)
    if (nextState.rerender !== true) {
      return false
    } else {
      return true
    }
  }

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
      refetchQueries: () => [{ query: gql`${FETCH_WAVE}`, variables: {id: this.props.waveId} }]
    }).then((graphqlObject) => {
      console.log("arrive at thennable", graphqlObject)
    })
  }

  render() {
    console.log("waveAttributesrender", this.state)
    const { isAuthenticated, loginWithRedirect, logout, user } = this.context
    return (
      <div>
        <WaveQuality waveId={this.props.waveId} voteOnAttribute={this.voteOnAttribute} />
        <WaveHollowness waveId={this.props.waveId} />
        <WaveDanger waveId={this.props.waveId} />
        <WaveLength waveId={this.props.waveId} />
        <WindAngle waveId={this.props.waveId} />
        <TideSlider waveId={this.props.waveId} />
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
  graphql(gql`${ADD_RATING}`, {
    name: "addRating"
  }),
  graphql(gql`${FETCH_WAVE_ATTRIBUTES}`, {
    options: (props) => {return {variables: {id: props.waveId}}},
    name: 'FetchWaveAttributes',
  })
)(WaveAttributes);
