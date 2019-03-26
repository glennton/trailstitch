//Core
import React from 'react'
import PropTypes from 'prop-types'

//UI Elements
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';

//Development Data

//Utils
import DateFnsUtils from '@date-io/date-fns'; //TODO change to moment if possible
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';

//Component
import TrackInfoCard from 'Common/TrackInfoCard'

class TrackDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gpx: null,
    }
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleMetaChange = this.handleMetaChange.bind(this)
  }
  test = ()=>{
    console.log(this.state)
  }
  handleNameChange = () => event => {
    this.setState({ gpxName: event.target.value });
  };
  handleMetaChange = name => event => {
    const value = event.target.value || ''
    this.setState(prevState => ({
      gpxMeta:{
        ...prevState.gpx,
        [name]: value
      }
    }));
  };
  render() {
    console.log('gpx', this.state.gpx)
    // const { dateFirst, dateLast, totalElevationGain, totalElevationLoss, overallElevationHighest, overallElevationLowest, totalDistance } = this.state.gpx || ''
    // const { TotalElapsedTime } = this.state.gpx.info || ''
    //const trackDetails = this.state.gpxExtensions['gpxtrkx:TrackStatsExtension']
    return this.state.dataLoaded ?    
      (      
        <Grid container justify="center">
          <Grid item xs={10}>
            <Grid container onClick={this.sampleFunction} direction="column">
              <TextField
                id="standard-name"
                label="Track Name:"
                value={this.state.gpx.name}
                onChange={this.handleNameChange('name')}
                margin="normal"
              />
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  margin="normal"
                  label="Track Start Date:"
                  value={this.state.gpx.dateFirst}
                  onChange={this.handleMetaChange('dateFirst')}
                  format='yyyy/MM/dd'
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Typography>Trip Info:</Typography>
            <Grid container direction="row">
              <Grid item sm={6}>
                <List>
                  <TrackInfoCard title={'Total Distance'} value={`${this.state.gpx.totalDistance}km`} icon={'location_searching'} />
                  <TrackInfoCard title={'Ascent'} value={`${this.state.gpx.totalElevationGain}`} icon={'flight_takeoff'} />
                  <TrackInfoCard title={'Max Elevation'} value={`${this.state.gpx.overallElevationHighest}`} icon={'trending_up'} />
                </List>
              </Grid>
              <Grid item sm={6}>
                <List>
                  <TrackInfoCard title={'Elapsed Time'} value={`${this.state.gpx.info.TotalElapsedTime}`} icon={'access_time'} />
                  <TrackInfoCard title={'Descent'} value={`${this.state.gpx.totalElevationLoss}`} icon={'flight_land'} />
                  <TrackInfoCard title={'Min Elevation'} value={`${this.state.gpx.overallElevationLowest}`} icon={'trending_down'} />
                </List>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
     )
     : ''
  }
  componentDidMount() {
    this.setState({
      gpx: this.props.gpx,
      dataLoaded: true
    })
  }
}

TrackDetails.propTypes = {
  gpx: PropTypes.object
}

export default TrackDetails