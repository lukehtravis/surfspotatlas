import React, {Component} from "react";
import {graphql} from "react-apollo";
import gql from "graphql-tag";
import Popup from "reactjs-popup";
import Dropzone from 'react-dropzone';
import Typography from "@material-ui/core/Typography";
import {INSERT_WAVE_IMAGE} from "../utils/queries";
import Button from  "@material-ui/core/Button";
import {withStyles} from "@material-ui/core/styles"

const styles = theme => ({
  root: {
    marginLeft: theme.spacing(3)
  },
  button: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    marginTop: theme.spacing(2)
  }
})

/*

External API's used:
https://firebase.google.com/docs/storage/web/create-reference
https://firebase.google.com/docs/storage/web/upload-files
https://developer.mozilla.org/en-US/docs/Web/API/File
https://github.com/react-dropzone/react-dropzone

*/

class WaveImageUploader extends Component {
  // Logged in users can drag and drop photos from their computer into the Dropzone component
  // Photos will then be submitted. Once submitted, the photos will be uploaded to firestore
  // Once each photo is uploaded to firestore, its' url will be returned, and then a database entry will be
  // created for it in the wavePhotos table
  constructor(props) {
    super(props);
    this.state = {
      filename: [],
      user: "string"
    }
  }

  fileUpload = (filesUploaded) => {
    // This function triggers after users upload photos into the Dropzone
    // It gets a list (array of objects)  of properties from uploaded images :: lastModifiedDate, name, path, size, type
    // Then, it uses the File js api to create an arrayBuffer (binary blob)
    // which represents the data of the image which we want to store
    // Once that blob has been created, it is added to the component state
    console.log("filesUploaded", filesUploaded)
    filesUploaded.forEach(file => {
      console.log("file", file)
      const reader = new FileReader()
      reader.readAsArrayBuffer(file)
      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
        // onload triggers once FileReader.readAsArrayBuffer finished succesfully
        const binaryStr = reader.result
        // attaches binary back as property of uploaded image object (file)
        file.binary = binaryStr
        this.setState({
          filename: [...this.state.filename, file]
        })
      }
    })
  }

  submitPhotos = () => {
    // This function is triggered when a user presses the submit button, after
    // they have uploaded photos to the dropzone.
    // It creates a reference to our firestore property, and then sends each
    // image off to our firebase bucket.
    const {continent, country, region, area, id, name} = this.props.location
    let storageRef = this.props.firebase.storage().ref();
    // Putting this.props.insertWaveImage in variable is necessary to avoid conflicting this declaration in put.() callback below
    const insertImageMutation = this.props.insertWaveImage
    this.state.filename.map((file) => {
      let childRef = storageRef.child(`${continent}/${country}/${region}/${area}/${this.props.waveName}/${file.name}`);
      // using the js File Api to turn our binary data into something we can transfer to firebase
      var file = new File([file.binary], file.name, {
        type: file.type,
      });

      // use the firebase .put() function to send to google firebase storage bucket
      childRef.put(file).then((snapshot) => {
        // storageRef.child('images/stars.jpg').getDownloadURL().then(function(url) {
        let finalStorageUrl = "";
        snapshot.ref.getDownloadURL().then(function(url) {
          finalStorageUrl = url
        }).then(url => {
          console.log('Uploaded a blob or file!', snapshot);
          insertImageMutation({
            variables: {
              waveid: this.props.waveId,
              name: snapshot.metadata.name,
              url: finalStorageUrl,
              type: snapshot.metadata.contentType,
              creator: this.props.user
            }
          }).then(returnedGraphql => {
            console.log(returnedGraphql)
          })
        })
      });
    })
  }

  render(){
    const {classes} = this.props
    return(
      <div className={classes.root}>
        <Popup trigger={<Button className={classes.button}>Choose Photos</Button>} position="right center">
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
          {this.state.filename.length > 0 && (
            this.state.filename.map(file => (
              <Typography>{file.name}</Typography>
            ))
          )}
          <Button className={classes.button} onClick={this.submitPhotos}>Submit Photos</Button>
        </Popup>
      </div>
    )
  }
}

export default graphql(gql`${INSERT_WAVE_IMAGE}`, {
  name: "insertWaveImage"
})(withStyles(styles)(WaveImageUploader));
