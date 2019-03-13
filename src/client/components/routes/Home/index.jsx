import React from 'react'
import Grid from '@material-ui/core/Grid'
import './styles.scss'
import Carousel from './Carousel'
import RecentGrid from './RecentGrid'

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

export default Home
  