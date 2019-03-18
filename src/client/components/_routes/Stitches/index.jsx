//Core
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles';

//UI Elements
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';

//Development Data
import DummyStitch from 'Utils/DummyStitch'
import { Typography } from '@material-ui/core';

//Utils

//Components

const styles = theme => ({
  outer:{
    [theme.breakpoints.up('sm')]: { //600
      paddingTop: `70px`,
    },
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
  detailBox: {
    border: `1px solid ${theme.palette.grey.A100}`,
    borderRadius: `5px`,
    marginBottom: theme.spacing.unit,
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

    }
    this.sampleFunction = this.sampleFunction.bind(this)
    this.returnDays = this.returnDays.bind(this)
  }

  sampleFunction(){
  }
  returnDays(){
    const { classes } = this.props;
    return(
      DummyStitch.gpxMeta.days.map((e, i)=>
        <Grid item key={`stich-day-${i}`}>
          <Paper className={classes.paper}>
            <Grid container direction="row">
              <Grid item>
                <Typography variant="h6">Day {i + 1}</Typography>
                <Typography variant="body1">Date {e.date}</Typography>
                <List>
                  <ListItem className={classes.detailBox}>
                    <Avatar>
                      <Icon>location_searching</Icon>
                    </Avatar>
                    <ListItemText primary="Distance" secondary={Number.parseFloat(e.distance).toFixed(2) || ''} /> {/* TODO humanize units */}
                  </ListItem>
                  <ListItem className={classes.detailBox}>
                    <Avatar>
                      <Icon>flight_takeoff</Icon>
                    </Avatar>
                    <ListItemText primary="Ascent" secondary={Number.parseFloat(e.ele.ascent).toFixed(2) || ''} /> {/* TODO humanize units */}
                  </ListItem>
                  <ListItem className={classes.detailBox}>
                    <Avatar>
                      <Icon>flight_land</Icon>
                    </Avatar>
                    <ListItemText primary="Descent" secondary={Number.parseFloat(e.ele.descent).toFixed(2) || ''} /> {/* TODO humanize units */}
                  </ListItem>
                </List>
              </Grid>
              <Grid item>
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
          <Grid item xs={10}>
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
}

export default withStyles(styles)(Stitches);