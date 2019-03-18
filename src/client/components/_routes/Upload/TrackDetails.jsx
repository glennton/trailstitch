//Core
import React from 'react'
import PropTypes from 'prop-types'

//UI Elements
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import { Typography } from '@material-ui/core';

//Development Data

//Utils
import DateFnsUtils from '@date-io/date-fns'; //TODO change to moment if possible
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';

class TrackDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gpxName: '',
      gpxMeta: {
        time: ''
      },
      gpxExtensions: {
        'gpxtrkx:Distance': '',
        'gpxtrkx:Ascent': '',
        'gpxtrkx:Descent': '',
        'gpxtrkx:TotalElapsedTime': '',
        'gpxtrkx:MinElevation': '',
        'gpxtrkx:MaxElevation': '',
      },
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
        ...prevState.gpxMeta,
        [name]: value
      }
    }));
  };
  render() {
    const { time } = this.state.gpxMeta
    const ext = this.state.gpxExtensions
    //const trackDetails = this.state.gpxExtensions['gpxtrkx:TrackStatsExtension']
    return (
      <Grid container justify="center">
        <Grid item xs={10}>
          <Grid container onClick={this.sampleFunction} direction="column">
            <TextField
              id="standard-name"
              label="Track Name:"
              value={this.state.gpxName}
              onChange={this.handleNameChange('name')}
              margin="normal"
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                margin="normal"
                label="Track Start Date:"
                value={time}
                onChange={this.handleMetaChange('time')}
                format='yyyy/MM/dd'
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Typography>Trip Info:</Typography>
          <Grid container direction="row">
            <Grid item sm={6}>
              <List>
                <ListItem>
                  <Avatar>
                    <Icon>location_searching</Icon>
                  </Avatar>
                  <ListItemText primary="Total Distance" secondary={ext['gpxtrkx:Distance'] || ''} /> {/* TODO humanize units */}
                </ListItem>
                <ListItem>
                  <Avatar>
                    <Icon>flight_takeoff</Icon>
                  </Avatar>
                  <ListItemText primary="Ascent" secondary={ext['gpxtrkx:Ascent'] || ''} />
                </ListItem>
                <ListItem>
                  <Avatar>
                    <Icon>trending_up</Icon>
                  </Avatar>
                  <ListItemText primary="Max Elevation" secondary={ext['gpxtrkx:MaxElevation'] || ''} />
                </ListItem>
              </List>
            </Grid>
            <Grid item sm={6}>
              <List>
                <ListItem>
                  <Avatar>
                    <Icon>access_time</Icon>
                  </Avatar>
                  <ListItemText primary="Elapsed Time" secondary={ext['gpxtrkx:TotalElapsedTime'] || ''} />
                </ListItem>
                <ListItem>
                  <Avatar>
                    <Icon>flight_land</Icon>
                  </Avatar>
                  <ListItemText primary="Descent" secondary={ext['gpxtrkx:Descent'] || ''} />
                </ListItem>
                <ListItem>
                  <Avatar>
                    <Icon>trending_down</Icon>
                  </Avatar>
                  <ListItemText primary="Min Elevation" secondary={ext['gpxtrkx:MinElevation'] || ''} />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
  componentDidMount() {
    this.setState({
      gpxName: this.props.gpxData.gpxName,
      gpxMeta: this.props.gpxData.gpxMeta,
      gpxExtensions: this.props.gpxData.gpxExtensions,
    })
  }
}

TrackDetails.propTypes = {
  gpxData: PropTypes.object
}

export default TrackDetails