import React from 'react'
import { withRouter, NavLink } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';

import './styles.scss'

class MainNav extends React.Component{  
  constructor(props){
    super(props)
    this.state = {
      top: false,
      left: false,
      bottom: false,
      right: false
    }
    this.navLinks = [
      {
        linkName: `Home`,
        linkPath: `/`
      },
      {
        linkName: `Albums`,
        linkPath: `/albums`
      },
      {
        linkName: `stitches`,
        linkPath: `/stitches`
      },
      {
        linkName: `upload`,
        linkPath: `/upload`
      },
      {
        linkName: `account`,
        linkPath: `/account`
      }
    ]
    this.toggleDrawer = this.toggleDrawer.bind(this)
    this.makeNavLinks = this.makeNavLinks.bind(this)
    this.makeMobileNavLinks = this.makeMobileNavLinks.bind(this)
  }
  
  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    })
  }
  
  makeNavLinks(){
    return(
      this.navLinks.map((e, i) =>
        <Button key={`topNav-${i}`}>
          <NavLink to={e.linkPath}>{e.linkName}</NavLink>
        </Button>
      )
    )
  }
  makeMobileNavLinks() {
    return (
      this.navLinks.map((e, i) =>
        <ListItem button key={`mobileNav-${i}`}>
          <ListItemIcon><MailIcon /></ListItemIcon>
          <ListItemText primary={e.linkName}/>
        </ListItem>
      )
    )
  }
  render(){
    return (
      <div id="NavBarContainer">
        <AppBar position="static" className="nav">
          <Toolbar>
            <IconButton color="inherit" aria-label="Menu" onClick={this.toggleDrawer('left', true)}>
              <MenuIcon/>
            </IconButton>
            {this.makeNavLinks()}
          </Toolbar>
        </AppBar>
        <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
          >
            <List>
              {this.makeMobileNavLinks()}
            </List>
          </div>
        </Drawer>
      </div>
    )
  }
}

export default withRouter(MainNav)