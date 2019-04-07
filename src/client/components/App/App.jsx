//Core
import React from 'react'
import { Route, Switch } from 'react-router-dom';
import './styles.scss'
import PropTypes from 'prop-types'
import { SnackbarProvider } from 'notistack';
import compose from 'recompose/compose';
import { hot } from 'react-hot-loader'
import { withStyles } from '@material-ui/core/styles';

//UI Elements
import Grid from '@material-ui/core/Grid'

//Components
import Home from 'Routes/Home/Home'
import Albums from 'Routes/Albums/Albums'
import MyRoutes from 'Routes/MyRoutes/MyRoutes'
import Stitches from 'Routes/Stitches/Stitches'
import StitchEditor from 'Routes/StitchEditor/StitchEditor'
import Upload from 'Routes/Upload/Upload'
import Account from 'Routes/Account/Account'
import MainNav from 'Common/MainNav'
import FooterNav from 'Common/FooterNav'
import CreateAccount from 'Routes/CreateAccount/CreateAccount'
import HandleGPXDrag from 'Common/HandleGPXDrag'


const styles = theme => ({
  appContainer: {
    backgroundColor: theme.palette.background.light,
    minHeight: '100vh',
  },
  contentContainer: {
    flex: 1,
    maxWidth: '100vw',
  }
})

function App(props) {
  const { classes } = props
  return (
    <Grid container direction="column" className={classes.appContainer}>
      <SnackbarProvider maxSnack={3}>
        <HandleGPXDrag>
          <MainNav />
          <Grid container className={classes.contentContainer}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/albums" component={Albums} />
              <Route path="/myroutes" component={MyRoutes} />
              <Route path="/stitches" component={Stitches} />
              <Route path="/upload" component={Upload} />
              <Route path="/account" component={Account} />
              <Route path="/editor" component={StitchEditor} />
              <Route path="/create" component={CreateAccount} />
            </Switch>
          </Grid>
          <FooterNav />
        </HandleGPXDrag>
      </SnackbarProvider>
    </Grid>
  );
}

App.propTypes = {
  classes: PropTypes.shape({

  }).isRequired,
}

export default compose(
  hot(module),
  withStyles(styles)
)(App)