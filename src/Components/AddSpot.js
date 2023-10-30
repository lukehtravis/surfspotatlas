import React, {useState} from 'react'
import { useMutation } from "react-apollo";
import gql from "graphql-tag";
import { Auth0Context } from "../react-auth0-wrapper";
import Map from './Map';
import {withStyles} from "@material-ui/core/styles";
import {ADD_SPOT, INSERT_LOCATION, ADD_RATING} from "../utils/queries";
import {waveLengthMarks, waveQualityMarks, waveHollownessMarks, waveDangerMarks, waveCrowdMarks, tideMarks} from "../utils/labels";
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

const AddSpot = ({classes, history}) => {

  // ADD_SPOT, INSERT_LOCATION, ADD_RATING
  const [addMutation, {data:addData, loading:addLoading, error: addError}] = useMutation(gql`${ADD_SPOT}`)
  const [insertLocation, {data: locationData, loading:locationLoading, error:locationError}] = useMutation(gql`${INSERT_LOCATION}`)
  const [addRating, {data: ratingData, loading: ratingLoading, error: ratingError}] = useMutation(gql`${ADD_RATING}`)
  
  const [state, setState] = useState({
    lat: 0,
    long: 0,
    tideRange: [10, 90]
  })
const [submitReady, setSubmitReady] = useState(false)


  const contextType = Auth0Context;

  const onChangeCoords = (long, lat, continent, country, region, area) => {
    setState({...state, 
      lat: lat,
      long: long,
      continent: continent,
      country: country,
      region: region,
      area: area
    })
  }

  const handleChange = (event) => {
    const target = event.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;


    setState({...state,
      [name]: value
    })
  }

  const waveLengthChange = (event, newValue) => {
    setState({...state,wavelength: newValue})
  }

  const waveQualityChange = (event, newValue) => {
    setState({...state, wavequality: newValue})
  }

  const waveDangerChange = (event, newValue) => {
    setState({...state, wavedanger: newValue})
  }

  const waveHollownessChange = (event, newValue) => {
    setState({...state,wavehollowness: newValue})
  }

  const waveCrowdChange = (event, newValue) => {
    setState({...state,wavecrowd: newValue})
  }

  const windAngleOne = (event) => {
    setState({...state,windangleone: Number(event.target.value)})
  }

  const windAngleTwo = (event) => {
    setState({...state, windangletwo: Number(event.target.value)})
  }

  const tideRangeChange = (event, newValue) => {
    setState({...state,tideRange: [newValue[0], newValue[1]]})
  }

  const seasonStartChange = (event) => {
    const target = event.target
    let newValue = target.value
    const waveSeasonStartValue = convertMonthToDay(newValue)
    setState({...state, waveSeasonStartLabel: newValue, waveseasonstart: Number(waveSeasonStartValue)})
  }

 const seasonEndChange = (event) => {
    const target = event.target
    let newValue = target.value
    const waveSeasonEndValue = convertMonthToDay(newValue)
    setState({...state, waveSeasonEndLabel: newValue, waveseasonend: Number(waveSeasonEndValue)})
  }

  const handleSubmit = (event) => {
    // Two graphql mutations are necessary each time a user submits a new wave
    // The first addSpot(), is required to populate Wave table data about this wave
    // The second, addRating, takes the waveId generated from the addSpot mutation,
    // and proceeds to add information about the waves attributes in the Wave_Ratings table
    // Also, a location entry is added to the Locations table
    event.preventDefault();
   
    const timestamp = new Date();
    const user = contextType.user ? contextType.user.sub : "anonymous"
    const waveDetails = {
      name: state.name,
      nickname: state.nickname,
      description: state.description,
      directions: state.directions,
      bathymetry: state.bathymetry,
      wavetype: state.wavetype,
      wavedirection: state.wavedirection,
      wavelandmarks: state.wavelandmarks,
      datecreated: timestamp,
      createdby: user
    }
    const missingProperties = []
    for (const [key, value] of Object.entries(waveDetails)) {
      if (!value) {
        missingProperties.push(key)
      }
    }
    
    if (missingProperties.length > 0) {
      alert(`Missing the following value(s): ${missingProperties.join(",")}\n Please add them and try submitting the form again`)
      return null;
    }
    
    addMutation({
        variables: waveDetails
    })
    setSubmitReady(true)
  }
    
  if (addLoading || locationLoading || ratingLoading) {
    return "Stirring soup..."
  }
  if (addData && submitReady) {
    
    let locationId = addData.insert_Waves.returning[0].id
    let waveId = addData.insert_Waves.returning[0].id
    let userId = addData.insert_Waves.returning[0].createdby
    const locationObject = {
      locationId: locationId,
      longitude: state.long,
      latitude: state.lat,
      continent: state.continent,
      country: state.country,
      region: state.region,
      area: state.area
    }

    const ratingObject = {
      waveid: waveId,
      wavelength: state.wavelength,
      wavequality: state.wavequality,
      wavehollowness: state.wavehollowness,
      wavedanger: state.wavedanger,
      wavecrowd: state.wavecrowd,
      userid: userId,
      windangleone: state.windangleone,
      windangletwo: state.windangletwo,
      lowtide: state.tideRange[0],
      hightide: state.tideRange[1],
      waveseasonstart: state.waveseasonstart,
      waveseasonend: state.waveseasonend,
      swellangleone: state.swellangleone,
      swellangletwo: state.swellangletwo,
    }
    let missingProperties = []
    Object.entries({...locationObject, ...ratingObject}).forEach(([key, value]) => {
      if (!value) {
        missingProperties.push(key)
      }
    })
    if (missingProperties.length > 0) {
      alert(`Missing following part(s) of location: ${missingProperties.join(",")}`)
      setSubmitReady(false)
      return null
    }
    insertLocation({
      variables: {
        locationId: locationId,
        longitude: state.long,
        latitude: state.lat,
        continent: state.continent,
        country: state.country,
        region: state.region,
        area: state.area
      }
    })
    addRating({
      variables: ratingObject
    })
  }
  if (addError || locationError || ratingError) {
    setSubmitReady(false)
    return <p>Error adding to db</p>
  }
  if (locationData && ratingData && addData) {
    history.push(`/Wave/${addData.insert_Waves.returning[0].id}`)
  }
    return (
      <div>
        <Grid className={classes.gridContainer}>
          <Typography className={classes.formHeader}>Create A New Spot</Typography>
          <form onSubmit={handleSubmit}>
            <Grid container justify="space-between">
              <Grid xs={12} md={6} item>
                <TextField
                  variant="outlined"
                  required
                  type="text"
                  className={classes.textField}
                  label="Wave Name"
                  margin="normal"
                  name="name"
                  value={state.name} onChange={handleChange}
                />
              </Grid>
              <Grid xs={12} md={5} item>
                <TextField
                  variant="outlined"
                  required
                  type="text"
                  className={classes.textField}
                  label="Nickname"
                  margin="normal"
                  name="nickname"
                  value={state.nickname} onChange={handleChange}
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
                  required
                  value={state.description} onChange={handleChange}
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
                  required
                  margin="normal"
                  name="directions"
                  value={state.directions} onChange={handleChange}
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
                  value={state.bathymetry}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  helperText="Select Bathymetry"
                  margin="normal"
                  variant="outlined"
                  name="bathymetry"
                  required
                  onChange={handleChange}
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
                  value={state.wavedirection}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  helperText="Select Direction"
                  margin="normal"
                  variant="outlined"
                  name="wavedirection"
                  required
                  onChange={handleChange}
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
                  value={state.wavetype}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  helperText="Select Type"
                  margin="normal"
                  variant="outlined"
                  name="wavetype"
                  required
                  onChange={handleChange}
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
                  required
                  className={classes.textField}
                  value={state.wavelandmarks}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  helperText="Select Landmarks"
                  margin="normal"
                  variant="outlined"
                  name="wavelandmarks"
                  onChange={handleChange}
                >
                   <MenuItem key="select" value="none">
                    None
                  </MenuItem>
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
                  required
                  id="wavelength"
                  name="wavelength"
                  marks={waveLengthMarks}
                  value={state.wavelength}
                  onChange={waveLengthChange}
                />
              </Grid>
              <Grid item xs={12} md={6} className={classes.sliderSection}>
              <Typography className={classes.sliderTitle} gutterBottom>
                Wave Quality
              </Typography>
                <Slider
                  className="slider-input"
                  required
                  id="wavequality"
                  name="wavequality"
                  marks={waveQualityMarks}
                  value={state.wavequality}
                  onChange={waveQualityChange}
                />
              </Grid>
              <Grid item xs={12} md={6} className={classes.sliderSection}>
                <Typography className={classes.sliderTitle} gutterBottom>
                  Wave Hollowness
                </Typography>
                <Slider
                  className="slider-input"
                  required
                  id="wavehollowness"
                  name="wavehollowness"
                  marks={waveHollownessMarks}
                  value={state.wavehollowness}
                  onChange={waveHollownessChange}
                />
              </Grid>
              <Grid item xs={12} md={6} className={classes.sliderSection}>
                <Typography className={classes.sliderTitle} gutterBottom>
                  Wave Danger
                </Typography>
                <Slider
                  className="slider-input"
                  required
                  id="wavedanger"
                  name="wavedanger"
                  marks={waveDangerMarks}
                  value={state.wavedanger}
                  onChange={waveDangerChange}
                />
              </Grid>
              <Grid item xs={12} md={6} className={classes.sliderSection}>
                <Typography className={classes.sliderTitle} gutterBottom>
                  Wave Danger
                </Typography>
                <Slider
                  className="slider-input"
                  id="wavecrowd"
                  required
                  name="wavecrowd"
                  marks={waveCrowdMarks}
                  value={state.wavecrowd}
                  onChange={waveCrowdChange}
                />
              </Grid>
              <Grid item xs={12} md={6} className={classes.sliderSection}>
                <Typography className={classes.sliderTitle} gutterBottom>
                  Ideal Tide Range
                </Typography>
                <Slider
                  className="slider-input"
                  required
                  id="tiderange"
                  name="tiderange"
                  marks={tideMarks}
                  value={state.tideRange}
                  onChange={tideRangeChange}
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
                  required
                  margin="normal"
                  name="windangleone"
                  value={state.windangleone} onChange={windAngleOne}
                />
              </Grid>
              <Grid item xs={12} md={5}>
                <TextField
                  variant="outlined"
                  type="number"
                  className={classes.textField}
                  helperText="Ending Wind Angle"
                  required
                  margin="normal"
                  name="windangletwo"
                  value={state.windangletwo} onChange={windAngleTwo}
                />
              </Grid>
              <Grid item xs={12} md={5}>
                <TextField
                  variant="outlined"
                  type="number"
                  className={classes.textField}
                  helperText="Starting Swell Angle"
                  required
                  margin="normal"
                  name="swellangleone"
                  value={state.swellangleone} onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={5}>
                <TextField
                  variant="outlined"
                  type="number"
                  className={classes.textField}
                  helperText="Ending Swell Angle"
                  required
                  margin="normal"
                  name="swellangletwo"
                  value={state.swellangletwo} onChange={handleChange}
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  id="waveseasonstart"
                  select
                  required
                  className={classes.textField}
                  value={state.waveSeasonStartLabel}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  helperText="When does surf season start"
                  margin="normal"
                  variant="outlined"
                  name="waveseasonstart"
                  onChange={seasonStartChange}
                >
                  <MenuItem key="january" value="january">
                    January
                  </MenuItem>
                  <MenuItem key="february" value="february">
                    February
                  </MenuItem>
                  <MenuItem key="march" value="march">
                    March
                  </MenuItem>
                  <MenuItem key="april" value="april">
                    April
                  </MenuItem>
                  <MenuItem key="may" value="may">
                    May
                  </MenuItem>
                  <MenuItem key="june" value="june">
                    June
                  </MenuItem>
                  <MenuItem key="july" value="july">
                    July
                  </MenuItem>
                  <MenuItem key="august" value="august">
                    August
                  </MenuItem>
                  <MenuItem key="september" value="september">
                    September
                  </MenuItem>
                  <MenuItem key="october" value="october">
                    October
                  </MenuItem>
                  <MenuItem key="november" value="november">
                    November
                  </MenuItem>
                  <MenuItem key="december" value="december">
                    December
                  </MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={5}>
                <TextField
                  id="waveseasonend"
                  select
                  required
                  className={classes.textField}
                  value={state.waveSeasonEndLabel}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  helperText="When does surf season end"
                  margin="normal"
                  variant="outlined"
                  name="waveseasonend"
                  onChange={seasonEndChange}
                >
                   <MenuItem key="january" value="january">
                    January
                  </MenuItem>
                  <MenuItem key="february" value="february">
                    February
                  </MenuItem>
                  <MenuItem key="march" value="march">
                    March
                  </MenuItem>
                  <MenuItem key="april" value="april">
                    April
                  </MenuItem>
                  <MenuItem key="may" value="may">
                    May
                  </MenuItem>
                  <MenuItem key="june" value="june">
                    June
                  </MenuItem>
                  <MenuItem key="july" value="july">
                    July
                  </MenuItem>
                  <MenuItem key="august" value="august">
                    August
                  </MenuItem>
                  <MenuItem key="september" value="september">
                    September
                  </MenuItem>
                  <MenuItem key="october" value="october">
                    October
                  </MenuItem>
                  <MenuItem key="november" value="november">
                    November
                  </MenuItem>
                  <MenuItem key="december" value="december">
                    December
                  </MenuItem>
                </TextField>
              </Grid>
            </Grid>
            <Map onChangeCoords={onChangeCoords} />
            <Button type="submit" className={classes.submitButton}>Submit</Button>
          </form>
        </Grid>
      </div>
    )
}

export default withStyles(styles)(AddSpot)
