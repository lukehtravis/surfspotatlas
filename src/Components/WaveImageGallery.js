import React, {Component} from "react";
import {graphql} from "react-apollo";
import gql from "graphql-tag";
import {FIREBASE_BUCKET} from "../utils/constants";
import {FETCH_WAVE_IMAGES} from "../utils/queries"

/*
  User-submitted images are stored in a google firebase storage db. References
  to those images are stored in the postgres db.
  In this component, url references to the firebase images are fetched from
  Graphql, and displayed in image tags on the page

*/


class WaveImageGallery extends Component {

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
