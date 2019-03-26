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

    }
    this.splitCoords = this.splitCoords.bind(this)
    this.renderCoords = this.renderCoords.bind(this)
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
    const { classes } = this.props;
    if(this.state.lat && this.state.lng){
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
              {this.state.lng.deg}&deg; {this.state.lng.min}&apos; {this.state.lng.sec}&quot; {this.state.lng.dir} 
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
  }
  componentWillReceiveProps() {
    if (this.props.coords){
      this.setState({
        styles: this.props.styles ? this.props.styles : {},
        variant: this.props.variant || 'body1',
        lat: this.splitCoords(this.props.coords.lat),
        lng: this.splitCoords(this.props.coords.lng),
      })
    }    
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