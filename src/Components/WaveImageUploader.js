import React, {Component} from "react";

class WaveImageUploader extends Component {
  constructor(props) {
    super(props);
  }
  render(){
    const {region, area, country} = this.props.location
    const firebaseBucket = this.props.firebase.storage().ref();
    //let imageUrl = storageRef.child(`${region}`/mountains.jpg');
    return(
      <div>
        Wave Image Uploader
      </div>
    )
  }
}

export default WaveImageUploader;
