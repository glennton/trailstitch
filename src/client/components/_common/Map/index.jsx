//Core
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';

//UI Elements
import Grid from '@material-ui/core/Grid'
import Icon from '@material-ui/core/Icon';

//Development Data
import DummyData from 'Utils/DummyData'

//Utils
import API_KEYS from 'ClientConfig/API_KEYS'

//Components
import GoogleMapReact from 'google-map-react';

const styles = theme => ({
  wrapper: {
    width: `100%`,
    minHeight: `300px`,
    maxWidth: theme.breakpoints.values.lg,
    marginBottom: `3em`,
  }
})

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    this.slides = DummyData(['slides']).slides
    this.sampleFunction = this.sampleFunction.bind(this)
    this.handleApiLoaded = this.handleApiLoaded.bind(this)
    this.renderMap = this.renderMap.bind(this)
  }

  sampleFunction(){
    console.log(this.state)
  }
  handleApiLoaded = (map) => {
    this.map = map
    // use map and maps objects
    //this.map.setCenter(this.state.defaultCenter);
    //console.log('map api loaded', this.state.defaultCenter)
  };
  renderMap = ()=>{
    if (this.state.dayStartPoint && this.state.dayEndPoint){
      const { dayStartPoint, dayEndPoint} = this.state;
      return (
        <GoogleMapReact
          //bootstrapURLKeys={{ key: API_KEYS.GOOGLE_MAPS_API_KEY }}
          defaultCenter={this.state.dayStartPoint}
          defaultZoom={13}
          mapTypeId='terrain'
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => this.handleApiLoaded(map, maps)}
        >
          <Icon lat={dayStartPoint.lat} lng={dayStartPoint.lng}> place </Icon>
          <Icon lat={dayEndPoint.lat} lng={dayEndPoint.lng}> place </Icon>

        </GoogleMapReact>
      )
    }else{
     return (<div>Test</div>)
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid className={classes.wrapper} onClick={this.sampleFunction}>
        {this.renderMap()}
      </Grid>
    );
  }
  componentDidMount() {
    console.log('this.props.gpxDayData.startPoint, this.props.gpxDayData.endPoint', this.props, this.props.gpxDayData.startPoint, this.props.gpxDayData.endPoint)
    this.setState({
      dayStartPoint: {
        lat: Number.parseFloat(this.props.gpxDayData.startPoint['@_lat']),
        lng: Number.parseFloat(this.props.gpxDayData.startPoint['@_lon'])
      },
      dayEndPoint: {
        lat: Number.parseFloat(this.props.gpxDayData.endPoint['@_lat']),
        lng: Number.parseFloat(this.props.gpxDayData.endPoint['@_lon'])
      }
    })
  }
}

Map.propTypes = {
  classes: PropTypes.object,
  defaultCenter: PropTypes.object,
  gpxDayData: PropTypes.object,
}

export default withStyles(styles)(Map);

//<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAugtwAcydVFeUNTAjB1SrC9OpSpC5-3uc&callback=initMap"></script>
//https://www.fullstackreact.com/articles/how-to-write-a-google-maps-react-component/
//https://developers.google.com/maps/documentation/javascript/examples/elevation-paths