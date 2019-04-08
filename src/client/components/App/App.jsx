//Core
import React, { lazy, Suspense } from 'react'
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
import MainNav from 'Common/MainNav'
import FooterNav from 'Common/FooterNav'

//import Albums from 'Routes/Albums/Albums'
// import MyRoutes from 'Routes/MyRoutes/MyRoutes'
// import Stitches from 'Routes/Stitches/Stitches'
// import StitchEditor from 'Routes/StitchEditor/StitchEditor'
// import Upload from 'Routes/Upload/Upload'
// import Account from 'Routes/Account/Account'
// import CreateAccount from 'Routes/CreateAccount/CreateAccount'


import HandleGPXDrag from 'Common/HandleGPXDrag'
const Albums = React.lazy(() => import("Routes/Albums/Albums"));
const MyRoutes = React.lazy(() => import("Routes/MyRoutes/MyRoutes"));
const Stitches = React.lazy(() => import("Routes/Stitches/Stitches"));
const StitchEditor = React.lazy(() => import("Routes/StitchEditor/StitchEditor"));
const Upload = React.lazy(() => import("Routes/Upload/Upload"));
const Account = React.lazy(() => import("Routes/Account/Account"));
const CreateAccount = React.lazy(() => import("Routes/CreateAccount/CreateAccount"));


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
              <Suspense fallback={<div>Loading...</div>}>
                <Route exact path="/" component={Home} />
                <Route path="/albums" component={Albums} />
                <Route path="/myroutes" component={MyRoutes} />
                <Route path="/stitches" component={Stitches} />
                <Route path="/upload" component={Upload} />
                <Route path="/account" component={Account} />
                <Route path="/editor" component={StitchEditor} />
                <Route path="/create" component={CreateAccount} />
              </Suspense>
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