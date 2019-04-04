//Core
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import { hot } from 'react-hot-loader'

//UI Elements
import Grid from '@material-ui/core/Grid'

//Development Data
//import DummyData from 'Utils/DummyData'

//Utils

//Components

const styles = theme => ({
  wrapper: {
    width: `100%`,
    maxWidth: theme.breakpoints.values.lg,
    marginBottom: `3em`,
    margin: `0 auto`,
  }
})
class ErrorMessages extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {

    }
    this.sampleFunction = this.sampleFunction.bind(this)
  }
  componentDidMount() {
    this.setState({
      
    })
  }
  componentWillReceiveProps() {
    if (this.props) {
      this.setState({
        //
      })
    }
  }

  sampleFunction() {
    console.log(this.state)
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid container direction="row"  className={classNames(classes.wrapper, ``)}>
      
      </Grid>
    );
  }
}

ErrorMessages.propTypes = {
  classes: PropTypes.object,
}

export default compose(
  hot(module),
  withStyles(styles)
)(ErrorMessages)