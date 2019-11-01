import React, {Component, Fragment} from 'react';
import ReactMapGL, {Marker, NavigationControl} from 'react-map-gl';
import {MAPTOKEN} from "../utils/token";
import { graphql } from 'react-apollo';
import gql from "graphql-tag";
import Pin from "./Pin";
import AreaMap from "./AreaMap";
import AreaTable from "./AreaTable";
import {withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {FETCH_AREA_LOCATION_DATA} from "../utils/queries";

const MAP_STYLE = 'mapbox://styles/mapbox/streets-v11';

const styles = theme => ({
  header: {
    margin: theme.spacing(3)
  },
  breadcrumbContainer: {
    marginTop: theme.spacing(1)
  },
  headerText: theme.typography.h4,
  breadcrumbText: theme.typography.h6,
  uppercase: {
    textTransform: "uppercase",
  },
  divider: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  }
})

class Area extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (!this.props.data.Locations) {
      return "Loading"
    }
    const {classes} = this.props
    let country = ""
    let region = ""
    let mapLocations = this.props.data.Locations.map(location => {
      country = location.country
      region = location.region
      return {id: location.id, latitude: location.latitude, longitude: location.longitude, region: location.region, country: location.country}
    })
    let tableLocations = this.props.data.Locations.map(location => {
      return {
        id: location.Wave.id,
        name: location.Wave.name,
        direction: location.Wave.wavedirection,
        bathymetry: location.Wave.bathymetry,
        quality: location.Wave.Wave_Ratings_aggregate.aggregate.avg.wavequality,
        danger: location.Wave.Wave_Ratings_aggregate.aggregate.avg.wavequality,
        area: this.props.match.params.areaName
      }
    })

    return (
      <div>
        <Grid container className={classes.header}>
          <Grid item>
            <Typography className={`${classes.headerText} ${classes.uppercase} ${classes.boldness}`} >{this.props.match.params.areaName}</Typography>
            <Grid container className={classes.breadcrumbContainer} >
              <Grid item>
                <Typography className={`${classes.breadcrumbText} ${classes.uppercase}`} >{country}</Typography>
              </Grid>
              <span className={`${classes.breadcrumbText} ${classes.divider}`}>|</span>
              <Grid item>
                <Typography className={`${classes.breadcrumbText} ${classes.uppercase}`}>{region}</Typography>
              </Grid>
              <span className={`${classes.breadcrumbText} ${classes.divider}`}>|</span>
              <Grid item>
                <Typography className={`${classes.breadcrumbText} ${classes.uppercase}`}>{this.props.match.params.areaName}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <AreaMap areaSpots={mapLocations} />
        <AreaTable spots={tableLocations} />
      </div>
    )
  }
}

export default graphql(gql`${FETCH_AREA_LOCATION_DATA}`, {
  options: (props) => {return {variables: {areaName: props.match.params.areaName} } }
})(withStyles(styles)(Area))
