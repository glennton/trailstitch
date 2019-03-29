import React from 'react'

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

export default Account
