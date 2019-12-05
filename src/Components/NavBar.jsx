import React from 'react';
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import {Link} from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { useAuth0 } from "../react-auth0-wrapper";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function NavBar() {
  const classes = useStyles();
  //const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElPrimary, setAnchorElPrimary] = React.useState(null);
  const open = Boolean(anchorEl);
  const openPrimary = Boolean(anchorElPrimary);
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const { loading, user } = useAuth0();

  const handleChange = event => {
    //setAuth(event.target.checked);
  };

  const handleMenuClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handlePrimaryMenuClick = event => {
    setAnchorElPrimary(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClosePrimary = () => {
    setAnchorElPrimary(null);
  }

  const handleLoginClose = () => {
    if (!isAuthenticated) {
      loginWithRedirect({})
    } else {
      logout()
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" onClick={handlePrimaryMenuClick} className={classes.menuButton} color="inherit" aria-haspopup="true" aria-controls="primary-menu" aria-label="primary-menu">
            <MenuIcon />
          </IconButton>
          <Menu
           id="primary-menu"
           anchorEl={anchorElPrimary}
           anchorOrigin={{
             vertical: 'top',
             horizontal: 'right',
           }}
           keepMounted
           transformOrigin={{
             vertical: 'top',
             horizontal: 'right',
           }}
           open={anchorElPrimary}
           onClose={handleClosePrimary}
          >
            <MenuItem onClick={handleClosePrimary} to="/AddSpot" component={Link} >
              Add Spot
            </MenuItem>
            <MenuItem onClick={handleClosePrimary} to="/Search" component={Link} >
              Search
            </MenuItem>
          </Menu>
          <Typography variant="h6" className={classes.title}>
            <Link to="/" style={{ textDecoration: 'none', color: "#fff" }}>The Surf Spot Atlas</Link>
          </Typography>
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenuClick}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              {isAuthenticated && ("Log In") && (
                <MenuItem onClick={handleClose} component={Link} to={"/profile"} >
                  Profile
                </MenuItem>
              )}
              <MenuItem onClick={handleLoginClose}>
                {!isAuthenticated && ("Log In")}
                {isAuthenticated && ("Log Out")}
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
