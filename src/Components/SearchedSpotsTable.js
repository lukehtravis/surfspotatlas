import React, {Component} from "react";
import {Link} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import StaticProgressBar from "./StaticProgressBar";
import {bathymetryStringConverter, directionStringConverter} from "../utils/dbNameConversions";

const styles = theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 200,
  },
});

class SearchedSpotsTable extends Component {
  constructor(props) {
    super(props);

  }


  render(){
    const {spots, classes} = this.props

    return (
      <div>
        <Paper className={classes.root}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="left">Area</TableCell>
                <TableCell align="left">Direction</TableCell>
                <TableCell align="left">Bathymetry</TableCell>
                <TableCell align="center">Quality</TableCell>
                <TableCell align="center">Danger</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {spots.map(spot => (
                <TableRow key={spot.name}>
                  <TableCell component="th" component={Link} to={`Wave/${spot.id}`} scope="row">
                    {spot.name}
                  </TableCell>
                  <TableCell align="left">{spot.area}</TableCell>
                  <TableCell align="left">{directionStringConverter(spot.direction)}</TableCell>
                  <TableCell align="left">{bathymetryStringConverter(spot.bathymetry)}</TableCell>
                  <TableCell align="right"><StaticProgressBar value={Math.round(spot.quality)} /></TableCell>
                  <TableCell align="right"><StaticProgressBar value={Math.round(spot.danger)} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(SearchedSpotsTable);
