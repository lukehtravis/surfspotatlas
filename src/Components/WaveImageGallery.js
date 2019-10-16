import React, {Component} from "react";
import {graphql} from "react-apollo";
import gql from "graphql-tag";
import {FIREBASE_BUCKET} from "../utils/constants";
import {FETCH_WAVE_IMAGES} from "../utils/queries"

class WaveImageGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrls: []
    }
  }

  componentWillMount() {
    const {continent, country, region, area, id, name} = this.props.location
    const firebaseFolderPath = `${continent}/${country}/${region}/${area}/${this.props.waveName}`
    var ref = this.props.firebase.storage().ref()
    const refs = ref.child(firebaseFolderPath)
    // Find all the prefixes and items.
    let imageUrls = []

  }


  render() {
    if (this.props.data.loading) {
      return "Loading..."
    }

    let images = [];
    this.props.data.Wave_Images.map(image => {
      images.push({url: image.url, id:image.id})
    })
    return(
      <div>
        <p>Wave Image Gallery</p>
        <div>
          {images.map(image => {
            return <img src={image.url} />
          })}
        </div>
      </div>
    )
  }
}

export default graphql(gql`${FETCH_WAVE_IMAGES}`, {
  options: (props) => {return {variables: {waveid: props.waveId}}}
})(WaveImageGallery);
