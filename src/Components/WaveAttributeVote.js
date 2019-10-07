import React, {Component} from "react";
import Popup from "reactjs-popup";
import Slider from '@material-ui/core/Slider';
import {waveQualityMarks} from "../utils/labels";

class WaveAttributeVote extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  handleChange = (event, newValue, attributeName) => {
    console.log("event", event, "newValue", newValue, "attributeName", attributeName)
    this.props.voteOnAttribute({[attributeName]: newValue})
  }

  render() {
    let attributeName = this.props.attributeName;
    let attributeValue = this.props.attributeValue;

    return (
      <div>
        <Popup trigger={<button> Trigger</button>} position="right center">
          <Slider
            id={attributeName}
            marks={waveQualityMarks}
            valueLabelDisplay="on"
            defaultValue={attributeValue}
            onChange={(event, newValue) => this.handleChange(event, newValue, attributeName)}
          />
        </Popup>
      </div>
    )
  }
}

export default WaveAttributeVote;
