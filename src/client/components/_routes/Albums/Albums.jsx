import React from 'react'
//import { jssWrapper, jssWrapperPadding } from 'Styles/globalStyles'

class Albums extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      test: 'Albums',
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
  
export default Albums
  