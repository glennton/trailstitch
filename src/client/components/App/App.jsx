//Core
import React, { lazy, Suspense, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom';
import './styles.scss'
import PropTypes from 'prop-types'
import { SnackbarProvider } from 'notistack';
import compose from 'recompose/compose';
import { hot } from 'react-hot-loader'
import { withStyles } from '@material-ui/core/styles';
import { useCookies } from 'react-cookie';
import { graphql } from "react-apollo";

//Data
import setToken from 'GraphQLStore/Login/setToken'

//UI Elements
import Grid from '@material-ui/core/Grid'

//Components
import Home from 'Routes/Home/Home'
import MainNav from 'Common/MainNav'
import FooterNav from 'Common/FooterNav'
import HandleGPXDrag from 'Common/HandleGPXDrag'
const Albums = React.lazy(() => import("Routes/Albums/Albums"))
const MyRoutes = React.lazy(() => import("Routes/MyRoutes/MyRoutes"))
const Stitches = React.lazy(() => import("Routes/Stitches/Stitches"))
const StitchEditor = React.lazy(() => import("Routes/StitchEditor/StitchEditor"))
const Upload = React.lazy(() => import("Routes/Upload/Upload"))
const Account = React.lazy(() => import("Routes/Account/Account"))
const CreateAccount = React.lazy(() => import("Routes/CreateAccount/CreateAccount"))


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

  const { classes, setToken } = props
  const [cookies] = useCookies(['user']);
  const token = cookies.user || null
  const checkCookiesAndSetToken = async()=>{
    await setToken({ variables: { token: token } })
  }
  const renderApp = (
    <Grid container direction="column" className={classes.appContainer}>
      <SnackbarProvider maxSnack={3}>
        <HandleGPXDrag>
          <MainNav />
          <Grid container className={classes.contentContainer}>
            <Switch>
              <Suspense fallback={<div>Loading...</div>}>
                <Route exact path="/" component={Home} />
                <Route path="/albums" render={() => <Albums />} />
                <Route path="/myroutes" render={() => <MyRoutes />} />
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
      </SnackbarProvider>
    </Grid>
  )
  checkCookiesAndSetToken()
  return renderApp
  //checkCookiesAndSetToken().then(() => renderApp)
  // try{
  //   checkCookiesAndSetToken().then(() => renderApp)
  // }catch(err){
  //   console.log(err)
  // }finally{
  //   return renderApp
  // }

  
  console.log('App Set Cookie')


}

App.propTypes = {
  classes: PropTypes.shape({

  }).isRequired,
}

export default compose(
  graphql(setToken, { name: 'setToken' }),
  hot(module),
  withStyles(styles)
)(App)