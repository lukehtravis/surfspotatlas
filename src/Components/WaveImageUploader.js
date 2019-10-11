import React, {Component} from "react";
const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

class WaveImageUploader extends Component {
  constructor(props) {
    super(props);

  }

  render(){
    return (
      <div>
        <p>Wave Image Uploader</p>
      </div>
    )
  }
}

export default WaveImageUploader;
