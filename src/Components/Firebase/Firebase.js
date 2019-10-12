import React, {Component} from "react"
import fbcfg from "../../utils/firebaseconfig"
const firebase = require("firebase/app");
require("firebase/storage")
require("firebase/firestore");

class Firebase {
  constructor() {
    return firebase.initializeApp(fbcfg);
  }
}
export default Firebase;
