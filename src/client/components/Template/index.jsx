import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles';
import DummyData from 'Utils/DummyData'

const styles = theme => ({
  wrapper: {
    width: `100%`,
    maxWidth: theme.breakpoints.lg,
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
    this.slides = DummyData(['slides']).slides
    this.sampleFunction = this.sampleFunction.bind(this)
  }

  sampleFunction(x){
    return x
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid className={classNames(classes.CONTAINER, `testClass`)}>
      </Grid>
    );
  }
  componentDidMount() {
    this.setState({
      //
    })
  }
}

CONTAINER.propTypes = {
  classes: PropTypes.object,
}

export default withStyles(styles)(CONTAINER);