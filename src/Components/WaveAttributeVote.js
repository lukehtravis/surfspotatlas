import React, {Component} from "react";
import Popup from "reactjs-popup";
import Slider from '@material-ui/core/Slider';
import {waveQualityMarks} from "../utils/labels";

const WaveAttributeVote = (props) => {
  return (
    <div>
      <Popup trigger={<button> Trigger</button>} position="right center">
        <Slider
          id="waveQuality"
          marks={waveQualityMarks}
          valueLabelDisplay="on"
          defaultValue={props.sliderSettings.wavequality}
          onChange={props.voteOnAttribute()}
        />
      </Popup>
    </div>
  )
}

export default WaveAttributeVote;
