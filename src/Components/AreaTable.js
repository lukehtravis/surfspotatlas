import React from "react";
import {Link} from "react-router-dom";
import { useAuth0 } from "../react-auth0-wrapper";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import StaticProgressBar from "./StaticProgressBar";
import EnhancedTableHeader from "./EnhancedTableHeader";
import Can from "./Can";
import {bathymetryStringConverter, directionStringConverter} from "../utils/dbNameConversions";

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
    backgroundColor: theme.palette.background.default
  },
  table: {
    minWidth: 200,
    width: "90%",
    margin: `${theme.spacing(4)}px auto`,
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

export default function SearchedSpotsTable(props) {
  const classes = useStyles();
  const {spots} = props;
  const {user, loading} = useAuth0();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('area');

  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  };

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  console.log(user)
  return (
    <div>
      <Paper className={classes.root}>
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
                     <Can
                      role={user.role}
                      perform="spots:delete"
                      yes={() => (
                        <span>x</span>
                      )}
                      no={() => null}
                    />
                    <TableCell className={classes.tableCell} id={labelId} component={Link} to={`../Wave/${spot.id}`} scope="row">
                      {spot.name}
                    </TableCell>
                    <TableCell className={classes.tableCell} align="left">{spot.area}</TableCell>
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
      </Paper>
    </div>
  )
}
