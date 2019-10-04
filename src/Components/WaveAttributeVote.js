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
    let attributeName = "";
    let attributeValue = 0;
    // Here we put the keys of the iherited props into an array for two reasons
    // 1. So that we can send a key/value property back up to the WaveAttributes component
    // which we hope to later send off in a graphql mutation as a vote
    // 2. Some of the Attributes represent one numeric value (waveQuality, danger)
    // whereas some of the attributes (windangle, tide, etc) represent a range of values
    // (high tide low tide, etc). So we use the object keys array to determine whether
    // the attribute we are processing represents one or two values, and then act accordingly
    const sliderSettingsKeys = Object.keys(this.props.sliderSettings).filter(indice => indice != "__typename")

    if (sliderSettingsKeys.length <= 2) {
      attributeName = sliderSettingsKeys[0]
      attributeValue = this.props.sliderSettings[attributeName]
    }

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
