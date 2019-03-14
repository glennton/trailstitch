import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core/styles';
import './styles.scss'

const styles = () => ({
  coords: {
    padding: `0 .2em`,
  },
  coordsTxt: {
    fontWeight: 600,
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
    if(this.state.lat.valid && this.state.lon.valid){
      return(
        <Grid container justify="center" className={`${this.props.className || ''}`}>
          <Grid item className={this.props.classes.coords}>
            <Icon>place</Icon>
          </Grid> 
          <Grid item className={this.props.classes.coords}>
            <Typography variant="body1" style={this.state.styles} className={this.props.classes.coordsTxt}> 
              {this.state.lat.deg}&deg; {this.state.lat.min}&apos; {this.state.lat.sec}&quot; {this.state.lat.dir} 
            </Typography>
          </Grid>
          <Grid item className={this.props.classes.coords}>
            <Typography variant="body1" style={this.state.styles} className={this.props.classes.coordsTxt}> 
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
      styles: this.props.styles ? this.props.styles : {}
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
}

export default withStyles(styles)(ParseCoords);