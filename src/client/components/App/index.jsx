//Core
import React from 'react'
import { Route, Switch } from 'react-router-dom';
import './styles.scss'

//UI Elements
import Grid from '@material-ui/core/Grid'

//Components
import Home from 'Routes/Home'
import Albums from 'Routes/Albums'
import MyRoutes from 'Routes/MyRoutes'
import Stitches from 'Routes/Stitches'
import StitchEditor from 'Routes/StitchEditor'
import Upload from 'Routes/Upload'
import Account from 'Routes/Account'
import MainNav from 'Common/MainNav'
import FooterNav from 'Common/FooterNav'


function App() {
  return (
    <Grid id="main">
      <MainNav />
      <Grid container id="content">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/albums" component={Albums} />
          <Route path="/myroutes" component={MyRoutes} />
          <Route path="/stitches" component={Stitches} />
          <Route path="/upload" component={Upload} />
          <Route path="/account" component={Account} />
          <Route path="/editor" component={StitchEditor} />
        </Switch>
      </Grid>
      <FooterNav />
    </Grid>
  );
}
  
export default App
  