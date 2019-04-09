//Core
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles';

//UI Elements
import Grid from '@material-ui/core/Grid'

//GraphQL Store

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
      allPlots: null
    }
  }

  componentDidMount() {
    const { gpx } = this.props
    this.setState({
      dataLoaded: true,
      allPlots: this.plotAll(gpx)
    })
  }
  
  componentDidUpdate(prevProps) {
    const { plotDayIndex, gpx} = this.props
    if (plotDayIndex != prevProps.plotDayIndex) {
      if (plotDayIndex !== false) {
        this.setState({
          allPlots: this.plotDay(gpx.days[plotDayIndex]),
        })
      } else {
        this.setState({
          allPlots: this.plotAll(gpx),
        })
      }
    }
  }

  setActiveTrackPortion = (e) => {
    const { setPlot } = this.props
    const { allPlots } = this.state
    const plotIndex = parseInt(e.currentTarget.dataset.index)
    setPlot({currentPlot: allPlots[plotIndex], nextPlot: allPlots[plotIndex+1]})
    //console.log(this.state)
  }

  renderPlots = () => {
    const { classes } = this.props;
    const { allPlots } = this.state
    return (
      <Grid className={classes.plotContainer}>
        {allPlots.map((e, i) =>{
          const plotClass = i & 1 ? classes.po : classes.pe
          //Do not render last plot (nothing to compare to)
          if (i < allPlots.length - 1){
            return (
              <div 
                key={`plot-${e.time}`} 
                data-index={`${i}`} 
                onMouseEnter={this.setActiveTrackPortion} 
                className={classNames(classes.plot, plotClass)} 
                style={{ width: `${e.distancePercentage}%` }}
              />
            )
          }
        })}
      </Grid>
    )
  }
  plotAll = (gpx) => {
    let newArr = []
    gpx.days.map((e) => {
      newArr.push(...this.plotDay(e, gpx.totalDistance))
    })
    return newArr
  }
  plotDay = ({ track, distance}, trackDistance) => {
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
    const { dataLoaded } = this.state
    if(dataLoaded){
      return (
        <Grid container direction="row" onClick={this.sampleFunction}>
          {this.renderPlots()}
        </Grid>
      )
    }else{
      return ''
    }     
  }
}

Plot.propTypes = {
  classes: PropTypes.shape({

  }).isRequired,
  gpx: PropTypes.shape({

  }).isRequired,
  setPlot: PropTypes.func.isRequired,
  plotDayIndex: PropTypes.number,
}
Plot.defaultProps = {
  plotDayIndex: null
}

export default withStyles(styles)(Plot);