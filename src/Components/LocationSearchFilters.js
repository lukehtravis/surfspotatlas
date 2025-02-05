import React, {Component} from "react";
import PropTypes from "prop-types";
import {graphql} from "react-apollo";
import gql from "graphql-tag";
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import {FETCH_LOCATION_CATEGORIES} from "../utils/queries";
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from "@material-ui/core/Grid";
import Select from '@material-ui/core/Select';
import Typography from "@material-ui/core/Typography";
import Chip from '@material-ui/core/Chip';

// This component gets all Continents -> Countries -> Regions -> Areas in
// initial apollo graphql query
// Then stores results of query in variables that correspond to a level of the
// location heirarchy
// It iterates through those variables to create a resposive dropdown system,
// which is executed in handleChange.
// The areas that eventually get selected are sent back up to the SearchFilters component
// via this.props.handleAreaChange(value)

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

// Used for Area Multi-Select Input. Keeps height from expanding too much
// when users select many areas
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

class LocationSearchFilters extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    // Logic to define state based on orientation of dropdowns. Users are supposed
    // to fill the dropdowns out in order, so if they reset a dropdown higher up
    // the order (ie. continent), we need to reset the state and ui for all
    // dropdowns below it
    if (value !== "unchosen") {
      if (name === "continent") {
        this.setState({
          [name]: value,
          country: undefined,
          region: undefined,
          area: undefined
        });
      }
      if (name === "country") {
        this.setState({
          [name]: value,
          region: undefined,
          area: undefined
        });
      }
      if (name === "region") {
        this.setState({
          [name]: value,
          area: undefined
        });
      }
      if (name === "area") {
        this.props.handleAreaChange(value)
        this.setState({
          [name]: value,
        });
      }
    } else {
      if (name === "continent") {
        this.setState({
          continent: undefined,
          country: undefined,
          region: undefined,
          area: undefined
        })
      }
      if (name === "country") {
        this.setState({
          country: undefined,
          region: undefined,
          area: undefined
        })
      }
      if (name === "region") {
        this.setState({
          region: undefined,
          area: undefined
        })
      }
      if (name === "area") {
        this.setState({
          area: undefined
        })
      }
    }
  }

  render() {
    if (!this.props.data.continents) {
      return "Loading...This often takes a few seconds"
    }
    const { classes } = this.props;
    // Store props in seperate vars to avoid mutating state (props) directly
    let continents = this.props.data.continents;
    let countries = this.props.data.countries;
    let regions = this.props.data.regions;
    let areas = this.props.data.areas;
    if (this.state.continent) {
      countries = countries.filter((country) => country.continent === this.state.continent)
    } else {
      countries = []
    }
    if (this.state.continent && this.state.country) {
      regions = regions.filter((region) => region.country === this.state.country)
    } else {
      regions = []
    }
    if (this.state.continent && this.state.country && this.state.region) {
      areas = areas.filter((area) => area.region === this.state.region).map((area) => area.area);
    } else {
      areas = []
    }

    return (
      <div>
        <Typography className={classes.dense}>
          Choose the areas you would like to explore
        </Typography>
        <Grid container justify="space-between">
          <Grid item xs={12} md={5}>
            <div>
              <TextField
                id="continent"
                select
                label="Select"
                className={classes.textField}
                value={this.state.continent ? this.state.continent : "unchosen"}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu,
                  },
                }}
                helperText="Select A Continent"
                margin="normal"
                variant="outlined"
                name="continent"
                onChange={this.handleChange}
              >
                <MenuItem key="select" value="unchosen">
                  Select
                </MenuItem>
                {continents.map(option => (
                  <MenuItem key={option.continent} value={option.continent}>
                    {option.continent}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </Grid>
          <Grid item xs={12} md={5}>
            <div>
              <TextField
                id="country"
                select
                label="Select"
                className={classes.textField}
                value={this.state.country ? this.state.country : "unchosen"}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu,
                  },
                }}
                helperText="Select A Country"
                margin="normal"
                variant="outlined"
                name="country"
                onChange={this.handleChange}
              >
                <MenuItem key="select" value="unchosen">
                  Select
                </MenuItem>
                {countries.map(option => (
                  <MenuItem key={option.country} value={option.country}>
                    {option.country}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </Grid>
          <Grid item xs={12} md={5}>
            <div>
              <TextField
                id="region"
                select
                label="Select"
                className={classes.textField}
                value={this.state.region ? this.state.region : "unchosen"}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu,
                  },
                }}
                helperText="Select A Region"
                margin="normal"
                variant="outlined"
                name="region"
                onChange={this.handleChange}
              >
                <MenuItem key="select" value="unchosen">
                  Select
                </MenuItem>
                {regions.map(option => (
                  <MenuItem key={option.region} value={option.region}>
                    {option.region}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </Grid>
          <Grid item xs={12} md={5}>
            <div>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="select-multiple-chip">Area</InputLabel>
                <Select
                  multiple
                  value={this.state.area ? this.state.area : []}
                  onChange={this.handleChange}
                  input={<OutlinedInput id="area" />}
                  renderValue={selected => (
                    <div className={classes.chips}>
                      {selected.map(value => (
                        <Chip key={value} label={value} className={classes.chip} />
                      ))}
                    </div>
                  )}
                  name="area"
                  MenuProps={MenuProps}
                >
                  <MenuItem key="select" value="unchosen">
                    Select
                  </MenuItem>
                  {areas.map(option => (
                    <MenuItem key={option} value={option} >
                      {option}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>Choose Areas</FormHelperText>
              </FormControl>
            </div>
          </Grid>
        </Grid>
      </div>
    )
  }
}

LocationSearchFilters.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  handleAreaChange: PropTypes.func.isRequired
}

export default withStyles(styles)(graphql(gql`${FETCH_LOCATION_CATEGORIES}`)(LocationSearchFilters));
