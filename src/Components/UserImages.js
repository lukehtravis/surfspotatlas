import React, {Component} from "react";
import {FirebaseContext} from "./Firebase";
import WaveImageUploader from "./WaveImageUploader";

class UserImages extends Component {
  constructor(props) {
    super(props);

  }

  render(){
    console.log("fb", this.props.context)
    return (
      <FirebaseContext.Consumer>
        {firebase => (
          <div>
            <WaveImageUploader firebase={firebase} />
          </div>
        )}
      </FirebaseContext.Consumer>
    )
  }
}

export default UserImages;
