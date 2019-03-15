import React from 'react'
import { Route, Switch } from 'react-router-dom';
import './styles.scss'

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
  