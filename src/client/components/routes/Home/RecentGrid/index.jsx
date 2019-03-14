import React from 'react'
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core';
//import DummyData from 'Utils/DummyData'

class RecentGrid extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <Grid id="RecentGridContainer" className="wrapper">
        <Grid container className={`wrapper`}>
          <Typography variant="h5">Recent Trips</Typography>
        </Grid>
      </Grid>
    );
  }
}

export default RecentGrid
