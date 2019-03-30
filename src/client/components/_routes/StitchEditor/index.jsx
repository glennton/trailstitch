//Core
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles';

//UI Elements
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';



import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';



//Development Data
import DummyStitch from 'Utils/DummyStitch'
import DummyPoints from 'Utils/DummyPoints'

//Utils
import getHaversineDistance from 'Utils/mapUtils/getHaversineDistance'
import uuidv4 from 'uuid/v4'
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
      pointData: {}
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
    console.log(points)
    return points.map((e)=>(
      <ListItem button key={e.uuid}>
        <ListItemText primary="Trash" />
      </ListItem>
    ))
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
    const { dataLoaded, pointData, gpx, unmappedStateCount } = this.state
    console.log('render' )
    //Count Unmapped Points
    return (
      <Grid container direction="column" className={classNames(classes.wrapper, ``)} spacing={16}> 
        <Grid>
          {pointData && gpx ? <Map waypoints={pointData.points} gpx={gpx} /> : ''}
        </Grid>
        <Grid container>
          <Grid item sm={6} md={3}>
            <Typography variant="h6">Drag Here to Upload Pointss</Typography>
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
          {pointData.mappedPoints ? (
            <List>
              {this.renderPointEditor(pointData.mappedPoints)}
            </List>
          ): ''}
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