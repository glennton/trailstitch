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

class Home extends React.Component {
  constructor(props) {
    super(props);
  } 

  render() {
    const { classes } = this.props;
    return (
      <Grid container>
        <Carousel className={`${classes.carouselContainer}`}/>
        <Grid container justify="center" direction="row">
          <About />
          <RecentGrid />
        </Grid>
      </Grid>  
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object,
}

export default withStyles(styles)(Home);