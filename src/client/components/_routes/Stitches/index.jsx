//Core
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles';

//UI Elements
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';

//Development Data
import DummyStitch from 'Utils/DummyStitch'
import { Typography } from '@material-ui/core';

//Utils
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import convertDMS from 'Utils/mapUtils/convertDMS'

//Components
import ParseCoords from 'Utils/mapUtils/ParseCoords'
import Map from 'Common/Map'

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
  outer:{
    paddingTop: theme.spacing.unit * 2,
  },
  wrapper: {
    width: `100%`,
    maxWidth: theme.breakpoints.values.lg,
    marginBottom: `3em`,
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
    paddingTop: theme.spacing.unit,
    paddingLeft: theme.spacing.unit,
    flex: 1
  },
  detailRightHdr:{
    width: `auto`,
  },
  detailMapContainer:{
    minHeight: `300px`,
  },
  detailRightTabs:{
    backgroundColor: `#fff`,
    boxShadow: `none`,
    border: `1px solid ${theme.palette.grey.A100}`,
    borderRadius: `5px`,
  },
  Stitches:{
    [theme.breakpoints.up('xs')]: { //0
    },
    [theme.breakpoints.up('sm')]: { //600
    },
    [theme.breakpoints.up('md')]: { //960
    },
    [theme.breakpoints.up('lg')]: { //1280
    },
    [theme.breakpoints.up('xl')]: { //1920
    },
  }
})

class Stitches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleChangeIndex = this.handleChangeIndex.bind(this)
    this.returnDays = this.returnDays.bind(this)
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  returnDays(){
    const { classes } = this.props;

    return(
      DummyStitch.gpxMeta.days.map((e, i)=>
        <Grid item key={`stich-day-${i}`}>
          <Paper className={classes.paper}>
            <Grid container>
              <Grid container direction="row" justify="space-between"> 
                <Grid container className={classes.detailRightHdr}>
                  <Typography variant="h6">Day {i + 1} - {format(parseISO(e.date), ' MMMM d, yyyy ')} </Typography>
                </Grid>
                <Grid container className={classes.detailRightHdr}>
                  <ParseCoords coords={convertDMS(e.startPoint['@_lat'], e.startPoint['@_lon']).locCoords}  />
                </Grid>
              </Grid>
              <Grid item>
                <List>
                  <ListItem className={classes.detailLeftStatBox}>
                    <Avatar>
                      <Icon>location_searching</Icon>
                    </Avatar>
                    <ListItemText primary="Distance" secondary={Number.parseFloat(e.distance).toFixed(2) || ''} /> {/* TODO humanize units */}
                  </ListItem>
                  <ListItem className={classes.detailLeftStatBox}>
                    <Avatar>
                      <Icon>flight_takeoff</Icon>
                    </Avatar>
                    <ListItemText primary="Ascent" secondary={Number.parseFloat(e.ele.ascent).toFixed(2) || ''} /> {/* TODO humanize units */}
                  </ListItem>
                  <ListItem className={classes.detailLeftStatBox}>
                    <Avatar>
                      <Icon>flight_land</Icon>
                    </Avatar>
                    <ListItemText primary="Descent" secondary={Number.parseFloat(e.ele.descent).toFixed(2) || ''} /> {/* TODO humanize units */}
                  </ListItem>
                </List>
              </Grid>
              <Grid item className={classes.detailRightContainer}>
                <AppBar position="static" className={classes.detailRightTabs}>
                  <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    centered
                  >
                    <Tab label="Elevation" />
                    <Tab label="Map View" />
                    <Tab label="Waypoints" />
                  </Tabs>
                </AppBar>
                <SwipeableViews
                  axis={'x'}
                  index={this.state.value}
                  onChangeIndex={this.handleChangeIndex}
                >
                  <TabContainer dir="ltr">
                    <Grid container className={classes.detailMapContainer}>
                      <Map gpxDayData={e} defaultCenter={{lat: e.startPoint['@_lat'], lon: e.startPoint['@_lon']}} />
                    </Grid>
                  </TabContainer>
                  <TabContainer dir="ltr">
                    Map View
                  </TabContainer>
                  <TabContainer dir="ltr">Waypoints</TabContainer>
                </SwipeableViews>              
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      )
    )
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid container justify="center" onClick={this.sampleFunction} className={classes.outer}>
        <Grid container direction="column" align="center" className={classNames(classes.wrapper, ``)}>
          <Grid item>
            {this.returnDays()}
          </Grid>
        </Grid>
        
      </Grid>
    );
  }
  componentDidMount() {
    this.setState({
      //
    })
  }
}

Stitches.propTypes = {
  classes: PropTypes.object,
  theme: PropTypes.object,
}

export default withStyles(styles)(Stitches);