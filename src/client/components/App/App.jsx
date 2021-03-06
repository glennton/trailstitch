//Core
import React, { Suspense, useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import './styles.scss';
import PropTypes from 'prop-types';
import { SnackbarProvider } from 'notistack';
import compose from 'recompose/compose';
import { hot } from 'react-hot-loader';
import { withStyles } from '@material-ui/core/styles';
import { useCookies } from 'react-cookie';
import jwt from 'jsonwebtoken'

//Data
import UserContext from 'Context/UserContext'

//UI Elements
import Grid from '@material-ui/core/Grid';

//Components
import Home from 'Routes/Home/Home';
import MainNav from 'Common/MainNav';
import FooterNav from 'Common/FooterNav';
import HandleGPXDrag from 'Common/HandleGPXDrag/HandleGPXDrag';
const Albums = React.lazy(
  () => import("Routes/Albums/Albums")
)
const MyRoutes = React.lazy(
  () => import("Routes/MyRoutes/MyRoutes")
)
const RouteView = React.lazy(
  () => import("Routes/RouteView/RouteView")
)
const Stitches = React.lazy(
  () => import("Routes/Stitches/Stitches")
)
const StitchEditor = React.lazy(
  () => import("Routes/StitchEditor/StitchEditor")
)
const Upload = React.lazy(
  () => import("Routes/Upload/Upload")
)
const Account = React.lazy(
  () => import("Routes/Account/Account")
)
const CreateAccount = React.lazy(
  () => import("Routes/CreateAccount/CreateAccount")
)


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

const App = (props) => {

  const { classes } = props
  const [token, setToken] = useState({})
  const [signedUser, setSignedUser] = useState({})
  const [cookies, setCookie] = useCookies(['user']);

  useEffect(()=>{
    if (cookies.userToken && cookies.userData){
      if (cookies.userData.exp > (Date.now() / 1000 | 0)) {
        setUserCookies(cookies.userToken)
      } else {
        unsetUserCookies()
      }
    }

  }, [cookies.userToken, cookies.userData] ) 

  const setUserCookies = (newToken) => {
    const newSignedUser = jwt.decode(newToken)
    setCookie('userToken', newToken)
    setCookie('userData', newSignedUser)
    setToken(newToken)
    setSignedUser(newSignedUser)
  }

  const unsetUserCookies = () => {
    setCookie('userToken', null)
    setCookie('userData', null)
    setToken({})
    setSignedUser({})
  }

  //console.log('signedUser app', signedUser)

  const renderApp = (
    <Grid container direction="column" className={classes.appContainer}>
      <SnackbarProvider maxSnack={3}>
        <UserContext.Provider value={{ signedUser, token, setUserCookies, unsetUserCookies }}>
          <HandleGPXDrag>
            <MainNav />
            <Grid container className={classes.contentContainer}>
              <Switch>
                <Suspense fallback={<div>Loading...</div>}>
                  <Route exact path="/" component={Home} />
                  <Route path="/albums" render={() => <Albums />} />
                  <Route path="/myroutes" render={(props) => <MyRoutes {...props} />} />
                  <Route exact path="/route/:id" render={(props) => <RouteView {...props} />} />
                  <Route path="/stitches" render={() => <Stitches />} />
                  <Route path="/upload" render={() => <Upload />} />
                  <Route path="/account" render={() => <Account />} />
                  <Route path="/editor" render={() => <StitchEditor />} />
                  <Route path="/create" render={() => <CreateAccount />} />
                </Suspense>
              </Switch>
            </Grid>
            <FooterNav />
          </HandleGPXDrag>
        </UserContext.Provider>
      </SnackbarProvider>
    </Grid>
  )
  return renderApp
}

App.propTypes = {
  classes: PropTypes.shape({

  }).isRequired,
}

export default compose(
  hot(module),
  withStyles(styles)
)(App)