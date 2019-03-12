import React from 'react'
import { withRouter } from 'react-router-dom'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import './styles.scss'

class MainNav extends React.Component{  
  constructor(props){
    super(props)
  }
  render(){
    return (
      <div id="NavBarContainer">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit">
              React & Material-UI Sample Application
                </Typography>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default withRouter(MainNav)