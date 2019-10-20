import React, {Component} from "react";
import {graphql} from "react-apollo";
import gql from "graphql-tag";
import Slider from '@material-ui/core/Slider';
import {waveQualityMarks, waveDangerMarks} from "../utils/labels";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

// This component provides an interface for users to set filters on the types of
// waves that they are searching for. When users interact with form elements, the
// information is sent back up the the SearchFilters.js component via functions
// that have been passed down

const styles = theme => ({
  metaGrid: {
    marginTop: theme.spacing(2),
  },
  topSpacing: {
    marginTop: theme.spacing(2)
  },
  slider: {
    paddingTop: theme.spacing(4)
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
        <Typography className={classes.topSpacing}>
          Narrow your search to just the right waves
        </Typography>
        <Grid container justify="space-around" alignItems="center" className={classes.metaGrid} >
          <Grid item xs={11}>
            <Typography gutterBottom>
              Wave Quality
            </Typography>
            <Slider
              id="waveQuality"
              name="waveQuality"
              marks={waveQualityMarks}
              defaultValue={defaultValue}
              onChange={this.props.handleWaveQualityChange}
            />
          </Grid>
          <Grid item xs={11} className={classes.slider}>
            <Typography gutterBottom>
              Wave Danger
            </Typography>
            <Slider
              id="waveDanger"
              marks={waveDangerMarks}
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
