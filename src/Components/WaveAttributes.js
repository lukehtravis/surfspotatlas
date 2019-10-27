import React, {Component} from "react";
import {graphql} from "react-apollo";
import gql from "graphql-tag";
import { compose } from 'react-apollo';
import WaveQuality from "./WaveQuality";
import WaveHollowness from "./WaveHollowness";
import WaveDanger from "./WaveDanger";
import WaveLength from "./WaveLength";
import AngleRangeCircle from "./AngleRangeCircle";
import TideSlider from "./TideSlider";
import {withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import StaticProgressBar from "./StaticProgressBar";
import { Auth0Context } from "../react-auth0-wrapper";
import {ADD_RATING} from "../utils/queries";
import {FETCH_WAVE} from "../utils/queries";
import {FETCH_WAVE_ATTRIBUTES} from "../utils/queries";
import { waveAttributeHeadings } from "../utils/styleComponents";
import {bathymetryStringConverter, directionStringConverter, waveTypeStringConverter} from "../utils/dbNameConversions";

const styles = theme => ({
  Paper: {
    backgroundColor: theme.palette.background.default,
    width: "100%",
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  smallPaper: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
    marginTop: theme.spacing(3),
    boxShadow: "none",
    borderRadius: 0
  },
  longPaper: {
    backgroundColor: theme.palette.background.default,
    boxShadow: "none",
    borderRadius: 0,
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  Grid: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3)
  },
  attributeHeader: waveAttributeHeadings,
  h6: theme.typography.h6,
  h6Margin: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(0),
    color: "#616161",
    fontSize: "1rem",
    textTransform: "uppercase"
  },
  circleHeaders: {
    fontSize: "1rem",
    textAlign: "center",
  },
  paragraph: {
    fontSize: "0.7rem"
  },
  dialsContainer: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(0)
  },
  alignSelf: {
    textAlign: "center"
  },
  waveTypeTextContainer: {
    textAlign: "center"
  },
  waveTypeTextType: {
    display: "inline"
  },
})

class WaveAttributes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rerender: false,
      waveAttributes: {}
    }
  }

  static contextType = Auth0Context;

  getAttributeName = (waveStatsObject, waveAttributeName) => {
    return Object.keys(waveStatsObject).find(key => waveStatsObject[key] === waveAttributeName);
  };

  voteOnAttribute = (someObject) => {
    this.setState({
      waveAttributes: {
        ...this.state.waveAttributes,
        ...someObject
      }
    })
  }

  handleVoteSubmit = (user) => {
    Object.keys(this.state)
    this.props.addRating({
      variables: {
        waveid: this.props.waveId,
        ...this.state.waveAttributes,
        userid: user.sub
      },
      refetchQueries: () => [{ query: gql`${FETCH_WAVE_ATTRIBUTES}`, variables: {id: this.props.waveId} }]
    }).then((graphqlObject) => {
      console.log("arrive at thennable", graphqlObject)
    })
  }

  render() {
    if (this.props.FetchWaveAttributes.loading) {
      return "Loading.."
    }
    const {classes, waveDetails} = this.props
    const { isAuthenticated, loginWithRedirect, logout, user } = this.context
    const waveStats = this.props.FetchWaveAttributes.Waves[0].Wave_Ratings_aggregate.aggregate.avg
    console.log("waveDetails", waveStats)
    return (
      <div>
        <Paper className={classes.Paper}>
          <Grid container className={classes.Grid}>
            <Grid item xs={3}>
              <WaveQuality voteOnAttribute={this.voteOnAttribute} attributeValue={waveStats.wavequality} attributeName="wavequality" />
            </Grid>
            <Grid item xs={3}>
              <WaveHollowness voteOnAttribute={this.voteOnAttribute} attributeValue={waveStats.wavehollowness} attributeName="wavehollowness" />
            </Grid>
            <Grid item xs={3}>
              <WaveDanger voteOnAttribute={this.voteOnAttribute} attributeValue={waveStats.wavedanger} attributeName="wavedanger" />
            </Grid>
            <Grid item xs={3}>
              <WaveLength voteOnAttribute={this.voteOnAttribute} attributeValue={waveStats.wavelength} attributeName="wavelength" />
            </Grid>
          </Grid>
        </Paper>
        <Grid container className={classes.Grid} justify={"space-between"}>
          <Grid item xs={6}>
            <Paper className={classes.smallPaper}>
              <h6 className={`${classes.h6} ${classes.h6Margin}`}>Description</h6>
              <Typography className={classes.paragraph}>{waveDetails.description}</Typography>
              <h6 className={`${classes.h6} ${classes.h6Margin}`}>Directions</h6>
              <Typography className={classes.paragraph}>{waveDetails.directions}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={5}>
            <Paper className={classes.smallPaper}>
              <TideSlider />
              <Grid container justify="space-between" className={classes.dialsContainer}>
                <Grid item xs={6} className={classes.alignSelf}>
                  <Typography className={classes.circleHeaders}>Best Wind</Typography>
                  <AngleRangeCircle voteOnAttribute={this.voteOnAttribute} attributeValue={[waveStats.windangleone, waveStats.windangletwo]} attributeName={["windangleone", "windangletwo"]} />
                </Grid>
                <Grid item xs={6} className={classes.alignSelf}>
                  <Typography className={classes.circleHeaders}>Best Swell</Typography>
                  <AngleRangeCircle voteOnAttribute={this.voteOnAttribute} attributeValue={[waveStats.windangleone, waveStats.windangletwo]} attributeName={["windangleone", "windangletwo"]} />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        <Grid container className={classes.Grid} justify={"space-around"}>
          <Grid item xs={12}>
            <Paper className={classes.longPaper}>
              <Grid container>
                <Grid item xs={4} >
                  <Typography className={`${classes.attributeHeader} ${classes.alignSelf}`}>Type</Typography>
                  <div className={classes.waveTypeTextContainer}>
                    <Typography className={classes.waveTypeTextType}>{bathymetryStringConverter(waveDetails.bathymetry)}</Typography>
                    <Typography className={classes.waveTypeTextType}> | </Typography>
                    <Typography className={classes.waveTypeTextType}>{waveTypeStringConverter(waveDetails.wavetype)}</Typography>
                  </div>
                </Grid>
                <Grid item xs={4} >
                  <Typography className={`${classes.attributeHeader} ${classes.alignSelf}`}>Direction</Typography>
                  <div className={classes.waveTypeTextContainer}>
                    <Typography className={classes.waveTypeTextType}>{directionStringConverter(waveDetails.wavedirection)}</Typography>
                  </div>
                </Grid>
                <Grid item xs={4} >
                  <Typography className={`${classes.attributeHeader} ${classes.alignSelf}`}>Features</Typography>
                  <div className={classes.waveTypeTextContainer}>
                    <Typography className={classes.waveTypeTextType}>{directionStringConverter(waveDetails.wavelandmarks)}</Typography>
                  </div>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        {isAuthenticated && (
          <div>
            <Button onClick={() => this.handleVoteSubmit(user)}>Vote On Wave Attributes</Button>
          </div>
        )}
      </div>
    )
  }
}

export default compose(
  graphql(gql`${FETCH_WAVE_ATTRIBUTES}`, {
    options: (props) => {return {variables: {id: props.waveId}}},
    name: "FetchWaveAttributes"
  }),
  graphql(gql`${ADD_RATING}`, {
    name: "addRating"
  })
)(withStyles(styles)(WaveAttributes));
