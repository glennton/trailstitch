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
import { Typography } from '@material-ui/core';

//GraphQL Store

//Utils

//Components

const styles = () => ({
  CreateAccountSuccessWrapper: {
    ...jssWrapper,
    ...jssModalWrapperOuter
  },
})

const CreateAccountSuccess = (props) => {
  const { classes } = props;

  return (
    <Grid container direction="row" alignContent="flex-start" className={classes.CreateAccountSuccessWrapper}> 
      <Grid item>
        <Typography variant="h1">Account Creation Successful!</Typography>
        <Typography variant="body1">Get started by uploading a GPX Track</Typography>
      </Grid>
    </Grid>
  );

}

CreateAccountSuccess.propTypes = {
  classes: PropTypes.shape({
    
  }).isRequired,
}

export default compose(
  hot(module),
  withStyles(styles)
)(CreateAccountSuccess)