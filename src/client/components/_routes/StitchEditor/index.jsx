//Code marker types in map component, if not defined, set default
//create stepper 
//Core
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import { hot } from 'react-hot-loader'

//UI Elements
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';

//Development Data
import DummyStitch from 'Utils/DummyStitch'
import DummyPoints from 'Utils/DummyPoints'

//Utils
import getHaversineDistance from 'Utils/mapUtils/getHaversineDistance'
import uuidv4 from 'uuid/v4'
import convertDMS from 'Utils/mapUtils/convertDMS'

//Components
import Map from 'Common/Map'
import ParseCoords from 'Utils/mapUtils/ParseCoords'

const styles = theme => ({
  wrapper: {
    width: `100%`,
    maxWidth: theme.breakpoints.values.lg,
    marginBottom: `3em`,
    margin: `0 auto`,
  },
  stitchPoint: {
    width: `100%`,
    padding: 2 * theme.spacing.unit,
  }
})
class StitchEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pointData: {},
      focusPlot: null,
    }
    this.countUnmappedPoints = this.countUnmappedPoints.bind(this)
  }
  componentDidMount() {
    this.setState({
      dataLoaded: true,
      gpx: DummyStitch,
      pointData: DummyPoints,
      unmappedStateCount: this.countUnmappedPoints(DummyPoints.points)
    })
  }

  renderPointEditor = (points) => {
    const { classes } = this.props
    return points.map((e)=>(
      <Paper key={e.uuid} className={classes.stitchPoint} onMouseEnter={() => this.centerMapToPoint({lat: e.lat, lng: e.lng})}>
        <ParseCoords coords={convertDMS(e.lat, e.lng)} styles={{ color: `#000` }} className={`${classes}`} />
      </Paper>
    ))
  }

  centerMapToPoint = (coords) => {
    this.setState({
      focusPlot: coords
    });
    console.log(coords)
  }

  mapPoints = () => {
    let newPointsArr = []
    const { pointData, gpx } = this.state;
    const { days } = gpx
    pointData.points.map((waypoint)=>{
      const lat1 = waypoint.lat
      const lng1 = waypoint.lng
      let nearestTrackPoint = { distance: null, trackPoint: null, index: null}
      //First Match Date
      days.map((dayData)=>{
        if (waypoint.dateKey === dayData.date){
          dayData.track.map((trackPoint, n) =>{
            const distance = 
              getHaversineDistance({
                lat: lat1, 
                lng: lng1,
              }, 
              {
                lat: trackPoint.lat, 
                lng: trackPoint.lng,
              })
            if (nearestTrackPoint.distance === null || distance < nearestTrackPoint.distance){
              nearestTrackPoint = { distance: distance, matchedPoint: trackPoint, index: n }
            }
          })
        }
      })
      newPointsArr.push({ ...waypoint, nearestTrackPoint, isMapped: true, uuid: uuidv4()})
    })
    this.setState((prevState)=>({
      pointData: {
        ...prevState.pointData,
        mappedPoints: newPointsArr,
      },
      unmappedStateCount: this.countUnmappedPoints(newPointsArr)
    }))
    console.log('mappedPoints', newPointsArr)
  }

  countUnmappedPoints = (points) => {
    let tally = 0
    points.map((e) => {
      if (e.isMapped === false) { tally++ }
    })
    return tally
  }
  render() {
    const { classes } = this.props
    const { dataLoaded, pointData, gpx, unmappedStateCount, focusPlot } = this.state
    //Count Unmapped Points
    return (
      <Grid container direction="column" className={classNames(classes.wrapper, ``)} spacing={16}> 
        <Grid>
        </Grid>
        <Grid container>
          <Grid item sm={6} md={3}>
            <Typography variant="h6">Drag Here to Upload Points</Typography>
          </Grid>
          <Grid item sm={6} md={3}>
            {dataLoaded ? (
              <>
                <Typography>
                  Loaded Data:&nbsp;
                  {gpx.name}
                </Typography>
                <Typography>
                  Points Loaded:&nbsp;
                  {pointData.points.length}
                </Typography>
                <Typography>
                  There are&nbsp;
                  {unmappedStateCount} 
                  &nbsp;unmapped points.
                </Typography>
                <Button onClick={() => this.mapPoints()}>Click here to map now.</Button>
              </>
            ):''}
          </Grid>

        </Grid>
        <Grid container>
          <Grid item sm={3}>
            {pointData.mappedPoints ? (
              <List>
                {this.renderPointEditor(pointData.mappedPoints)}
              </List>
            ) : ''}
          </Grid>
          <Grid item sm={9}>
            {pointData && gpx ? <Map focus={focusPlot} waypoints={pointData.mappedPoints} gpx={gpx} /> : ''}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

StitchEditor.propTypes = {
  classes: PropTypes.shape({

  }).isRequired,
}

export default compose(
  hot(module),
  withStyles(styles)
)(StitchEditor)
