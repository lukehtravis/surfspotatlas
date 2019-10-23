import React, {Component} from "react";
import Popup from "reactjs-popup";
import Slider from '@material-ui/core/Slider';
import EditIcon from '@material-ui/icons/Edit';
import {waveQualityMarks} from "../utils/labels";

// Each WaveAttributeVote component is attached to one of the children components of WaveAttributes,
// users can press a button below the visible wave attribute and vote--using a slider--
// on what they think the rating of that attribute should be. Changes in
// the slider will be sent via voteOnAttribute to the WaveAttributes component, and will
// eventually be submitted when a user has changed all of the wave attributes they want
// to change.

// In this component, we inherit attribute value and attribute name from the
// parent component. Some WaveAttributeVote components will only have one key->value
// pair (such as danger and hollowness), and others will have two (such as wind angle)
// and tide.

class WaveAttributeVote extends Component {
  // Here we want to set the initial attribute value to be whatever gets inherited
  // by the parent component on initial load
  constructor(props) {
    super(props);
    this.state = {
      popupAttributeValue: props.attributeValue
    }
  }

  handleChange = (event, newValue, attributeName) => {
    // Before we use voteOnAttribute to send the user-generated value up to the WaveAttributes
    // component, we want to set the state of the current component, so that if the user
    // decides to close and open the popup, it will remember what they have moved the slider already
    // and represent the slider value that they have already chosen.

    if (Array.isArray(newValue)) {
      // Checks if newValue is an Array
      // We make this check because some attributes (like wind and tide) have 2 values
      // while others (like quality and hollowness) only have 1
      const value1 = {[attributeName[0]]: newValue[0]}
      const value2 = {[attributeName[1]]: newValue[1]}
      const values = {...value1, ...value2}
      this.setState({popupAttributeValue: newValue});
      this.props.voteOnAttribute({...values})
    } else {
      // this else triggers if attribute only has one value
      this.setState({popupAttributeValue: newValue});
      // This voteOnAttribute function is inherited from WaveAttributes, and adds the key->value
      // pair of this slider to the state of WaveAttributes
      this.props.voteOnAttribute({[attributeName]: newValue})
    }
  }

  render() {

    return (
      <div>
        <Popup trigger={<div><EditIcon /></div>} position="right center">
          <Slider
            marks={waveQualityMarks}
            valueLabelDisplay="on"
            defaultValue={this.state.popupAttributeValue}
            onChange={(event, newValue) => this.handleChange(event, newValue, this.props.attributeName)}
          />
        </Popup>
      </div>
    )
  }
}

export default WaveAttributeVote;
