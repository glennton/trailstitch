import React from 'react'
import { Route, Switch } from 'react-router-dom';
import './styles.scss'

import Grid from '@material-ui/core/Grid'

import Home from 'Routes/Home'
import Albums from 'Routes/Albums'
import Stitches from 'Routes/Stitches'
import Upload from 'Routes/Upload'
import Account from 'Routes/Account'
import MainNav from 'Common/MainNav'
import FooterNav from 'Common/FooterNav'


class App extends React.Component {
  render() {
    return (
      <Grid id="main">
        <MainNav />
        <Grid container id="content">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/albums" component={Albums} />
            <Route path="/stitches" component={Stitches} />
            <Route path="/upload" component={Upload} />
            <Route path="/account" component={Account} />
          </Switch>
        </Grid>
        <FooterNav />
      </Grid>
    );
  }
}
  
export default App
  