import React from 'react'
import compose from 'recompose/compose';
import { hot } from 'react-hot-loader'

class Account extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      test: 'Account',
    }
  }
  render() {
    const { test } = this.state
    return (
      <div className="container">
        {test}
      </div>
    );
  }
}

export default compose(
  hot(module),
)(Account)