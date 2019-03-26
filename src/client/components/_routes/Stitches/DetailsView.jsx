//Core
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';

//UI Elements
import Grid from '@material-ui/core/Grid'

//Development Data
import DummyData from 'Utils/DummyData'

//Utils

//Components
import TrackInfoCard from 'Common/TrackInfoCard'
const styles = theme => ({
  wrapper: {
    width: `100%`,
    maxWidth: theme.breakpoints.values.lg,
    marginBottom: `3em`,
    margin: `0 auto`,
  },
})
class DetailsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoaded: false,
    }
    this.slides = DummyData(['slides']).slides
    this.renderElevation = this.renderElevation.bind(this)
  }


  renderElevation(){
    return (
      <Grid></Grid>
    )
  }
  render() {
    //const { classes } = this.props;
    return (
      <Grid container direction="row"> 
        {this.state.dataLoaded ? this.renderElevation():''}
      </Grid>
    );
  }
  componentDidMount() {
    const { days, name, centralCoords } = this.props.gpx
    this.setState({
      dataLoaded: true,
      name: name,
      centralCoords: centralCoords,
      days: days
    })
  }
}

DetailsView.propTypes = {
  classes: PropTypes.object,
  gpx: PropTypes.object,
}

export default withStyles(styles)(DetailsView);