
import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  coord: {
    marginRight: theme.spacing.unit * .4,
    lineHeight: '1.77',
  },
  icon: {
    marginRight: theme.spacing.unit
  },
  coordSet: {
    marginRight: theme.spacing.unit
  },
})

const ParseCoords = props => {
  const { coords = { lat: null, lng: null }, classes, color, variant, alignContent, justifycontent, direction } = props

  //Calc Lat and Lng
  const splitCoords = (x) => {
    const newCoords = x.split('|').length >= 4 ? x.split('|') : null;
    if (coords) {
      return {
        deg: newCoords[0],
        min: newCoords[1],
        sec: newCoords[2],
        dir: newCoords[3]
      }
    }
  }
  const lat = coords ? splitCoords(coords.lat) : null;
  const lng = coords ? splitCoords(coords.lng) : null;

  return lat && lng ? (
    <Grid container alignContent={alignContent} direction={direction} justify={justifycontent}>
      <Grid item>
        <Icon className={classes.icon} style={{ color: color }}>place</Icon>
      </Grid>
      <Grid item>
        <Typography className={classes.coordSet} variant={variant ? variant : ''} style={{ color: color }}>
          <span className={classes.coord}>
            {lat.deg}
            &deg;
          </span>
          <span className={classes.coord}>
            {lat.min}
            &apos;
          </span>
          <span className={classes.coord}>
            {lat.sec}
            &quot;
          </span>
          <span className={classes.coord}>
            {lat.dir}
          </span>
        </Typography>
      </Grid>
      <Grid item>
        <Typography className={classes.coordSet} variant={variant ? variant : ''} style={{ color: color }}>
          <span className={classes.coord}>
            {lng.deg}
            &deg;
          </span>
          <span className={classes.coord}>
            {lng.min}
            &apos;
          </span>
          <span className={classes.coord}>
            {lng.sec}
            &quot;
          </span>
          <span className={classes.coord}>
            {lng.dir}
          </span>
        </Typography>
      </Grid>
    </Grid>
  ) : ''



}

ParseCoords.propTypes = {
  coords: PropTypes.shape({

  }),
  classes: PropTypes.shape({

  }).isRequired,
  color: PropTypes.string,
  variant: PropTypes.string,
  alignContent: PropTypes.string,
  justifycontent: PropTypes.string,
  direction: PropTypes.string,
}
ParseCoords.defaultProps = {
  coords: null,
  color: "#000",
  variant: "",
  alignContent: "center",
  justifycontent: "center",
  direction: "row",
}

//export default ParseCoords
export default withStyles(styles)(ParseCoords);