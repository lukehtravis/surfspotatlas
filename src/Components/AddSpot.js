import React, {Component, Fragment} from 'react'
import { Query, graphql, Mutation} from "react-apollo";
import gql from "graphql-tag";
import ApolloClient from "apollo-boost";
import { compose } from 'react-apollo';
import Map from './Map';
import {withStyles} from "@material-ui/core/styles";
import {ADD_SPOT, INSERT_LOCATION, ADD_RATING} from "../utils/queries";
import {waveLengthMarks, waveQualityMarks, waveHollownessMarks, waveDangerMarks, tideMarks} from "../utils/labels";
import {convertMonthToDay} from "../utils/dbNameConversions";
import Slider from '@material-ui/core/Slider';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
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
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  }
});

class AddSpot extends Component {
  state = {
    lat: 0,
    long: 0,
    tideRange: [10, 90]
  }

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
    event.preventDefault();
    const date = new Date();
    const timestamp = date.getTime();

    const returned = this.props.addSpot({
        variables: {
          name: this.state.name,
          nickname: this.state.nickname,
          description: this.state.description,
          directions: this.state.directions,
          bathymetry: this.state.bathymetry,
          wavetype: this.state.wavetype,
          wavedirection: this.state.wavedirection,
          wavelandmarks: this.state.wavelandmarks,
          datecreated: timestamp
        },
    }).then((graphqlObject) => {
      console.log("what is this", this)
      let locationId = graphqlObject.data.insert_Waves.returning[0].locationid
      let waveId = graphqlObject.data.insert_Waves.returning[0].id
      this.props.addRating({
        variables: {
          waveid: waveId,
          wavelength: this.state.wavelength,
          wavequality: this.state.wavequality,
          wavehollowness: this.state.wavehollowness,
          wavedanger: this.state.wavedanger,
          userid: 1,
          windangleone: this.state.windangleone,
          windangletwo: this.state.windangletwo,
          lowtide: this.state.lowtide,
          hightide: this.state.hightide,
          waveseasonstart: this.state.waveseasonstart,
          waveseasonend: this.state.waveseasonend
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
    console.log(this.props)
    return (
      <div>
        <form>
          <div>
            <TextField
              variant="outlined"
              type="text"
              className={classes.textField}
              helperText="Name The Spot"
              margin="normal"
              name="name"
              value={this.state.name} onChange={this.handleChange}
            />
          </div>
          <div>
            <TextField
              variant="outlined"
              type="text"
              className={classes.textField}
              helperText="Nickname"
              margin="normal"
              name="nickname"
              value={this.state.nickname} onChange={this.handleChange}
            />
          </div>
          <div>
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
          </div>
          <div>
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
          </div>
          <div>
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
          </div>
          <div>
            <TextField
              id="direction"
              select
              className={classes.textField}
              value={this.state.direction}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
              helperText="Select Direction"
              margin="normal"
              variant="outlined"
              name="direction"
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
          </div>
          <div>
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
          </div>
          <div>
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
          </div>
          <div>
            <Slider
              id="wavelength"
              name="wavelength"
              marks={waveLengthMarks}
              value={this.state.wavelength}
              onChange={this.waveLengthChange}
            />
          </div>
          <div>
            <Slider
              id="wavequality"
              name="wavequality"
              marks={waveQualityMarks}
              value={this.state.wavequality}
              onChange={this.waveQualityChange}
            />
          </div>
          <div>
            <Slider
              id="wavehollowness"
              name="wavehollowness"
              marks={waveHollownessMarks}
              value={this.state.wavehollowness}
              onChange={this.waveHollownessChange}
            />
          </div>
          <div>
            <Slider
              id="wavedanger"
              name="wavedanger"
              marks={waveDangerMarks}
              value={this.state.wavedanger}
              onChange={this.waveDangerChange}
            />
          </div>
          <div>
            <Slider
              id="tiderange"
              name="tiderange"
              marks={tideMarks}
              value={this.state.tideRange}
              onChange={this.tideRangeChange}
            />
          </div>
          <div>
            <TextField
              variant="outlined"
              type="number"
              className={classes.textField}
              helperText="Starting Wind Angle"
              margin="normal"
              name="windangleone"
              value={this.state.windangleone} onChange={this.handleChange}
            />
          </div>
          <div>
            <TextField
              variant="outlined"
              type="number"
              className={classes.textField}
              helperText="Ending Wind Angle"
              margin="normal"
              name="windangletwo"
              value={this.state.windangletwo} onChange={this.handleChange}
            />
          </div>
          <div>
            <TextField
              variant="outlined"
              type="number"
              className={classes.textField}
              helperText="Starting Swell Angle"
              margin="normal"
              name="swellangleone"
              value={this.state.swellangleone} onChange={this.handleChange}
            />
          </div>
          <div>
            <TextField
              variant="outlined"
              type="number"
              className={classes.textField}
              helperText="Ending Swell Angle"
              margin="normal"
              name="swellangletwo"
              value={this.state.swellangletwo} onChange={this.handleChange}
            />
          </div>
          <div>
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
          </div>
          <div>
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
          </div>
          <button onClick={this.handleSubmit} />
        </form>
        <Map onChangeCoords={this.onChangeCoords} />
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
