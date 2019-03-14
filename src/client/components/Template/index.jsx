import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
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
    this.sampleFunction = this.sampleFunction.bind(this)
  }

  sampleFunction(x){
    return x
  }
  render() {
    return (
      <Grid className={`${this.props.classes.CONTAINER}`}>
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