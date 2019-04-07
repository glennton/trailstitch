//Core
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import { hot } from 'react-hot-loader'

//UI Elements
import { jssWrapper, jssModalWrapperOuter } from 'Styles/globalStyles'
import Grid from '@material-ui/core/Grid'
//import HUE from '@material-ui/core/colors/HUE';

//Development Data
//import DummyData from 'Utils/DummyData'

//Utils

//Components

const styles = () => ({
  CONTAINERWrapper: {
    ...jssWrapper, 
    ...jssModalWrapperOuter
  },
})

class CONTAINER extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    this.setState({
      //
    })
  }
  componentWillReceiveProps() {
    if (this.props) {
      this.setState({
        //
      })
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid container direction="row" className={classes.CONTAINERWrapper}>
        <>
        </>
      </Grid>
    );
  }
}

CONTAINER.propTypes = {
  classes: PropTypes.shape({

  }).isRequired,
}

export default compose(
  hot(module),
  withStyles(styles)
)(CONTAINER)