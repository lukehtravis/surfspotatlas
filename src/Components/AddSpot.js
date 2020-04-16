import React, {Component} from 'react'
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import * as compose from 'lodash.flowright';
import { Auth0Context } from "../react-auth0-wrapper";
import Map from './Map';
import {withStyles} from "@material-ui/core/styles";
import {ADD_SPOT, INSERT_LOCATION, ADD_RATING} from "../utils/queries";
import {waveLengthMarks, waveQualityMarks, waveHollownessMarks, waveDangerMarks, tideMarks} from "../utils/labels";
import {convertMonthToDay} from "../utils/dbNameConversions";
import Slider from '@material-ui/core/Slider';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";

/*

  This component allows users to add waves to the surf spot atlas.
  They can add descriptions, attributes and a location (via mapbox map)
  Once users submit details of the new wave, a few things happen.
  1. The addSpot mutation is triggered, which sends the payload to Hasura database,
  and creates an entry in the Waves table, and returns the graphql result
  2. The waveId property from the returned graphql result of addSpot is used in the addRating mutation to
  create an entry in the Wave_Ratings table (one wave might have many ratings entries from different users)
  3. the insertLocation mutation is then triggered, which takes the heirarchy of placenames (and long lat)
  and creates an entry in the Locations table (each wave corresponds to 1 location)
  the State which populates the insertLocation mutation is sent up from the Map.js Component

*/

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  gridContainer: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3)
  },
  textField: {
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(0),
    width: "100%"
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  menu: {
    width: 200,
  },
  formControl: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    minWidth: 120,
    width: "100%",
  },
  formHeader: {
    marginTop: theme.spacing(2),
    fontSize: "1.2rem"
  },
  sectionHeader: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    fontSize: "1rem"
  },
  sliderSection: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
  sliderTitle: {
    fontSize: "0.8rem"
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  submitButton: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    border: `1px solid ${theme.palette.primary.light}`
  }
});

class AddSpot extends Component {
  state = {
    lat: 0,
    long: 0,
    tideRange: [10, 90]
  }

  static contextType = Auth0Context;

  onChangeCoords = (long, lat, continent, country, region, area) => {
    this.setState({
      lat: lat,
      long: long,
      continent: continent,
      country: country,
      region: region,
      area: area
    })
  }

  handleChange = (event) => {
    const target = event.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;


    this.setState({
      [name]: value
    });
  }

  waveLengthChange = (event, newValue) => {
    this.setState({wavelength: newValue})
  }

  waveQualityChange = (event, newValue) => {
    this.setState({wavequality: newValue})
  }

  waveDangerChange = (event, newValue) => {
    this.setState({wavedanger: newValue})
  }

  waveHollownessChange = (event, newValue) => {
    this.setState({wavehollowness: newValue})
  }

  tideRangeChange = (event, newValue) => {
    this.setState({tideRange: [newValue[0], newValue[1]]})
  }

  seasonStartChange = (event) => {
    const target = event.target
    let newValue = target.value
    const waveSeasonStartValue = convertMonthToDay(newValue)
    this.setState({waveSeasonStartLabel: newValue, waveseasonstart: waveSeasonStartValue})
  }

  seasonEndChange = (event) => {
    const target = event.target
    let newValue = target.value
    const waveSeasonEndValue = convertMonthToDay(newValue)
    this.setState({waveSeasonEndLabel: newValue, waveseasonend: waveSeasonEndValue})
  }

  handleSubmit = (event) => {
    // Two graphql mutations are necessary each time a user submits a new wave
    // The first addSpot(), is required to populate Wave table data about this wave
    // The second, addRating, takes the waveId generated from the addSpot mutation,
    // and proceeds to add information about the waves attributes in the Wave_Ratings table
    // Also, a location entry is added to the Locations table
    event.preventDefault();
    const date = new Date();
    const timestamp = date.getTime();
    const user = this.context.user ? this.context.user.sub : "anonymous"
    this.props.addSpot({
        variables: {
          name: this.state.name,
          nickname: this.state.nickname,
          description: this.state.description,
          directions: this.state.directions,
          bathymetry: this.state.bathymetry,
          wavetype: this.state.wavetype,
          wavedirection: this.state.wavedirection,
          wavelandmarks: this.state.wavelandmarks,
          datecreated: timestamp,
          createdby: user
        },
    }).then((graphqlObject) => {
      let locationId = graphqlObject.data.insert_Waves.returning[0].locationid
      let waveId = graphqlObject.data.insert_Waves.returning[0].id
      let userId = graphqlObject.data.insert_Waves.returning[0].createdby
      this.props.addRating({
        variables: {
          waveid: waveId,
          wavelength: this.state.wavelength,
          wavequality: this.state.wavequality,
          wavehollowness: this.state.wavehollowness,
          wavedanger: this.state.wavedanger,
          userid: userId,
          windangleone: this.state.windangleone,
          windangletwo: this.state.windangletwo,
          lowtide: this.state.tideRange[0],
          hightide: this.state.tideRange[1],
          waveseasonstart: this.state.waveseasonstart,
          waveseasonend: this.state.waveseasonend,
          swellangleone: this.state.swellangleone,
          swellangletwo: this.state.swellangletwo,
        }
      })
      this.props.insertLocation({
        variables: {
          id: locationId,
          longitude: this.state.long,
          latitude: this.state.lat,
          continent: this.state.continent,
          country: this.state.country,
          region: this.state.region,
          area: this.state.area
        }
      })
    })
  }

  render() {
    const {classes} = this.props
    return (
      <div>
        <Grid className={classes.gridContainer}>
          <Typography className={classes.formHeader}>Create A New Spot</Typography>
          <form>
            <Grid container justify="space-between">
              <Grid xs={12} md={6} item>
                <TextField
                  variant="outlined"
                  type="text"
                  className={classes.textField}
                  label="Wave Name"
                  margin="normal"
                  name="name"
                  value={this.state.name} onChange={this.handleChange}
                />
              </Grid>
              <Grid xs={12} md={5} item>
                <TextField
                  variant="outlined"
                  type="text"
                  className={classes.textField}
                  label="Nickname"
                  margin="normal"
                  name="nickname"
                  value={this.state.nickname} onChange={this.handleChange}
                />
              </Grid>
            </Grid>
            <Grid container justify="space-between">
              <Grid item xs={12} md={6}>
                <TextField
                  multiline={true}
                  rows={4}
                  rowsMax={4}
                  variant="outlined"
                  type="text"
                  className={classes.textField}
                  helperText="Description"
                  margin="normal"
                  name="description"
                  value={this.state.description} onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12} md={5}>
                <TextField
                multiline={true}
                  rows={4}
                  rowsMax={4}
                  variant="outlined"
                  type="text"
                  className={classes.textField}
                  helperText="Directions"
                  margin="normal"
                  name="directions"
                  value={this.state.directions} onChange={this.handleChange}
                />
              </Grid>
            </Grid>
            <Divider className={classes.divider}/>
            <Typography className={classes.sectionHeader}>Wave Features</Typography>
            <Grid container justify="space-between">
              <Grid item>
                <TextField
                  id="bathymetry"
                  select
                  className={classes.textField}
                  value={this.state.bathymetry}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  helperText="Select Bathymetry"
                  margin="normal"
                  variant="outlined"
                  name="bathymetry"
                  onChange={this.handleChange}
                >
                  <MenuItem key="select" value="sand">
                    Sand
                  </MenuItem>
                  <MenuItem key="select" value="reef">
                    Reef
                  </MenuItem>
                  <MenuItem key="select" value="sand-reef">
                    Sand & Reef
                  </MenuItem>
                </TextField>
              </Grid>
              <Grid item>
                <TextField
                  id="direction"
                  select
                  className={classes.textField}
                  value={this.state.wavedirection}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  helperText="Select Direction"
                  margin="normal"
                  variant="outlined"
                  name="wavedirection"
                  onChange={this.handleChange}
                >
                  <MenuItem key="select" value="right">
                    Right
                  </MenuItem>
                  <MenuItem key="select" value="left">
                    Left
                  </MenuItem>
                  <MenuItem key="select" value="rightleft">
                    Right And Left
                  </MenuItem>
                </TextField>
              </Grid>
              <Grid item>
                <TextField
                  id="wavetype"
                  select
                  className={classes.textField}
                  value={this.state.wavetype}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  helperText="Select Type"
                  margin="normal"
                  variant="outlined"
                  name="wavetype"
                  onChange={this.handleChange}
                >
                  <MenuItem key="select" value="beachbreak">
                    Beach Break
                  </MenuItem>
                  <MenuItem key="select" value="reefbreak">
                    Reef Break
                  </MenuItem>
                  <MenuItem key="select" value="pointbreak">
                    Point Break
                  </MenuItem>
                </TextField>
              </Grid>
              <Grid item>
                <TextField
                  id="wavelandmarks"
                  select
                  className={classes.textField}
                  value={this.state.wavelandmarks}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  helperText="Select Landmarks"
                  margin="normal"
                  variant="outlined"
                  name="wavelandmarks"
                  onChange={this.handleChange}
                >
                  <MenuItem key="select" value="pier">
                    Pier
                  </MenuItem>
                  <MenuItem key="select" value="jetty">
                    Jetty
                  </MenuItem>
                  <MenuItem key="select" value="channel">
                    Channel
                  </MenuItem>
                </TextField>
              </Grid>
            </Grid>
            <Divider className={classes.divider}/>
            <Typography className={classes.sectionHeader}>Wave Attributes</Typography>
            <Grid container>
              <Grid item xs={12} md={6} className={classes.sliderSection}>
                <Typography className={classes.sliderTitle} gutterBottom>
                  Wave Length
                </Typography>
                <Slider
                  className="slider-input"
                  id="wavelength"
                  name="wavelength"
                  marks={waveLengthMarks}
                  value={this.state.wavelength}
                  onChange={this.waveLengthChange}
                />
              </Grid>
              <Grid item xs={12} md={6} className={classes.sliderSection}>
              <Typography className={classes.sliderTitle} gutterBottom>
                Wave Quality
              </Typography>
                <Slider
                  className="slider-input"
                  id="wavequality"
                  name="wavequality"
                  marks={waveQualityMarks}
                  value={this.state.wavequality}
                  onChange={this.waveQualityChange}
                />
              </Grid>
              <Grid item xs={12} md={6} className={classes.sliderSection}>
                <Typography className={classes.sliderTitle} gutterBottom>
                  Wave Hollowness
                </Typography>
                <Slider
                  className="slider-input"
                  id="wavehollowness"
                  name="wavehollowness"
                  marks={waveHollownessMarks}
                  value={this.state.wavehollowness}
                  onChange={this.waveHollownessChange}
                />
              </Grid>
              <Grid item xs={12} md={6} className={classes.sliderSection}>
                <Typography className={classes.sliderTitle} gutterBottom>
                  Wave Danger
                </Typography>
                <Slider
                  className="slider-input"
                  id="wavedanger"
                  name="wavedanger"
                  marks={waveDangerMarks}
                  value={this.state.wavedanger}
                  onChange={this.waveDangerChange}
                />
              </Grid>
              <Grid item xs={12} md={6} className={classes.sliderSection}>
                <Typography className={classes.sliderTitle} gutterBottom>
                  Ideal Tide Range
                </Typography>
                <Slider
                  className="slider-input"
                  id="tiderange"
                  name="tiderange"
                  marks={tideMarks}
                  value={this.state.tideRange}
                  onChange={this.tideRangeChange}
                />
              </Grid>
            </Grid>
            <Divider className={classes.divider}/>
            <Grid container justify="space-between">
              <Grid item xs={12} md={5}>
                <TextField
                  variant="outlined"
                  type="number"
                  className={classes.textField}
                  helperText="Starting Wind Angle"
                  margin="normal"
                  name="windangleone"
                  value={this.state.windangleone} onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12} md={5}>
                <TextField
                  variant="outlined"
                  type="number"
                  className={classes.textField}
                  helperText="Ending Wind Angle"
                  margin="normal"
                  name="windangletwo"
                  value={this.state.windangletwo} onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12} md={5}>
                <TextField
                  variant="outlined"
                  type="number"
                  className={classes.textField}
                  helperText="Starting Swell Angle"
                  margin="normal"
                  name="swellangleone"
                  value={this.state.swellangleone} onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12} md={5}>
                <TextField
                  variant="outlined"
                  type="number"
                  className={classes.textField}
                  helperText="Ending Swell Angle"
                  margin="normal"
                  name="swellangletwo"
                  value={this.state.swellangletwo} onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  id="waveseasonstart"
                  select
                  className={classes.textField}
                  value={this.state.waveSeasonStartLabel}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  helperText="When does surf season start"
                  margin="normal"
                  variant="outlined"
                  name="waveseasonstart"
                  onChange={this.seasonStartChange}
                >
                  <MenuItem key="select" value="january">
                    January
                  </MenuItem>
                  <MenuItem key="select" value="february">
                    February
                  </MenuItem>
                  <MenuItem key="select" value="march">
                    March
                  </MenuItem>
                  <MenuItem key="select" value="april">
                    April
                  </MenuItem>
                  <MenuItem key="select" value="may">
                    May
                  </MenuItem>
                  <MenuItem key="select" value="june">
                    June
                  </MenuItem>
                  <MenuItem key="select" value="july">
                    July
                  </MenuItem>
                  <MenuItem key="select" value="august">
                    August
                  </MenuItem>
                  <MenuItem key="select" value="september">
                    September
                  </MenuItem>
                  <MenuItem key="select" value="october">
                    October
                  </MenuItem>
                  <MenuItem key="select" value="november">
                    November
                  </MenuItem>
                  <MenuItem key="select" value="december">
                    December
                  </MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={5}>
                <TextField
                  id="waveseasonend"
                  select
                  className={classes.textField}
                  value={this.state.waveSeasonEndLabel}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  helperText="When does surf season end"
                  margin="normal"
                  variant="outlined"
                  name="waveseasonend"
                  onChange={this.seasonEndChange}
                >
                  <MenuItem key="select" value="january">
                    January
                  </MenuItem>
                  <MenuItem key="select" value="february">
                    February
                  </MenuItem>
                  <MenuItem key="select" value="march">
                    March
                  </MenuItem>
                  <MenuItem key="select" value="april">
                    April
                  </MenuItem>
                  <MenuItem key="select" value="may">
                    May
                  </MenuItem>
                  <MenuItem key="select" value="june">
                    June
                  </MenuItem>
                  <MenuItem key="select" value="july">
                    July
                  </MenuItem>
                  <MenuItem key="select" value="august">
                    August
                  </MenuItem>
                  <MenuItem key="select" value="september">
                    September
                  </MenuItem>
                  <MenuItem key="select" value="october">
                    October
                  </MenuItem>
                  <MenuItem key="select" value="november">
                    November
                  </MenuItem>
                  <MenuItem key="select" value="december">
                    December
                  </MenuItem>
                </TextField>
              </Grid>
            </Grid>
            <Map onChangeCoords={this.onChangeCoords} />
            <Button onClick={this.handleSubmit} className={classes.submitButton}>Submit</Button>
          </form>
        </Grid>
      </div>
    )
  }
}

export default compose(
  graphql(gql`${ADD_SPOT}`, {
    name: "addSpot"
  }),
  graphql(gql`${INSERT_LOCATION}`, {
    name: "insertLocation"
  }),
  graphql(gql`${ADD_RATING}`, {
    name: "addRating"
  })
)(withStyles(styles)(AddSpot))
