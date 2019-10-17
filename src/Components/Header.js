import React, {Component} from "react";
import Grid from '@material-ui/core/Grid';
import { Link, Route } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import NavBar from './NavBar';

class Header extends Component {
  render() {
    return (
      <div>
        <NavBar />
      </div>
    )
  }
}

export default Header;
