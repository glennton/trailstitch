//Core
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles';

//UI Elements
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List';

//GraphQL Store

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
  constructor(props){
    super(props)
    this.state = {
      activePlot: null
    }
  }

  componentWillReceiveProps() {
    const { plot } = this.props
    if (plot) {
      const { currentPlot } = plot
      this.setState({
        activePlot: currentPlot,
      })
    }
  }

  renderCoords() {
    //console.log(convertDMS(this.state.activePlot.lat, this.state.activePlot.lng))
  }
  render() {
    const { classes } = this.props;
    const { activePlot } = this.state
    return (
      <Grid container direction="row" className={classNames(classes.wrapper, ``)}>
        { activePlot ? (
          <List className={classes.detailsContainer}>        
            {this.renderCoords()}
            <ParseCoords coords={convertDMS(activePlot.lat, activePlot.lng)} styles={{ color: `#000` }} className={`${classes.coordContainer}`} />
            <TrackInfoCard title='Segment Ascent' value={`${activePlot.ascent ? activePlot.ascent : '0'}m`} icon='flight_takeoff' />
            <TrackInfoCard title='Segment Descent' value={`${activePlot.descent ? activePlot.descent : '0'}m`} icon='flight_land' />
            <TrackInfoCard title='Distance' value={`${activePlot.distanceToNextPoint ? activePlot.distanceToNextPoint : '0'}m`} icon='location_searching' />
          </List>
          ): '' }
      </Grid>
    );
  }

}

SegmentDetail.propTypes = {
  classes: PropTypes.shape({

  }).isRequired,
  plot: PropTypes.shape({

  }),
}
SegmentDetail.defaultProps = {
  plot: null
}

export default withStyles(styles)(SegmentDetail);