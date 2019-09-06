import React, {Component} from "react";
import {Link} from "react-router-dom";

const WavePopup = (props) => {
  console.log("Wave Popup Props", props)
  return (
    <div>
      <p>{props.waveDetails.waveName}</p>
      <p>{props.waveDetails.waveQuality}</p>
      <p>{props.waveDetails.waveType}</p>
      <p>{props.waveDetails.waveDirection}</p>
    </div>
  )
}

export default WavePopup;
