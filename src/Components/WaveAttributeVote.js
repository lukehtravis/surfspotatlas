import React, {Component} from "react";
import Popup from "reactjs-popup";

const WaveAttributeVote = (props) => {
  return (
    <div>
      <Popup trigger={<button> Trigger</button>} position="right center">
        <div>Popup content here !!</div>
      </Popup>
    </div>
  )
}

export default WaveAttributeVote;
