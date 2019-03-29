//Core
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles';

//UI Elements
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core';

//Development Data
//import DummyData from 'Utils/DummyData'

//Utils

//Components

const styles = theme => ({
  wrapper: {
    width: `100%`,
    maxWidth: theme.breakpoints.values.lg,
    marginBottom: `3em`,
    margin: `0 auto`,
  },
  dayContainer: {
    width: `100%`,
    border: `1px solid #ccc`,
  },
  day: {
    display: `inline-block`,
    borderRight: `1px solid #ccc`,
    textAlign: `center`,
    ['&:last-child']: {
      borderRight: `none`,
    },
    ['&:hover']: {
      cursor: `pointer`
    },
  },
  dayText: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  dayActive: {
    backgroundColor: `#0096ff`,
  },
  dayActiveText: {
    color: `#fff`,
    fontWeight: 600,
  },
})
class PlotDayNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: null
    }
 }
  componentDidMount() {
    const { gpx } = this.props
    this.setState({
      dataLoaded: true,
      gpx: gpx,
    })
  }

  setActiveDay = (e) => {
    const { setPlotDayIndex } = this.props 
    const { activeIndex } = this.state
    const index = parseInt(e.currentTarget.dataset.index)
    if (index === activeIndex){
      this.setState({
        activeIndex: false
      })
    }else{
      this.setState({
        activeIndex: index
      })
      setPlotDayIndex(index)
    }
  }

  render() {
    const { classes } = this.props;
    const { dataLoaded, gpx, activeIndex } = this.state
    return (
      <Grid className={classes.dayContainer}>
        {dataLoaded ? gpx.days.map((e, i) => {
          const width = e.distance / gpx.totalDistance * 100
          const isActive = activeIndex === i
          return (
            <button 
              type="button"
              key={`day-bar-${i}`} 
              data-index={`${i}`} 
              onClick={this.setActiveDay} 
              className={classNames(classes.day, isActive ? classes.dayActive : '')} 
              style={{ width: `${width}%` }} 
            >
              <Grid container justify="center">
                <Typography className={classNames(classes.dayText, isActive ? classes.dayActiveText : '')}>{e.date}</Typography>
              </Grid>
            </button>
          )
        }): '' }
      </Grid>
    );
  }
}

PlotDayNav.propTypes = {
  classes: PropTypes.shape({

  }).isRequired,
  gpx: PropTypes.shape({

  }).isRequired,
  setPlotDayIndex: PropTypes.func.isRequired,
}

export default withStyles(styles)(PlotDayNav);