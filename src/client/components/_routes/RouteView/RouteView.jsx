//Core
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import { hot } from 'react-hot-loader'
import { Query } from "react-apollo";

//UI Elements
import { jssWrapper, jssModalWrapperOuter } from 'Styles/globalStyles'
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core';
//GraphQL Store
import GET_ONE_GPX_ROUTE from 'GraphQLStore/Gpx/GET_ONE_GPX_ROUTE'
import GET_ONE_GPX_RECORD from 'GraphQLStore/Gpx/GET_ONE_GPX_RECORD'
//Utils

//Components
import Map from 'Common/Map'

const styles = (theme) => ({
  RouteViewWrapper: {
    ...jssWrapper, 
    ...jssModalWrapperOuter,
    paddingLeft: 2 * theme.spacing.unit,
    paddingRight: 2 * theme.spacing.unit,
    paddingTop: 2 * theme.spacing.unit,
  },
})

const RouteView = (props) => {
  const { classes, match } = props;
  console.log(match)
  return (
    <Grid container direction="row" alignContent="flex-start" className={classes.RouteViewWrapper}>
      <Grid container direction="column">
        <Grid item>
          <Query query={GET_ONE_GPX_RECORD} variables={{ shortid: match.params.id }}>
            {({ loading, error, data }) => {
              if (loading) return "Loading...";
              if (error) return `Error! ${error.message}`;
              console.log('data', data)
              const gpx = data.getOneGpxRoute
              return (
                <Grid container>
                  <Typography variant="h6">
                    {gpx.name}
                  </Typography>
                  <Map gpx={gpx} />
                </Grid>
              );
            }}
          </Query>
        </Grid>
      </Grid>
    </Grid>
  );

}

RouteView.propTypes = {
  classes: PropTypes.shape({

  }).isRequired,
  match: PropTypes.shape({

  }).isRequired,
}

export default compose(
  hot(module),
  withStyles(styles)
)(RouteView)