import fbcfg from "../../utils/firebaseconfig"
const firebase = require("firebase");
require("firebase/firestore");

class Firebase {
  constructor() {
    firebase.initializeApp(fbcfg);
  }
}
export default Firebase;
