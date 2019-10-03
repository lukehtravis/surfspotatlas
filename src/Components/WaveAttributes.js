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
      rerender: false
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("nextstate", nextState)
    if (nextState !== true) {
      return false
    }
  }

  voteOnAttribute = (someObject) => {
    this.setState(someObject)
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
