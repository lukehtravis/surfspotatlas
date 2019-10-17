import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import HomeHeroLayout from './HomeHeroLayout';
import heroImage from '../images/surfboardheroimage.jpg'

const styles = theme => ({
  background: {
    backgroundImage: `url(${heroImage})`,
    backgroundColor: '#7fc7d9', // Average color of the background image.
    backgroundPosition: 'center',
  },
  button: {
    minWidth: 200,
  },
  h5: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(10),
    },
  },
  more: {
    marginTop: theme.spacing(2),
  },
});

function HomeHero(props) {
  const { classes } = props;

  return (
    <HomeHeroLayout backgroundClassName={classes.background}>
      {/* Increase the network loading priority of the background image. */}
      <img style={{ display: 'none' }} src={heroImage} alt="increase priority" />
      <Typography color="inherit" align="center" variant="h2" marked="center">
        welcome to the surf spot atlas
      </Typography>
      <Typography color="inherit" align="center" variant="h5" className={classes.h5}>
        Browse a catalogue of surf spots all over the world
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        className={classes.button}
        component="a"
        href="/Search"
      >
        Search
      </Button>
      <Typography variant="body2" color="inherit" className={classes.more}>
        Or scan the short list below
      </Typography>
    </HomeHeroLayout>
  );
}

HomeHero.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomeHero);
