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
    const { primaryColor, secondaryColor } = this.props
    return dataLoaded ?    
      (      
        <Grid container justify="center">
          <Grid item xs={12}>
            <Grid container onClick={this.sampleFunction} direction="column">
              <TextField
                id="standard-name"
                label="Track Name:"
                value={gpx.name}
                onChange={this.handleNameChange('name')}
                margin="normal"
                InputLabelProps={{ style: { color: primaryColor } }}
                InputProps={{ style: { color: primaryColor } }}
                className="dangerously-reset-border-color"
              />
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  margin="normal"
                  label="Track Start Date:"
                  value={gpx.dateFirst}
                  onChange={this.handleMetaChange('dateFirst')}
                  format='yyyy/MM/dd'
                  InputLabelProps={{ style: { color: primaryColor } }}
                  InputProps={{ style: { color: primaryColor } }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid container direction="row">
              <Grid item sm={6}>
                <List>
                  <TrackInfoCard 
                    title='Total Distance' 
                    value={gpx.totalDistance ? `${gpx.totalDistance}km` : 'No Data'} 
                    icon='location_searching' 
                    primaryColor={primaryColor} 
                    secondaryColor={secondaryColor} 
                  />
                  <TrackInfoCard 
                    title='Ascent' 
                    value={gpx.totalElevationGain ? `${gpx.totalElevationGain}` : 'No Data'} 
                    icon='flight_takeoff' 
                    primaryColor={primaryColor} 
                    secondaryColor={secondaryColor}
                  />
                  <TrackInfoCard 
                    title='Max Elevation' 
                    value={gpx.overallElevationHighest ? `${gpx.overallElevationHighest}` : 'No Data'} 
                    icon='trending_up' 
                    primaryColor={primaryColor}  
                    secondaryColor={secondaryColor}
                  />
                </List>
              </Grid>
              <Grid item sm={6}>
                <List>
                  <TrackInfoCard 
                    title='Elapsed Time' 
                    value={gpx.info.TotalElapsedTime ? `${gpx.info.TotalElapsedTime}` : 'No Data'} 
                    icon='access_time' 
                    primaryColor={primaryColor}  
                    secondaryColor={secondaryColor}
                  />
                  <TrackInfoCard 
                    title='Descent' 
                    value={gpx.totalElevationLoss ? `${gpx.totalElevationLoss}` : 'No Data'} 
                    icon='flight_land' 
                    primaryColor={primaryColor}  
                    secondaryColor={secondaryColor}
                  />
                  <TrackInfoCard 
                    title='Min Elevation' 
                    value={gpx.overallElevationLowest ? `${gpx.overallElevationLowest}` : 'No Data'} 
                    icon='trending_down' 
                    primaryColor={primaryColor}  
                    secondaryColor={secondaryColor}
                  />
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

  }),
  primaryColor: PropTypes.string,
  secondaryColor: PropTypes.string,
}
TrackDetails.defaultProps = {
  gpx: null,
  primaryColor: "#000",
  secondaryColor: "#FFF",
}






export default TrackDetails