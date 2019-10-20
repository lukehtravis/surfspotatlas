import React, {Component} from "react";
import {graphql} from "react-apollo";
import gql from "graphql-tag";
import Slider from '@material-ui/core/Slider';
import {waveQualityMarks} from "../utils/labels";
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

// This component provides an interface for users to set filters on the types of
// waves that they are searching for. When users interact with form elements, the
// information is sent back up the the SearchFilters.js component via functions
// that have been passed down

const styles = theme => ({
  metaGrid: {
    marginTop: theme.spacing(5)
  }
})

class WaveQualityFilters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultValue: [1, 100]
    }
  }

  render() {
    const { classes } = this.props;
    const {defaultValue} = this.state
    return (
      <div>
        <Grid container justify="space-around" alignItems="center" className={classes.metaGrid} >
          <Grid item xs={5}>
            <Slider
              id="waveQuality"
              name="waveQuality"
              marks={waveQualityMarks}
              valueLabelDisplay="on"
              defaultValue={defaultValue}
              onChange={this.props.handleWaveQualityChange}
            />
          </Grid>
          <Grid item xs={5}>
            <Slider
              id="waveDanger"
              marks={waveQualityMarks}
              valueLabelDisplay="on"
              defaultValue={defaultValue}
              onChange={this.props.handleWaveDangerChange}
            />
          </Grid>
        </Grid>
      </div>
    )
  }

}

export default withStyles(styles)(WaveQualityFilters)
