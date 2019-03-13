import React from 'react'
import Grid from '@material-ui/core/Grid'
import './styles.scss'
import { Typography } from '@material-ui/core';

class RecentGrid extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <Grid id="RecentGridContainer" className="wrapper">
        <Grid container>
          <Typography variant="h3">Recent Trips</Typography>
        </Grid>
      </Grid>
    );
  }
}

export default RecentGrid
