import React, {Component} from "react";

class WaveImageUploader extends Component {
  constructor(props) {
    super(props);
  }
  render(){
    var ref = this.props.firebase.storage().ref()
    const refs = ref.child("/").listAll()
    console.log(refs)
    return(
      <div>
        Wave Image Uploader
      </div>
    )
  }
}

export default WaveImageUploader;
