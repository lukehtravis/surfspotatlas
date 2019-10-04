import React, {Component} from "react";
import WaveQuality from "./WaveQuality";
import WaveHollowness from "./WaveHollowness";
import WaveDanger from "./WaveDanger";
import WaveLength from "./WaveLength";
import WindAngle from "./WindAngle";
import TideSlider from "./TideSlider";

class WaveAttributes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rerender: false,
      waveAttributes: {}
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    // Should component update is set to prevent child components of WaveAttributes from re-rendering
    // each time a user votes on one of them. The ui is designed so that WaveAttributes component
    // will only update once user have pressed the vote button at bottom. When vote button is
    // pressed, rerender part of state will equal true, and component will be re-rendered
    console.log("shouldComponentUpdate rerend", nextState)
    if (nextState.rerender !== true) {
      return false
    }
  }

  voteOnAttribute = (someObject) => {
    this.setState({
      waveAttributes: {
        ...this.state.waveAttributes,
        ...someObject
      }
    })
  }

  render() {
    console.log("waveAttributesrender", this.state)
    return (
      <div>
        <WaveQuality waveId={this.props.waveId} voteOnAttribute={this.voteOnAttribute} />
        <WaveHollowness waveId={this.props.waveId} />
        <WaveDanger waveId={this.props.waveId} />
        <WaveLength waveId={this.props.waveId} />
        <WindAngle waveId={this.props.waveId} />
        <TideSlider waveId={this.props.waveId} />
      </div>
    )
  }
}

export default WaveAttributes;
