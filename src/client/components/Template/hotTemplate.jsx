//Core
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import { hot } from 'react-hot-loader'

//UI Elements
import Grid from '@material-ui/core/Grid'
//import HUE from '@material-ui/core/colors/HUE';

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
    paddingLeft: 2 * theme.spacing.unit,
    paddingRight: 2 * theme.spacing.unit,
  },
  CONTAINER:{
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
      <Grid container direction="row" className={classNames(classes.wrapper, ``)}>
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