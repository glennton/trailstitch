//Core
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles';

//UI Elements
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';

//Development Data
import DummyStitch from 'Utils/DummyStitch'
import DummyPoints from 'Utils/DummyPoints'

//Utils
import getHaversineDistance from 'Utils/mapUtils/getHaversineDistance'
//Components
import Map from 'Common/Map'

const styles = theme => ({
  wrapper: {
    width: `100%`,
    maxWidth: theme.breakpoints.values.lg,
    marginBottom: `3em`,
    margin: `0 auto`,
  }
})
class StitchEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    this.countUnmappedPoints = this.countUnmappedPoints.bind(this)
    this.mapPoints = this.mapPoints.bind(this)
  }
  componentDidMount() {
    this.setState({
      dataLoaded: true,
      gpx: DummyStitch,
      pointData: DummyPoints,
      unmappedStateCount: this.countUnmappedPoints(DummyPoints.points)
    })
  }

  mapPoints(){
    let newPointsArr = []
    const { pointData, gpx } = this.state;
    const { points } = pointData;
    const { days } = gpx
    points.map((waypoint)=>{
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
      newPointsArr.push({ ...waypoint, nearestTrackPoint, isMapped: true})
    })
    this.setState({
      pointData: {
        points: newPointsArr,
      },
      unmappedStateCount: this.countUnmappedPoints(newPointsArr)
    })
  }

  countUnmappedPoints(points) {
    let tally = 0
    points.map((e) => {
      if (e.isMapped === false) { tally++ }
    })
    return tally
  }
  render() {
    const { classes } = this.props
    const { dataLoaded, pointData, gpx, unmappedStateCount } = this.state
    const { points } = pointData
    const { name } = gpx
    //Count Unmapped Points
    return (
      <Grid container direction="column" className={classNames(classes.wrapper, ``)}> 
        <Grid>
          { dataLoaded ? <Map waypoints={points} gpx={gpx} /> : ''}
        </Grid>
        <Grid container>
          <Typography>
            Loaded Data : 
            {dataLoaded ? name : 'Loading'}
          </Typography>
          <Typography>
            Points Loaded : 
            {dataLoaded ? points.length : 'Loading'}
          </Typography>
        </Grid>
        <Grid container>
          <Typography>
            There are 
            {unmappedStateCount} 
            unmapped points.
          </Typography>
          <Button onClick={()=>this.mapPoints()}>Click here to map now.</Button>
        </Grid>
      </Grid>
    );
  }
}

StitchEditor.propTypes = {
  classes: PropTypes.shape({

  }).isRequired,
}

export default withStyles(styles)(StitchEditor);