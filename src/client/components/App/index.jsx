import React from 'react'
import { Route, Switch } from 'react-router-dom';
import './styles.scss'

import Home from '../routes/Home'
import Albums from '../routes/Albums'
import Stitches from '../routes/Stitches'
import Upload from '../routes/Upload'
import Account from '../routes/Account'
import MainNav from '../MainNav'
import FooterNav from '../FooterNav'


class App extends React.Component {
  render() {
    return (
      <div id="main">
        <MainNav />
        <div id="content">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/albums" component={Albums} />
            <Route path="/stitches" component={Stitches} />
            <Route path="/upload" component={Upload} />
            <Route path="/account" component={Account} />
          </Switch>
        </div>
        <FooterNav />
      </div>
    );
  }
}
  
export default App
  