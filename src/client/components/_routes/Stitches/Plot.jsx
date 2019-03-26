//Core
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles';

//UI Elements
import Grid from '@material-ui/core/Grid'

//Development Data
import { Typography } from '@material-ui/core';

//Utils

//Components

const styles = theme => ({
  wrapper: {
    width: `100%`,
    maxWidth: theme.breakpoints.values.lg,
    marginBottom: `3em`,
    margin: `0 auto`,
  },
  plotContainer: {
    width: `100%`,
    whiteSpace: 'nowrap',
  },
  plot: {
    minHeight: `40px`,
    display: `inline-block`,
    ['&:hover']: { 
      backgroundColor: `red`,
      cursor: `pointer`
    },
  },
  dayContainer: {
    width: `100%`,
    border: `1px solid #ccc`,
  },
  day:{
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
  dayActive:{
    backgroundColor: `#0096ff`,
  },
  dayActiveText: {
    color: `#fff`,
    fontWeight: 600,
  },
  po:{
    backgroundColor: `#0096ff`,
  },
  pe:{
    backgroundColor: `#9cd6ff`,
  }
})
class Plot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoaded: false,
      activePlot: null,
      plotScope: 'all', //'all, or index of day',
      allPlots: null
    }
    this.plotAll = this.plotAll.bind(this)
    this.plotDay = this.plotDay.bind(this)
    this.renderPlots = this.renderPlots.bind(this)
    this.setActiveTrackPortion = this.setActiveTrackPortion.bind(this)
    this.setPlot = this.props.setPlot
  }

  setActiveTrackPortion(e) {
    const plotIndex = parseInt(e.currentTarget.dataset.index)
    this.setPlot({currentPlot: this.state.allPlots[plotIndex], nextPlot: this.state.allPlots[plotIndex+1]})
    //console.log(this.state)
  }

  renderPlots(){
    const { classes } = this.props;
    return (
      <Grid className={classes.plotContainer}>
        {this.state.allPlots.map((e, i) =>{
          const plotClass = i & 1 ? classes.po : classes.pe
          //Do not render last plot (nothing to compare to)
          if (i < this.state.allPlots.length - 1){
            return (
              <div key={`plot-${i}`} data-index={`${i}`} onMouseEnter={this.setActiveTrackPortion} className={classNames(classes.plot, plotClass)} style={{ width: `${e.distancePercentage}%` }}>
              </div>
            )
          }
        })}
      </Grid>
    )
  }
  plotAll(gpx){
    let newArr = []
    gpx.days.map((e) => {
      newArr.push(...this.plotDay(e, gpx.totalDistance))
    })
    return newArr
  }
  plotDay({ track, distance}, trackDistance){
    const totalDistance = trackDistance ? trackDistance : distance
    return track.map((e) => {
      const distancePercentage = e.distanceToNextPoint / totalDistance * 100
      return { 
        ...e,
        distancePercentage: distancePercentage
      }
    })
  }
  render() {
    if(this.state.dataLoaded){
      return (
        <Grid container direction="row" onClick={this.sampleFunction} className={''}>
          {this.renderPlots()}
        </Grid>
      )
    }else{
      return ''
    }     
  }
  componentDidMount() {    
    this.setState({
      dataLoaded: true,
      gpx: this.props.gpx,
      allPlots: this.plotAll(this.props.gpx)
    })
  }
  componentDidUpdate(prevProps) {
    if(this.props.plotDayIndex != prevProps.plotDayIndex){
      if (this.props.plotDayIndex !== false) {
        this.setState({
          allPlots: this.plotDay(this.props.gpx.days[this.props.plotDayIndex]),
        })
      } else {
        this.setState({
          allPlots: this.plotAll(this.props.gpx),
        })
      }
    }
  }
}

Plot.propTypes = {
  classes: PropTypes.object,
  gpx: PropTypes.object,
  setPlot: PropTypes.func,
  plotDayIndex: PropTypes.number,
}

export default withStyles(styles)(Plot);