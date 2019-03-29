//Core
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';

//UI Elements
import Grid from '@material-ui/core/Grid'

//Development Data

//Utils

//Components
import Carousel from './Carousel'
import About from './About'
import RecentGrid from './RecentGrid'

const styles = () => ({
  carouselContainer: {
    marginBottom: `3em`,
  }
})

function Home (props){
  const { classes } = props;
  return (
    <Grid container>
      <Carousel className={`${classes.carouselContainer}`} />
      <Grid container justify="center" direction="row">
        <About />
        <RecentGrid />
      </Grid>
    </Grid>  
  );
}

Home.propTypes = {
  classes: PropTypes.shape({

  }).isRequired,
}

export default withStyles(styles)(Home);