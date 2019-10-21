import React, {Component} from "react";
import {Link} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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
                <TableCell align="right">Area</TableCell>
                <TableCell align="right">Direction</TableCell>
                <TableCell align="right">Bathymetry</TableCell>
                <TableCell align="right">Quality</TableCell>
                <TableCell align="right">Quality</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {spots.map(spot => (
                <TableRow key={spot.name}>
                  <TableCell component="th" component={Link} to={`Wave/${spot.id}`} scope="row">
                    {spot.name}
                  </TableCell>
                  <TableCell align="right">{spot.area}</TableCell>
                  <TableCell align="right">{spot.direction}</TableCell>
                  <TableCell align="right">{spot.bathymetry}</TableCell>
                  <TableCell align="right">{spot.quality}</TableCell>
                  <TableCell align="right">{spot.danger}</TableCell>
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
