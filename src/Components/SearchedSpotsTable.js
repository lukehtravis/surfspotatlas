import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import StaticProgressBar from "./StaticProgressBar";
import EnhancedTableHeader from "./EnhancedTableHeader";
import {bathymetryStringConverter, directionStringConverter} from "../utils/dbNameConversions";

/*

  This component takes in spots array of objects from SurfSpotsList and creates a table
  that displays the spots for chosen areas. The table is sortable.

  Implementation derived from examples here
  https://material-ui.com/components/tables/

*/
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    paddingTop: `${theme.spacing(4)}px`,
    paddingBottom: `${theme.spacing(4)}px`,
    backgroundColor: theme.palette.background.default,
  },
  coloredBackground: {
    overflowX: 'auto',
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  table: {
    minWidth: 200,
    backgroundColor: theme.palette.background.paper,
    borderRadius: "5px"
  },
  tableCell: {
    border: "none"
  }
}));

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

SearchedSpotsTable.propTypes = {
  spots: PropTypes.array.isRequired
}

export default function SearchedSpotsTable(props) {
  const classes = useStyles();
  const {spots} = props;
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('area');
  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  };
  return (
    <div>
      <Paper className={classes.root}>
        <div className={classes.coloredBackground}>
          <Table className={classes.table} aria-label="simple table">
            <EnhancedTableHeader
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              classes={classes}
            />
            <TableBody>
              {stableSort(spots, getSorting(order, orderBy))
                //.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((spot, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow key={spot.name} hover>
                      <TableCell className={classes.tableCell} id={labelId} component={"th"} scope="row">
                        <Link to={`/Wave/${spot.id}`}>{spot.name}</Link>
                      </TableCell>
                      <TableCell className={classes.tableCell} align="left"><Link to={`/Area/${spot.area}`}>{spot.area}</Link></TableCell>
                      <TableCell className={classes.tableCell} align="left">{directionStringConverter(spot.direction)}</TableCell>
                      <TableCell className={classes.tableCell} align="left">{bathymetryStringConverter(spot.bathymetry)}</TableCell>
                      <TableCell className={classes.tableCell} align="center"><StaticProgressBar value={Math.round(spot.quality)} /></TableCell>
                      <TableCell className={classes.tableCell} align="center"><StaticProgressBar value={Math.round(spot.danger)} /></TableCell>
                    </TableRow>
                  )
                })
              }
            </TableBody>
          </Table>
        </div>
      </Paper>
    </div>
  )
}
