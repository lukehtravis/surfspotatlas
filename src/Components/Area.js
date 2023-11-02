import React from "react";
import PropTypes from "prop-types";
import { useQuery } from "react-apollo";
import gql from "graphql-tag";
import AreaMap from "./AreaMap";
import AreaTable from "./AreaTable";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { FETCH_AREA_LOCATION_DATA } from "../utils/queries";

const styles = (theme) => ({
  header: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    paddingLeft: theme.spacing(3),
  },
  breadcrumbContainer: {
    marginTop: theme.spacing(1),
  },
  headerText: theme.typography.h4,
  breadcrumbText: theme.typography.h6,
  uppercase: {
    textTransform: "uppercase",
  },
  divider: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
});

const Area = (props) => {
  const { loading, error, data } = useQuery(
    gql`
      ${FETCH_AREA_LOCATION_DATA}
    `,
    {
      variables: { areaName: decodeURI(props.match.params.areaName) },
    }
  );

  if (loading) return "Loading...";
  if (error) return `Error ${error}`;
  const { classes } = props;
  let country = "";
  let region = "";
  let mapLocations = data.Locations.map((location) => {
    country = location.country;
    region = location.region;
    return {
      id: location.id,
      locationId: location.locationId,
      latitude: location.latitude,
      longitude: location.longitude,
      region: location.region,
      country: location.country,
    };
  });
  let tableLocations = data.Locations.map((location) => {
    return {
      id: location.Wave.id,
      name: location.Wave.name,
      direction: location.Wave.wavedirection,
      bathymetry: location.Wave.bathymetry,
      quality: location.Wave.Wave_Ratings_aggregate.aggregate.avg.wavequality,
      danger: location.Wave.Wave_Ratings_aggregate.aggregate.avg.wavequality,
      area: props.match.params.areaName,
    };
  });

  return (
    <div>
      <Grid container className={classes.header}>
        <Grid item>
          <Typography
            className={`${classes.headerText} ${classes.uppercase} ${classes.boldness}`}
          >
            {props.match.params.areaName}
          </Typography>
          <Grid container className={classes.breadcrumbContainer}>
            <Grid item>
              <Typography
                className={`${classes.breadcrumbText} ${classes.uppercase}`}
              >
                {country}
              </Typography>
            </Grid>
            <span className={`${classes.breadcrumbText} ${classes.divider}`}>
              |
            </span>
            <Grid item>
              <Typography
                className={`${classes.breadcrumbText} ${classes.uppercase}`}
              >
                {region}
              </Typography>
            </Grid>
            <span className={`${classes.breadcrumbText} ${classes.divider}`}>
              |
            </span>
            <Grid item>
              <Typography
                className={`${classes.breadcrumbText} ${classes.uppercase}`}
              >
                {props.match.params.areaName}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <AreaMap areaSpots={mapLocations} />
      <AreaTable spots={tableLocations} />
    </div>
  );
};

Area.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      areaName: PropTypes.string.isRequired,
    }),
  }),
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Area);
