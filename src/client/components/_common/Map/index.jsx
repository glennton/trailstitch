//Core
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import { hot } from 'react-hot-loader'

//UI Elements
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';

//GraphQL Store

//Utils
//import API_KEYS from 'ClientConfig/API_KEYS'

//Components
import GoogleMapReact from 'google-map-react';




const styles = theme => ({
  wrapper: {
    width: `100%`,
    height: `50vh`,
    maxWidth: theme.breakpoints.values.lg,
    marginBottom: `3em`,
  },
  errorMsg: {
    color: '#fff'
  }
})

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorOpen : false,
      dataLoaded: false,
      waypointsMarkers: [],
      startPoints: [],
      endPoints: [],
    }
    this.placeIcon = {
      path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
      fillColor: '#FF0000',
      fillOpacity: .6,
      strokeWeight: 0,
      scale: 1
    }
  }
  
  componentDidMount() {
    const { gpx } = this.props
    const { gpxRouteData, centralCoords } = gpx
    console.log('gpxRouteData, centralCoords', gpxRouteData, centralCoords, gpx)
    this.setState({
      dataLoaded: true,
      centralCoords: centralCoords,
      gpxRouteData: gpxRouteData,      
    })
  }

  componentDidUpdate(prevProps) {
    const { map, maps, errorOpen } = this.state
    const { plot, waypoints, focus } = this.props
    if (map, maps ){
      if (errorOpen) {
        this.setState({
          errorOpen: false,
          errorMessage: null,
        })
      }
      if (map && focus && focus != prevProps.focus) {
        this.refocusMap(focus)
        this.renderActiveMarker(focus)
      }
      if (plot && plot != prevProps.plot) {
        const { currentPlot, nextPlot } = plot || ''
        const activePlot = { lat: currentPlot.lat, lng: currentPlot.lng }
        const nextActivePlot = { lat: nextPlot.lat, lng: nextPlot.lng }
        this.renderActiveMarker(activePlot)
        this.renderActivePolyLine(activePlot, nextActivePlot)

      }
      if (waypoints && waypoints != prevProps.waypoints) {
        this.renderWayPoints(waypoints)
      }
    }
  }

  refocusMap = (focusPlot) => {
    const { map, waypointsMarkers } = this.state
    if (map && waypointsMarkers) {
      waypointsMarkers.map((e) => {
        e.setMap(null)
      })
    }
    map.setCenter(focusPlot)
  }

  renderWayPoints = (waypoints) => {
    const { map, maps, waypointsMarkers } = this.state
    //First Remove any existing markers
    if ( map && maps ){
      if (waypointsMarkers) {
        waypointsMarkers.map((e)=>{
          e.setMap(null)
        })
      }
      //Make new markers
      let newMarkers = []
      waypoints.map((e)=>{
        const Marker = maps.Marker
        const placeIcon = { ...this.placeIcon }
        placeIcon.anchor = new maps.Point(14, 25)
        const activePoint = new Marker({
          id: 'plotMarker',
          position: {lat: e.lat, lng: e.lng},
          icon: placeIcon,
        })
        newMarkers.push(activePoint)
        activePoint.setMap(map)
      })
      this.setState({
        waypointsMarkers: newMarkers
      })
    }
  }
  renderPolyLines = () => {
    const { gpxRouteData, map, maps } = this.state
    if (map, maps) {
      const Polyline = maps.Polyline
      gpxRouteData.map((e,i)=>{
        const lineColor = (i + 1) % 2 ? '#ffffff' : '#aaaaaa'
        const line = new Polyline({
          path: e.track,
          geodesic: true,
          strokeColor: lineColor,
          strokeOpacity: 1,
          strokeWeight: 2
        })
        line.setMap(map)
      })
    }
  }
  //Render active marker based on hovered plot
  renderActiveMarker = (activePlot) => {
    const { map, maps, activeMarker } = this.state
    //Render only if active plot is set
    if (activePlot){
      //First Remove any existing markers
      if (activeMarker){
        activeMarker.setMap(null);
      }
      //Make new marker
      const Marker = maps.Marker
      const placeIcon = { ...this.placeIcon }
      placeIcon.anchor = new maps.Point(14, 25)
      const activePoint = new Marker({
        id: 'plotMarker',
        position: activePlot,
        icon: placeIcon,
      })
      this.setState({ activeMarker: activePoint })
      activePoint.setMap(map)
      map.setCenter(activePlot)
    }
  }
  //Render active poly line based on hovered plot
  renderActivePolyLine = (activePlot, nextActivePlot) => {
    //Render only if active plot is set
    if (activePlot && nextActivePlot, activePlot, nextActivePlot){
      const { activePolyLine, map, maps } = this.state
      //remove any active markers
      if (activePolyLine) {
        activePolyLine.setMap(null);
      }
      //Make new poly line
      const Polyline = maps.Polyline
      const newActivePolyLine = new Polyline({
        path: [activePlot, nextActivePlot],
        geodesic: true,
        strokeColor: 'red',
        strokeOpacity: 1,
        strokeWeight: 5
      })
      this.setState({ activePolyLine: newActivePolyLine })
      newActivePolyLine.setMap(map)
    }
  }
  //Render default start, end markers
  renderTrailStartMarkers = () => {
    const { gpxRouteData, map, maps, tempStartPoints, tempEndPoints } = this.state
    const Marker = maps.Marker
    const placeIcon = {...this.placeIcon}
    placeIcon.anchor = new maps.Point(14, 25)
    gpxRouteData.map((e, i) => {
      const startCoords = { lat: e.trackPtStart.lat, lng: e.trackPtStart.lng}
      const endCoords = { lat: e.trackPtEnd.lat, lng: e.trackPtEnd.lng }
      const startPoint = new Marker({
        position: startCoords,
        icon: placeIcon,
      })
      startPoint.setMap(map)
      this.setState(prevState => ({
        startPoints: [...prevState.startPoints, startPoint]
      }))
      if (i === gpxRouteData.length-1){
        const endPoint = new Marker({
          position: endCoords,
          icon: placeIcon,
        })
        endPoint.setMap(map)
        this.setState(prevState => ({
          endPoints: [...prevState.endPoints, endPoint]
        }))

      }
      //Reset Temp Points
      this.setState({
        tempStartPoints: [],
        tempEndPoints: []
      })
    })    
  }
  hideTrailPoints = () => {
    const { startPoints, endPoints } = this.state
    this.setState({
      tempStartPoints: startPoints,
      tempEndPoints: endPoints,
      startPoints: [],
      endPoints: []
    })
  }
  showTrailPoints = () => {
    const { startPoints, endPoints } = this.state
    this.setState({
      startPoints: tempStartPoints,
      endPoints: tempEndPoints
    })
  }
  handleApiLoaded = (map, maps) => {
    try{
      map.setMapTypeId('terrain');
      this.setState({ map: map, maps: maps }, () => {
        this.renderPolyLines()
        this.renderTrailStartMarkers()
      })
    }catch(err){
      console.log('err', err)
      this.setState({
        errorOpen: true,
        errorMessage: 'There was an error connecting to Google Maps.',
      })
    }
  };


  renderMap = () => {
    const { centralCoords } = this.state
    if (centralCoords){
      return (
        <GoogleMapReact
          //bootstrapURLKeys={{ key: "API_KEYS.GOOGLE_MAPS_API_KEY" }}
          yesIWantToUseGoogleMapApiInternals
          defaultCenter={centralCoords}
          defaultZoom={13}
          mapTypeId='terrain'
          onGoogleApiLoaded={({ map, maps }) => this.handleApiLoaded(map, maps)}
        />
      )
    }else{
     return (<div>Test</div>)
    }
  }
  render() {
    const { classes } = this.props;
    const { dataLoaded, errorOpen, errorMessage } = this.state
    return (
      <Grid className={classes.wrapper} onClick={this.sampleFunction}>
        {dataLoaded ? this.renderMap() : '' /*TODO:Set up loader*/ }
        <Snackbar 
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={errorOpen}
          message={
            <Typography className={classes.errorMsg}>{errorMessage}</Typography>
          }
        />
      </Grid>
    );
  }
}

Map.propTypes = {
  classes: PropTypes.shape({

  }).isRequired,
  gpx: PropTypes.shape({
    gpxRouteData: PropTypes.arrayOf(PropTypes.shape({

    })),
    centralCoords: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number
    })
  }).isRequired,
  plot: PropTypes.shape({

  }),
  waypoints: PropTypes.arrayOf(PropTypes.shape({

  })),
  focus: PropTypes.shape({

  }),
}
Map.defaultProps = {
  plot: null,
  waypoints: null,
  focus: null,
}

export default compose(
  hot(module),
  withStyles(styles)
)(Map)

//https://www.fullstackreact.com/articles/how-to-write-a-google-maps-react-component/
//https://developers.google.com/maps/documentation/javascript/examples/elevation-paths
//https://developers.google.com/maps/documentation/javascript/examples/polyline-simple
//https://github.com/google-map-react/google-map-react/issues/149