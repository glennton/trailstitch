import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames'

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
      styles: {},
      lat: {
        valid: false,
        deg: '',
        min: '',
        sec: '',
        dir: '',
      },
      lon: {
        valid: false,
        deg: '',
        min: '',
        sec: '',
        dir: '',
      },
    }
    this.splitCoords = this.splitCoords.bind(this)
    this.renderCoords = this.renderCoords.bind(this)
  }

  splitCoords = (x, key) => {
    const coords = x.split('|').length >= 4 ? x.split('|') : null
    if(coords){
      this.setState({
        [key]:{
          valid: true,
          deg: coords[0],
          min: coords[1],
          sec: coords[2]
        }
      })
    }
  }

  renderCoords(){
    const { classes } = this.props;
    if(this.state.lat.valid && this.state.lon.valid){
      return(
        <Grid container align="center" direction="row" className={classNames(this.props.className)}>
          <Grid container alignItems="center" className={classes.coords}>
            <Icon>place</Icon>
          </Grid> 
          <Grid container alignItems="center" className={classes.coords}>
            <Typography variant={this.state.variant} style={this.state.styles} className={classes.coordsTxt}> 
              {this.state.lat.deg}&deg; {this.state.lat.min}&apos; {this.state.lat.sec}&quot; {this.state.lat.dir} 
            </Typography>
          </Grid>
          <Grid container alignItems="center" className={classes.coords}>
            <Typography variant={this.state.variant} style={this.state.styles} className={classes.coordsTxt}> 
              {this.state.lon.deg}&deg; {this.state.lon.min}&apos; {this.state.lon.sec}&quot; {this.state.lon.dir} 
            </Typography>
          </Grid>
        </Grid>
      )
    }
  }

  render() {
    return (
      this.renderCoords() || ''
    );
  }

  componentDidMount(){
    this.setState({
      styles: this.props.styles ? this.props.styles : {},
      variant: this.props.variant || 'body1'
    })
    this.splitCoords(this.props.coords.lat, 'lat')
    this.splitCoords(this.props.coords.lon, 'lon')
  }
}

ParseCoords.propTypes = {
  coords: PropTypes.object.isRequired,
  styles: PropTypes.object,
  classes: PropTypes.object,
  className: PropTypes.string,
  variant: PropTypes.string,
}

export default withStyles(styles)(ParseCoords);