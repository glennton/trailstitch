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
      activeDay: null, 
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
    this.renderWayPoints = this.renderWayPoints.bind(this)
    this.renderActiveMarker = this.renderActiveMarker.bind(this)
    this.renderActivePolyLine = this.renderActivePolyLine.bind(this)
    this.handleApiLoaded = this.handleApiLoaded.bind(this)
    this.renderMap = this.renderMap.bind(this)
    //Map Functions
    this.renderTrailStartMarkers = this.renderTrailStartMarkers.bind(this)
  }
  renderWayPoints(){
    const { map, maps } = this.state
    //Render only if active plot is set
    console.log('render', this.state.waypoints)
    if (this.state.waypoints) {
      console.log('render', this.state.waypoints)

      //First Remove any existing markers
      if (this.state.waypointsMarkers) {
        this.state.waypointsMarkers.map((e, i)=>{
          e.setMap(null)
        })
      }
      //Make new markers
      let newMarkers = []
      this.state.waypoints.map((e,i)=>{
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
  renderPolyLines(){
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
  renderActiveMarker(){
    const { map, maps } = this.state
    //Render only if active plot is set
    if (this.state.activePlot){
      //First Remove any existing markers
      if (this.state.activeMarker){
        this.state.activeMarker.setMap(null);
      }
      //Make new marker
      const Marker = maps.Marker
      const placeIcon = { ...this.placeIcon }
      placeIcon.anchor = new maps.Point(14, 25)
      const activePoint = new Marker({
        id: 'plotMarker',
        position: this.state.activePlot,
        icon: placeIcon,
      })
      this.setState({ activeMarker: activePoint })
      activePoint.setMap(map)
      map.setCenter(this.state.activePlot)
    }
  }
  //Render active poly line based on hovered plot
  renderActivePolyLine(){
    const { map, maps } = this.state
    //Render only if active plot is set
    if (this.state.activePlot && this.state.nextActivePlot){
      //remove any active markers
      if (this.state.activePolyLine) {
        this.state.activePolyLine.setMap(null);
      }
      //Make new poly line
      const Polyline = maps.Polyline
      const activePolyLine = new Polyline({
        path: [this.state.activePlot, this.state.nextActivePlot],
        geodesic: true,
        strokeColor: 'red',
        strokeOpacity: 1,
        strokeWeight: 5
      })
      this.setState({ activePolyLine: activePolyLine })
      activePolyLine.setMap(map)
    }
  }
  //Render default start, end markers
  renderTrailStartMarkers(){
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
    this.setState({ map: map, maps: maps, mapLoaded: true })
    this.state.map.setMapTypeId('terrain');
    this.renderPolyLines()
    this.renderTrailStartMarkers()
    console.log('map init')
  };

  renderMap = ()=>{
    if (this.state.centralCoords){
      return (
        <GoogleMapReact
          //bootstrapURLKeys={{ key: "API_KEYS.GOOGLE_MAPS_API_KEY" }}
          yesIWantToUseGoogleMapApiInternals
          defaultCenter={this.state.centralCoords}
          defaultZoom={13}
          mapTypeId= 'terrain'
          onGoogleApiLoaded={({ map, maps }) => this.handleApiLoaded(map, maps)}
        >
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
        <Place />
        {this.state.dataLoaded ? this.renderMap() : '' /*TODO:Set up loader*/ }
      </Grid>
    );
  }
  componentDidMount() {
    const { days, name, centralCoords } = this.props.gpx
    const { points } = this.props.waypoints || []
    this.setState({
      dataLoaded: true,
      name: name,
      centralCoords: centralCoords,
      days: days,
      waypoints: points
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props.plot != prevProps.plot){
      const { currentPlot, nextPlot } = this.props.plot || ''
      this.setState({
        activePlot: { lat: currentPlot.lat, lng: currentPlot.lng },
        nextActivePlot: { lat: nextPlot.lat, lng: nextPlot.lng }
      }, ()=>{
        //Update map after new props are set
        this.renderActiveMarker()
        this.renderActivePolyLine()
      })
    }
    if (this.props.waypoints != prevProps.waypoints) {
      this.setState({
        waypoints: this.props.waypoints || ''
      },()=>{
        //Update map after new props are set
        this.renderWayPoints()
      })
    }
  }

}

Map.propTypes = {
  classes: PropTypes.object,
  gpx: PropTypes.object,
  plot: PropTypes.object,
  waypoints: PropTypes.array,
}

export default withStyles(styles)(Map);

//https://www.fullstackreact.com/articles/how-to-write-a-google-maps-react-component/
//https://developers.google.com/maps/documentation/javascript/examples/elevation-paths
//https://developers.google.com/maps/documentation/javascript/examples/polyline-simple
//https://github.com/google-map-react/google-map-react/issues/149