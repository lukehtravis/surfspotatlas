import React, {Component} from "react";
import {graphql} from "react-apollo";
import gql from "graphql-tag";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Typography from "@material-ui/core/Typography";
import Popup from "reactjs-popup";
import {FETCH_WAVE_IMAGES} from "../utils/queries"
import {withStyles} from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: theme.spacing(3),
    justifyContent: 'left',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    maxHeight: 450,
  },
  popupImage: {
    width: "500px",
    height: "500px",
  },
  h6Margin: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(3),
    color: "#616161",
    fontSize: "1rem",
    textTransform: "uppercase"
  }
})

/*
  User-submitted images are stored in a google firebase storage db. References
  to those images are stored in the postgres db.
  In this component, url references to the firebase images are fetched from
  Graphql, and displayed in image tags on the page

*/


class WaveImageGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      imageUrl: ""
    }
  }
  openModal = (url) => {
    console.log(url)
    this.setState({isModalOpen: true, imageUrl: url})
  }
  closeModal = () => {
    this.setState({isModalOpen: false, imageUrl: "" });
  }
  isOdd = (num) => {
    if (num % 2 === 1) {
      return true
    } else {
      return false
    }
  }

  render() {
    if (this.props.data.loading) {
      return "Loading..."
    }

    let images = [];
    let rowNumber = 1 // Keeps track of current row
    let tileSpot = 1 // Keeps track of current tile
    let spaceOccupied = 1 // Keeps track of how long tile should be

    /*
      Gallery will follow format of below grid (fractions represent row length)
      Row 1. 1/3 2/3 (2 photos)
      Row 2. 1/3 1/3 1/3 (3 photos)
      Row 3. 1/3 2/3 (2 photos)
      Row 4. 1/3 1/3 1/3 (3 photos)
    */

    this.props.data.Wave_Images.map(image => {
      // Check if we are in two photo or three photo row
      if (this.isOdd(rowNumber)) {
        // We are in two photo row
        if (tileSpot === 1) {
          // we are on the first tile of the row
          images.push({url: image.url, id:image.id, cols: spaceOccupied})
          tileSpot++
          spaceOccupied++
        } else {
          // we are on second tile of the row
          images.push({url: image.url, id:image.id, cols: spaceOccupied})
          rowNumber++
          tileSpot = 1
          spaceOccupied = 1
        }
      } else {
        // We are in a three photo row
        if (tileSpot === 3) {
          // we are at the last tile in the row
          images.push({url: image.url, id:image.id, cols: spaceOccupied})
          rowNumber++
          tileSpot = 1
        } else {
          // we are in tile one or two
          images.push({url: image.url, id:image.id, cols: spaceOccupied})
          tileSpot++
        }
      }
      return ""// necussary to return something in map
    })

    const {classes} = this.props
    return(
      <div>
        <Typography className={classes.h6Margin}>Photo Gallery</Typography>
        <div className={classes.root}>
          <GridList cellHeight={160} className={classes.gridList} cols={3}>
            {images.map(tile => (
              <GridListTile key={tile.url} cols={tile.cols}>
                  <img alt="waves" src={tile.url} onClick={() => this.openModal(tile.url)} />
                    {this.state.imageUrl === tile.url && (
                      <Popup
                        modal
                        onClose={this.closeModal}
                        open={this.state.isModalOpen}
                        closeOnDocumentClick
                      >
                        <img alt="waves" src={tile.url} className={classes.popupImage} />
                      </Popup>
                    )}
              </GridListTile>
            ))}
          </GridList>
        </div>
      </div>
    )
  }
}

export default graphql(gql`${FETCH_WAVE_IMAGES}`, {
  options: (props) => {return {variables: {waveid: props.waveId}}}
})(withStyles(styles)(WaveImageGallery));
