import React, {Component} from "react";
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';

class Header extends Component {
  render() {
    return (
      <Grid container spacing={24}>
        <AppBar>
          <p>Surf Spot Atlas</p>
        </AppBar>
      </Grid>
    )
  }
}

export default Header;
