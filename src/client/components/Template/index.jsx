import React from 'react'
import { Col } from 'react-materialize'
import './styles.scss'

class Component extends React.Component {
  render() {
    return (
      <div className="container">
        <Col s={12}>
          <p>App</p>
        </Col>
      </div>
    );
  }
}
  
export default Component
  