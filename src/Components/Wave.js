import React, { Component }  from 'react';
import Header from "./Header";
import Footer from "./Footer";
import ApolloClient from "apollo-boost";
import { graphql } from 'react-apollo';
import gql from "graphql-tag";
import {FETCH_WAVE} from "../utils/queries";
import WaveMap from "./WaveMap";
import WaveAttributes from "./WaveAttributes";
import WaveImagesSection from "./WaveImagesSection";
import {withStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';

const styles = theme => ({
  header: {
    margin: theme.spacing(3)
  },
  headerText: theme.typography.h4,
  breadcrumbContainer: {
    marginTop: theme.spacing(1)
  },
  breadcrumbText: theme.typography.h6,
  uppercase: {
    textTransform: "uppercase",
  },
  boldness: {
    fontWeight: 800
  },
  divider: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  }

})

const Wave = (props) => {

  if (!props.data.Waves) {
    return "Loading"
  }
  const {classes} = props
  const locationId = props.data.Waves[0].locationid;
  const {name, id, description, directions, nickname, bathymetry, wavetype, wavedirection, wavelandmarks} =  props.data.Waves[0];
  const waveId = props.data.Waves[0].id;
  const {area, region, country} = props.data.Waves[0].Locations[0];

  return (
    <div>
      <Grid container className={classes.header}>
        <Grid item>
          <Typography className={`${classes.headerText} ${classes.uppercase} ${classes.boldness}`} >{name}</Typography>
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
              <Typography className={`${classes.breadcrumbText} ${classes.uppercase}`}>{area}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <WaveMap waveId={props.match.params.id} locationId={locationId} />
      <WaveAttributes waveDetails={{description, directions, nickname, bathymetry, wavetype, wavedirection, wavelandmarks}} waveId={Number(id)} refetch={props.data.refetch} />
      <WaveImagesSection locationId={locationId} waveName={name} waveId={id} />
    </div>
  );
};

export default graphql(gql`${FETCH_WAVE}`, {
    options: (props) => { return { variables: {id: props.match.params.id}}}
})((withStyles(styles))(Wave))
