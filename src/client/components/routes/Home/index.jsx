import React from 'react'
import Grid from '@material-ui/core/Grid'
import './styles.scss'
import Carousel from './Carousel'

class Home extends React.Component {
  constructor(props) {
    super(props);
  } 

  render() {
    return (
      <Grid id="HomeContainer">
        <Carousel />
      </Grid>  
    );
  }
}

export default Home
  