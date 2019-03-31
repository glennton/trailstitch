//Core
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import { hot } from 'react-hot-loader'

//UI Elements
import Grid from '@material-ui/core/Grid'
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

//Development Data
import DummyStitch from 'Utils/DummyStitch'
import { Typography } from '@material-ui/core';

//Utils

//Components
import Map from 'Common/Map'
import DetailsView from 'Routes/Stitches/DetailsView'
import SegmentDetail from 'Routes/Stitches/SegmentDetail'
import Plot from 'Routes/Stitches/Plot'
import PlotDayNav from 'Routes/Stitches/PlotDayNav'

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}
TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  wrapper: {
    paddingTop: theme.spacing.unit * 3,
    width: `100%`,
    maxWidth: theme.breakpoints.values.lg,
    marginBottom: `3em`,
    margin: `0 auto`,
  },
  paper:{
    padding: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
  },
  detailLeftStatBox: {
    border: `1px solid ${theme.palette.grey.A100}`,
    borderRadius: `5px`,
    marginBottom: theme.spacing.unit,
  },
  detailRightContainer:{
    flex: 1
  },
  detailRightHdr:{
    width: `auto`,
  },
  detailRightTabs:{
    backgroundColor: `#fff`,
    boxShadow: `none`,
    border: `1px solid ${theme.palette.grey.A100}`,
    borderRadius: `5px`,
  }
})

class Stitches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      gpx: null,
      plot: null,
      plotDayIndex: null,
    }
  }
  componentDidMount() {
    this.setState({
      dataLoaded: true,
      gpx: DummyStitch,
    })
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = (index) => {
    this.setState({ value: index });
  };

  setPlot = (plot) => {
    this.setState({ 
      plot: plot 
    });
  }
  
  setPlotDayIndex = (index) => {
    this.setState({
      plotDayIndex: index
    });
  }
  returnDays = () => {
    const { dataLoaded, value, plotDayIndex, gpx, plot } = this.state
    if (dataLoaded){
      const { classes } = this.props;
      return (
        <Grid container>
          <Grid container direction="row" justify="space-between">
            <Grid container className={classes.detailRightHdr}>
              {/* <Typography variant="h6">Day {i + 1} - {format(parseISO(e.date), ' MMMM d, yyyy ')} </Typography> */}
            </Grid>
            <Grid container className={classes.detailRightHdr}>
              {/* <ParseCoords coords={convertDMS(e.pointStart['@_lat'], e.pointEnd['@_lon']).locCoords} /> */}
            </Grid>
          </Grid>
          <Grid item className={classes.detailRightContainer}>
            <AppBar position="static" className={classes.detailRightTabs}>
              <Tabs
                value={value}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                centered
              >
                <Tab label="Stitch Points" />
                <Tab label="Track Details" />
                <Tab label="Waypoints" />
              </Tabs>
            </AppBar>
            <SwipeableViews
              axis='x'
              index={value}
              onChangeIndex={this.handleChangeIndex}
            >
              <TabContainer dir="ltr">
                <Grid>
                  <Plot setPlot={this.setPlot} gpx={gpx} plotDayIndex={plotDayIndex} />
                  <PlotDayNav setPlotDayIndex={this.setPlotDayIndex} gpx={gpx} />
                </Grid>
                <SegmentDetail plot={plot} />
              </TabContainer>
              <TabContainer dir="ltr">                
                <Grid>
                  <p>Track Details</p>
                  <DetailsView gpx={gpx} />
                </Grid>          
              </TabContainer>
              <TabContainer dir="ltr">
                <Grid>
                  <Typography>
                    Test
                  </Typography>
                </Grid>
              </TabContainer>
            </SwipeableViews>
          </Grid>
        </Grid>
      )
    }else{ return ''}

  }
  render() {
    const { classes } = this.props
    const { dataLoaded, plot, gpx } = this.state
    return (
      <Grid container direction="row" alignContent="center">
        <Grid container direction="column" alignContent="center"> 
          {dataLoaded ? <Map plot={plot} gpx={gpx} /> : ''}
        </Grid>
        { dataLoaded ?(
          <Grid container direction="column" alignContent="center" className={classes.wrapper}>            
            <Grid container direction="row" justify="space-between">
              <Grid container className={classes.detailRightHdr}>
                <Typography variant="h6">{gpx.name}</Typography>
                {/* <Typography variant="h6">Day {i + 1} - {format(parseISO(e.date), ' MMMM d, yyyy ')} </Typography> */}
              </Grid>
              <Grid container className={classes.detailRightHdr}>
                {/* <ParseCoords coords={convertDMS(e.pointStart['@_lat'], e.pointEnd['@_lon']).locCoords} /> */}
              </Grid>
            </Grid>
            {this.returnDays()}
          </Grid>
        ): ''}   
      </Grid>
    );
  }
}

Stitches.propTypes = {
  classes: PropTypes.shape({

  }).isRequired

}

export default compose(
  hot(module),
  withStyles(styles)
)(Stitches)
