import React, {Component} from "react";
import Popup from "reactjs-popup";
import Slider from '@material-ui/core/Slider';
import {waveQualityMarks} from "../utils/labels";

class WaveAttributeVote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popupAttributeValue: props.attributeValue
    }
  }

  handleChange = (event, newValue, attributeName) => {
    console.log("event", event, "newValue", newValue, "attributeName", attributeName)
    this.setState({popupAttributeValue: newValue});
    this.props.voteOnAttribute({[attributeName]: newValue})
  }

  render() {
    let attributeName = this.props.attributeName;
    console.log("modalprops", this.props)
    console.log("modalstate", this.state)
    return (
      <div>
        <Popup trigger={<button> Trigger</button>} position="right center">
          <Slider
            id={attributeName}
            marks={waveQualityMarks}
            valueLabelDisplay="on"
            defaultValue={this.state.popupAttributeValue}
            onChange={(event, newValue) => this.handleChange(event, newValue, attributeName)}
          />
        </Popup>
      </div>
    )
  }
}

export default WaveAttributeVote;
