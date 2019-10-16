import React, {Component} from "react";
import Popup from "reactjs-popup";
import Dropzone from 'react-dropzone';

class WaveImageUploader extends Component {
  // Logged in users can drag and drop photos from their computer into the interface
  // Photos will have db fields : userid, datecreated (timestamp), url (in firebase)
  constructor(props) {
    super(props);
    this.state = {
      filename: [],
      user: "string"
    }
  }

  fileUpload = (filesUploaded) => {

    filesUploaded.forEach(file => {
      const reader = new FileReader()
      reader.readAsArrayBuffer(file)
      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result
        file.binary = binaryStr
        console.log("filesUploaded", filesUploaded)
        this.setState({
          filename: [...this.state.filename, ...filesUploaded]
        })
      }
    })
  }

  submitPhotos = () => {
    var storageRef = this.props.firebase.storage().ref();

    // Create a reference to 'mountains.jpg'

    this.state.filename.map(file => {
      var childRef = storageRef.child(file.name);
      /*
        lastModified: 1531876000395
        lastModifiedDate: Tue Jul 17 2018 18:06:40 GMT-0700 (Pacific Daylight Time) {}
        name: "black and white kitten small.jpg"
        path: "black and white kitten small.jpg"
        size: 109718
        type: "image/jpeg"
      */
      var file = new File([file.binary], file.name, {
        type: file.type,
      });
      childRef.put(file).then(function(snapshot) {
        console.log('Uploaded a blob or file!', snapshot);
      });
    })
  }

  render(){
    const {region, area, country} = this.props.location
    const firebaseBucket = this.props.firebase.storage().ref();
    //let imageUrl = storageRef.child(`${region}`/mountains.jpg');
    console.log(this.state.user, this.state.filename);
    return(
      <div>
        <Popup trigger={<button>Choose Photos</button>} position="right center">
          <Dropzone onDrop={acceptedFiles => this.fileUpload(acceptedFiles)}>
            {({getRootProps, getInputProps}) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
              </section>
            )}
          </Dropzone>
          <button onClick={this.submitPhotos}>Submit Photos</button>
        </Popup>
      </div>
    )
  }
}

export default WaveImageUploader;
