import React, {Component} from "react";
import {Link} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import StaticProgressBar from "./StaticProgressBar";
import TableSortLabel from '@material-ui/core/TableSortLabel';
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
    overflowX: 'auto',
  },
  table: {
    minWidth: 200,
  },
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

const headCells = [
  { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
  { id: 'area', numeric: false, disablePadding: false, label: 'Area' },
  { id: 'direction', numeric: false, disablePadding: false, label: 'Direction' },
  { id: 'bathymetry', numeric: false, disablePadding: false, label: 'Bottom' },
  { id: 'waveQuality', numeric: true, disablePadding: false, label: 'Quality' },
  { id: 'waveDanger', numeric: true, disablePadding: false, label: 'Danger' }
];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={order}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? '' : ''}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
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
        <Table className={classes.table} aria-label="simple table">
          <EnhancedTableHead
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
                    <TableCell component="th" id={labelId} component={Link} to={`Wave/${spot.id}`} scope="row">
                      {spot.name}
                    </TableCell>
                    <TableCell align="left" component={Link} to={`Area/${spot.area}`}>{spot.area}</TableCell>
                    <TableCell align="left">{directionStringConverter(spot.direction)}</TableCell>
                    <TableCell align="left">{bathymetryStringConverter(spot.bathymetry)}</TableCell>
                    <TableCell align="right"><StaticProgressBar value={Math.round(spot.quality)} /></TableCell>
                    <TableCell align="right"><StaticProgressBar value={Math.round(spot.danger)} /></TableCell>
                  </TableRow>
                )
              })
            }
          </TableBody>
        </Table>
      </Paper>
    </div>
  )
}
