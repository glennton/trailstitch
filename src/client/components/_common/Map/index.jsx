//Core
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';

//UI Elements
import Grid from '@material-ui/core/Grid'
import Place from '@material-ui/icons/Place';

//Development Data

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
  }
})

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoaded: false,
      activePlot: null,
      waypointsMarkers: []
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
    const { gpx, waypoints } = this.props
    const { days, centralCoords } = gpx
    const { points } = waypoints || []
    this.setState({
      dataLoaded: true,
      centralCoords: centralCoords,
      days: days,
      waypoints: points
    })
  }

  componentDidUpdate(prevProps) {
    const { plot, waypoints } = this.props
    if (plot != prevProps.plot) {
      const { currentPlot, nextPlot } = plot || ''
      this.setState({
        activePlot: { lat: currentPlot.lat, lng: currentPlot.lng },
        nextActivePlot: { lat: nextPlot.lat, lng: nextPlot.lng }
      }, () => {
        //Update map after new props are set
        this.renderActiveMarker()
        this.renderActivePolyLine()
      })
    }
    if (waypoints != prevProps.waypoints) {
      this.setState({
        waypoints: waypoints || ''
      }, () => {
        //Update map after new props are set
        this.renderWayPoints()
      })
    }
  }

  renderWayPoints = () => {
    const { map, maps, waypoints, waypointsMarkers } = this.state
    //Render only if active plot is set
    console.log('render', waypoints)
    if (waypoints) {
      console.log('render', waypoints)

      //First Remove any existing markers
      if (waypointsMarkers) {
        waypointsMarkers.map((e)=>{
          e.setMap(null)
        })
      }
      //Make new markers
      let newMarkers = []
      waypoints.map((e)=>{
        console.log(e)
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
    const {days, map, maps} = this.state
    const Polyline = maps.Polyline
    days.map((e,i)=>{
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
  //Render active marker based on hovered plot
  renderActiveMarker = () => {
    const { map, maps, activePlot, activeMarker } = this.state
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
  renderActivePolyLine = () => {
    const { activePlot, nextActivePlot } = this.state
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
    const { days, map, maps } = this.state
    const Marker = maps.Marker
    const placeIcon = {...this.placeIcon}
    placeIcon.anchor = new maps.Point(14, 25)
    days.map((e, i) => {
      const startCoords = { lat: e.trackPtStart.lat, lng: e.trackPtStart.lng}
      const endCoords = { lat: e.trackPtEnd.lat, lng: e.trackPtEnd.lng }
      const startPoint = new Marker({
        position: startCoords,
        icon: placeIcon,
      })
      startPoint.setMap(map)
      if (i === days.length-1){
        const endPoint = new Marker({
          position: endCoords,
          icon: placeIcon,
        })
        endPoint.setMap(map)
      }
    })    

  }
  handleApiLoaded = (map, maps) => {
    map.setMapTypeId('terrain');
    this.setState({ map: map, maps: maps },()=>{
      this.renderPolyLines()
      this.renderTrailStartMarkers()
    })
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
    const { dataLoaded } = this.state
    return (
      <Grid className={classes.wrapper} onClick={this.sampleFunction}>
        <Place />
        {dataLoaded ? this.renderMap() : '' /*TODO:Set up loader*/ }
      </Grid>
    );
  }
}

Map.propTypes = {
  classes: PropTypes.shape({

  }).isRequired,
  gpx: PropTypes.shape({

  }).isRequired,
  plot: PropTypes.shape({

  }),
  waypoints: PropTypes.arrayOf(PropTypes.shape({

  })),
}
Map.defaultProps = {
  plot: null,
  waypoints: null,
}

export default withStyles(styles)(Map);

//https://www.fullstackreact.com/articles/how-to-write-a-google-maps-react-component/
//https://developers.google.com/maps/documentation/javascript/examples/elevation-paths
//https://developers.google.com/maps/documentation/javascript/examples/polyline-simple
//https://github.com/google-map-react/google-map-react/issues/149