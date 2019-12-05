import React, {Component} from "react";
import PropTypes from "prop-types";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core/styles";

const styles = theme => ({
  backgroundColor: {
    backgroundColor: theme.palette.background.default,
  },
  Container: {
    paddingTop: "50px",
    paddingBottom: "50px"
  },
  Paper: {
    marginTop: "20px"
  },
  Text: {
    padding: "15px"
  }
})

const AboutSection = (props) => {
  const {classes} = props
  return (
    <div className={classes.backgroundColor}>
      <Container className={classes.Container}>
        <Typography variant="h2">What is the Surf Spot Atlas?</Typography>
        <Paper className={classes.Paper}>
          <Typography className={classes.Text}>
            The Surf Spot Atlas is a tool to help surfers find information about surf spots all over the world.
            To browse existing spots, you can visit the spot search feature. To add your own, you can visit the
            Add Spot feature.
            All content is uploaded and moderated by the community, so go ahead and add your favorite spot to the atlas for a start.
          </Typography>
        </Paper>
      </Container>
    </div>
  )
}

AboutSection.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(AboutSection)
