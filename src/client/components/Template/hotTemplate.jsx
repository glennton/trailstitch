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

//GraphQL Store

//Utils

//Components

const styles = () => ({
  CONTAINERWrapper: {
    ...jssWrapper, 
    ...jssModalWrapperOuter
  },
})

const CONTAINER = (props) => {
  const { classes } = props;

  return (
    <Grid container direction="row" className={classes.CONTAINERWrapper}>
      <>
      </>
    </Grid>
  );

}

CONTAINER.propTypes = {
  classes: PropTypes.shape({

  }).isRequired,
}

export default compose(
  hot(module),
  withStyles(styles)
)(CONTAINER)