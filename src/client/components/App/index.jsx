import React from 'react'
import { Route, Switch } from 'react-router-dom';
import { Col } from 'react-materialize'
import './styles.scss'

import Home from '../routes/Home'
import Albums from '../routes/Albums'
import MainNav from '../MainNav'
import FooterNav from '../FooterNav'


class App extends React.Component {
  render() {
    return (
      <div id="main">
        <MainNav />
        <div id="content">
          <Col s={12}>
            <p>App</p>
          </Col>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/albums" component={Albums} />
          </Switch>
        </div>
        <FooterNav />
      </div>
    );
  }
}
  
export default App
  