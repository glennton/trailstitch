import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  coords: {
    padding: `0 .2em`,
    width: `auto`,
  }
})

class ParseCoords extends React.Component {
  constructor(props) {
    super(props);
    this.state= {

    }
    this.splitCoords = this.splitCoords.bind(this)
    this.renderCoords = this.renderCoords.bind(this)
  }

  componentDidMount() {
    const { coords, styles } = this.props
    if (coords && coords.lat && coords.lng) {
      this.setState({
        styles: styles ? styles : {},
        lat: this.splitCoords(coords.lat),
        lng: this.splitCoords(coords.lng),
        dataLoaded: true,
      })
    }
  }

  splitCoords = (x) => {
    const coords = x.split('|').length >= 4 ? x.split('|') : null
    if(coords){
      return {
        deg: coords[0],
        min: coords[1],
        sec: coords[2],
        dir: coords[3]
      }
    }
  }

  renderCoords(){
    const { lat, lng, dataLoaded, styles } = this.state
    const { classes } = this.props;
    return dataLoaded ? (
      <Grid container align="center" direction="row">
        <Grid container alignItems="center" className={classes.coords}>
          <Icon>place</Icon>
        </Grid> 
        <Grid container alignItems="center" className={classes.coords}>
          <Typography style={styles} className={classes.coordsTxt}> 
            {lat.deg}
            &deg;&nbsp;
            {lat.min}
            &apos;&nbsp;
            {lat.sec}
            &quot;&nbsp;
            {lat.dir} 
          </Typography>
        </Grid>
        <Grid container alignItems="center" className={classes.coords}>
          <Typography style={styles} className={classes.coordsTxt}> 
            {lng.deg}
            &deg;&nbsp;
            {lng.min}
            &apos;&nbsp;
            {lng.sec}
            &quot;&nbsp;
            {lng.dir} 
          </Typography>
        </Grid>
      </Grid>
    ) : ''
  }

  render() {
    return (
      this.renderCoords() || ''
    );
  }


}

ParseCoords.propTypes = {
  coords: PropTypes.shape({

  }),
  styles: PropTypes.shape({

  }).isRequired,
  classes: PropTypes.shape({

  }).isRequired,
}
ParseCoords.defaultProps = {
  coords: null
}
export default withStyles(styles)(ParseCoords);