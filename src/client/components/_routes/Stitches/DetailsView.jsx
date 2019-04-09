//Core
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';

//UI Elements
import Grid from '@material-ui/core/Grid'

//GraphQL Store
import DummyData from 'Utils/DummyData'

//Utils

//Components

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
  componentDidMount() {
    this.setState({
      dataLoaded: true,
    })
  }
  renderElevation(){
    return (
      <Grid>
        Test
      </Grid>
    )
  }
  render() {
    //const { classes } = this.props;
    const { dataLoaded } = this.state
    return (
      <Grid container direction="row"> 
        {dataLoaded ? this.renderElevation():''}
      </Grid>
    );
  }
}

DetailsView.propTypes = {
  classes: PropTypes.shape({

  }).isRequired,
  gpx: PropTypes.shape({

  }).isRequired,
}

export default withStyles(styles)(DetailsView);