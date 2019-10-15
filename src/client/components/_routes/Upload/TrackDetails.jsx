//Core
import React from 'react'
import PropTypes from 'prop-types'

//UI Elements
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';

//GraphQL Store

//Utils
import DateFnsUtils from '@date-io/date-fns'; //TODO change to moment if possible


//Component
import TrackInfoCard from 'Common/TrackInfoCard'

class TrackDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gpx: null,
    }
  }
  
  componentDidMount() {
    const { gpx } = this.props
    this.setState({
      gpx: gpx,
      dataLoaded: true
    })
  }

  handleNameChange = () => (event) => {
    const { target } = event
    this.setState({ 
      gpx: {
        name: target.value 
      }
    });
  };

  handleMetaChange = () => (event) => {
    const value = event.target.value || ''
    this.setState({
      gpx:{
        dateFirst: value
      }
    });
  };
  render() {
    // const { dateFirst, dateLast, totalElevationGain, totalElevationLoss, overallElevationHighest, overallElevationLowest, totalDistance } = this.state.gpx || ''
    // const { TotalElapsedTime } = this.state.gpx.info || ''
    //const trackDetails = this.state.gpxExtensions['gpxtrkx:TrackStatsExtension']
    const { dataLoaded, gpx } = this.state
    return dataLoaded ?    
      (      
        <Grid container justify="center">
          <Grid item xs={10}>
            <Grid container onClick={this.sampleFunction} direction="column">
              <TextField
                id="standard-name"
                label="Track Name:"
                value={gpx.name}
                onChange={this.handleNameChange('name')}
                margin="normal"
              />
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  margin="normal"
                  label="Track Start Date:"
                  value={gpx.dateFirst}
                  onChange={this.handleMetaChange('dateFirst')}
                  format='yyyy/MM/dd'
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Typography>Trip Info:</Typography>
            <Grid container direction="row">
              <Grid item sm={6}>
                <List>
                  <TrackInfoCard title='Total Distance' value={`${gpx.totalDistance}km`} icon='location_searching' />
                  <TrackInfoCard title='Ascent' value={`${gpx.totalElevationGain}`} icon='flight_takeoff' />
                  <TrackInfoCard title='Max Elevation' value={`${gpx.overallElevationHighest}`} icon='trending_up' />
                </List>
              </Grid>
              <Grid item sm={6}>
                <List>
                  <TrackInfoCard title='Elapsed Time' value={`${gpx.info.TotalElapsedTime}`} icon='access_time' />
                  <TrackInfoCard title='Descent' value={`${gpx.totalElevationLoss}`} icon='flight_land' />
                  <TrackInfoCard title='Min Elevation' value={`${gpx.overallElevationLowest}`} icon='trending_down' />
                </List>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
     )
     : ''
  }
}

TrackDetails.propTypes = {
  gpx: PropTypes.shape({

  })
}
TrackDetails.defaultProps = {
  gpx: null,
}
export default TrackDetails