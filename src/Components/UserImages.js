import React, {Component} from "react";
import {FirebaseContext} from "./Firebase";
import WaveImageUploader from "./WaveImageUploader";

class UserImages extends Component {
  constructor(props) {
    super(props);

  }

  render(){
    return (
      <FirebaseContext.Consumer>
        {firebase => (
          <div>
            <WaveImageUploader firebase={firebase.firebase_} />
          </div>
        )}
      </FirebaseContext.Consumer>
    )
  }
}

export default UserImages;
