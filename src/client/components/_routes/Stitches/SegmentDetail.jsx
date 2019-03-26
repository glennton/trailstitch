//Core
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles';

//UI Elements
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core';
import List from '@material-ui/core/List';

//Development Data
//import DummyData from 'Utils/DummyData'

//Utils
import convertDMS from 'Utils/mapUtils/convertDMS'
//Components
import TrackInfoCard from 'Common/TrackInfoCard'
import ParseCoords from 'Utils/mapUtils/ParseCoords'

const styles = theme => ({
  wrapper: {
    width: `100%`,
    maxWidth: theme.breakpoints.values.lg,
    marginBottom: `3em`,
    margin: `0 auto`,
  },
  detailsContainer: {
    display: `flex`
  }
})
class SegmentDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    this.renderCoords = this.renderCoords.bind(this)
  }

  renderCoords() {
    //console.log(convertDMS(this.state.activePlot.lat, this.state.activePlot.lng))
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid container direction="row" className={classNames(classes.wrapper, ``)}>
        {this.state.activePlot ?
          <List className={classes.detailsContainer}>
            {this.renderCoords()}
            <ParseCoords coords={convertDMS(this.state.activePlot.lat, this.state.activePlot.lng)} styles={{ color: `#000` }} className={`${classes.coordContainer}`} />
            <TrackInfoCard title={'Segment Ascent'} value={`${this.state.activePlot.ascent ? this.state.activePlot.ascent : '0'}m`} icon={'flight_takeoff'} />
            <TrackInfoCard title={'Segment Descent'} value={`${this.state.activePlot.descent ? this.state.activePlot.descent : '0'}m`} icon={'flight_land'} />
            <TrackInfoCard title={'Distance'} value={`${this.state.activePlot.distanceToNextPoint ? this.state.activePlot.distanceToNextPoint : '0'}m`} icon={'location_searching'} />
          </List>
          : ''
        }
      </Grid>
    );
  }
  componentWillReceiveProps() {
    if (this.props.plot) {
      const { currentPlot, nextPlot } = this.props.plot || ''
      this.setState({
        activePlot: currentPlot,
        nextActivePlot: { lat: nextPlot.lat, lng: nextPlot.lng }
      })
    }
  }
}

SegmentDetail.propTypes = {
  classes: PropTypes.object,
  plot: PropTypes.object,
}

export default withStyles(styles)(SegmentDetail);