import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles';

import Carousel from './Carousel'
import RecentGrid from './RecentGrid'

const styles = () => ({
  carouselContainer: {
    marginBottom: `1em`,
  }
})
class Home extends React.Component {
  constructor(props) {
    super(props);
  } 

  render() {
    return (
      <Grid id="HomeContainer">
        <Carousel />
        <RecentGrid />
      </Grid>  
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object,
}

export default withStyles(styles)(Home);