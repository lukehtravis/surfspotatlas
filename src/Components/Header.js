import React, {Component} from "react";
import Grid from '@material-ui/core/Grid';
import { Link, Route } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

class Header extends Component {
  render() {
    return (
      <div>
        <p>Surf Spot Atlas</p>
        <p><Link to="/AddSpot">Add Spot</Link></p>
        <Fab>
          <AddIcon />
        </Fab>
      </div>
    )
  }
}

export default Header;
