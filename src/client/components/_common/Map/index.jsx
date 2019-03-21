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
import makeGoogleMapRoute from 'Utils/mapUtils/makeGoogleMapRoute'

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
const TestMaker = ({ text }) => <div>{text}</div>;

// class Polyline extends React.Component {

//   componentWillUpdate() {
//     this.line.setMap(null)
//   }

//   componentWillUnmount() {
//     this.line.setMap(null)
//   }

//   getPaths() {
//     const { origin, destination } = this.props

//     return [
//       { lat: Number(origin.lat), lng: Number(origin.long) },
//       { lat: Number(destination.lat), lng: Number(destination.long) }
//     ];
//   }

//   render() {
//     console.log(this.props.maps)
//     const Polyline = this.props.maps.Polyline

//     const renderedPolyline = this.renderPolyline()
//     const paths = { path: this.getPaths() }

//     this.line = new Polyline(Object.assign({}, renderedPolyline, paths))

//     this.line.setMap(this.props.map)

//     return null
//   }

//   renderPolyline() {
//     throw new Error('Implement renderPolyline method')
//   }

// }



// class Normal extends Polyline {

//   renderPolyline() {
//     return {
//       geodesic: true,
//       strokeColor: this.props.color || '#ffffff',
//       strokeOpacity: 1,
//       strokeWeight: 4
//     }
//   }
// }


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

  sampleFunction() {
    console.log(this.state)
  }

  handleApiLoaded = (map, maps) => {
    this.map = map
    this.maps = maps
    const { dayStartPoint, dayEndPoint} = this.state;
    const testCoords = [
      { lat: dayStartPoint.lat, lng: dayStartPoint.lng }, { lat: dayEndPoint.lat, lng: dayEndPoint.lng}
      ]
    const Polyline = this.maps.Polyline
    console.log('testCoords', testCoords)
    this.line = new Polyline({
      path: this.state.trackArr,
      geodesic: true,
      strokeColor: '#ffffff',
      strokeOpacity: 1,
      strokeWeight: 2
    })

    console.log(this.line)
    this.line.setMap(this.map)
  };

  renderMap = ()=>{
    if (this.state.dayStartPoint && this.state.dayEndPoint){
      const { dayStartPoint, dayEndPoint} = this.state
      return (
        <GoogleMapReact
          //bootstrapURLKeys={{ key: API_KEYS.GOOGLE_MAPS_API_KEY }}
          yesIWantToUseGoogleMapApiInternals
          defaultCenter={this.state.centerPoint}
          defaultZoom={12}
          onGoogleApiLoaded={({ map, maps }) => this.handleApiLoaded(map, maps)}
        >
          {/*<Icon lat={dayStartPoint.lat} lng={dayStartPoint.lng}> place </Icon>
        <Icon lat={dayEndPoint.lat} lng={dayEndPoint.lng}> place </Icon>*/}
          <TestMaker lat={dayStartPoint.lat} lng={dayStartPoint.lng} text="My Marker" />
          <TestMaker lat={dayEndPoint.lat} lng={dayEndPoint.lng} text="My Marker" />

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
    const { pointStart, pointEnd, centralLat, centralLon, indexStart, indexEnd } = this.props.gpxDayData
    //Format in google friendly coordinate array
    const formattedGoogleCoords = makeGoogleMapRoute(this.props.gpxTrackData, indexStart, indexEnd )
    this.setState({
      dayStartPoint: {
        lat: Number.parseFloat(pointStart['@_lat']),
        lng: Number.parseFloat(pointStart['@_lon'])
      },
      dayEndPoint: {
        lat: Number.parseFloat(pointEnd['@_lat']),
        lng: Number.parseFloat(pointEnd['@_lon'])
      },
      centerPoint : {
        lat: Number.parseFloat(centralLat),
        lng: Number.parseFloat(centralLon)
      },
      trackArr: formattedGoogleCoords
    })
  }
}

Map.propTypes = {
  classes: PropTypes.object,
  defaultCenter: PropTypes.object,
  gpxDayData: PropTypes.object,
  gpxTrackData: PropTypes.array,
  text: PropTypes.object,
}

export default withStyles(styles)(Map);

//<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAugtwAcydVFeUNTAjB1SrC9OpSpC5-3uc&callback=initMap"></script>
//https://www.fullstackreact.com/articles/how-to-write-a-google-maps-react-component/
//https://developers.google.com/maps/documentation/javascript/examples/elevation-paths