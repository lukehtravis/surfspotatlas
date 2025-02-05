import React, {Component} from "react";
import PropTypes from "prop-types";
import LocationSearchFilters from "./LocationSearchFilters";
import WaveQualityFilters from "./WaveQualityFilters";
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import {withStyles} from "@material-ui/core/styles"

// This component get information from the WaveQualityFilters component whenever
// a user changes one of the form inputs, and stores it in local state so that
// user can submit them all at once whenever they choose. When submit button is
// pressed, the state is sent back up the chain to the Search.js component.

const styles = theme => ({
  button: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
})

class SearchFilters extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  // We must use a different function for each wave attribute because material ui
  // doesnt send information about which thing was clicked through the event handdler
  handleWaveQualityChange = (event, newValue) => {
    this.setState({waveQuality: {low: newValue[0], high: newValue[1]}})
  };

  handleWaveDangerChange = (event, newValue) => {
    this.setState({waveDanger: {low: newValue[0], high: newValue[1]}})
  }

  handleAreaChange = (areas) => {
    this.setState({areas: areas})
  }

  render() {
    let quality = [0,100]
    let danger = [0, 100]
    const {classes} = this.props
    if ("waveQuality" in this.state) {
      quality = [this.state.waveQuality.low, this.state.waveQuality.high]
    }
    if (this.state.waveDanger) {
      danger = [this.state.waveDanger.low, this.state.waveDanger.high]
    }
    return (
      <div className="MuiToolbar-gutters">
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <LocationSearchFilters handleAreaChange={this.handleAreaChange} />
            </Grid>
            <Grid item xs={12} md={6} >
              <WaveQualityFilters danger={danger} quality={quality} handleWaveQualityChange={this.handleWaveQualityChange} handleWaveDangerChange={this.handleWaveDangerChange} />
            </Grid>
          </Grid>
          <Button onClick={(event) => this.props.formSubmit(this.state, event)}
            color="secondary"
            variant="contained"
            size="large"
            className={classes.button}
          >
            Search
          </Button>
        </form>
      </div>
    )
  }
}

SearchFilters.propTypes = {
  classes: PropTypes.object.isRequired,
  formSubmit: PropTypes.func.isRequired
}

export default withStyles(styles)(SearchFilters)
