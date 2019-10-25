import React, {Component} from "react";
import {graphql} from "react-apollo";
import gql from "graphql-tag";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import {FIREBASE_BUCKET} from "../utils/constants";
import {FETCH_WAVE_IMAGES} from "../utils/queries"
import {withStyles} from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    maxHeight: 450,
  }
})

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
    const {classes} = this.props
    return(
      <div className={classes.root}>
        <GridList cellHeight={160} className={classes.gridList} cols={2}>
          {images.map(tile => (
            <GridListTile key={tile.url} cols={tile.cols || 1}>
              <img src={tile.url} />
            </GridListTile>
          ))}
        </GridList>
      </div>
    )
  }
}

export default graphql(gql`${FETCH_WAVE_IMAGES}`, {
  options: (props) => {return {variables: {waveid: props.waveId}}}
})(withStyles(styles)(WaveImageGallery));
