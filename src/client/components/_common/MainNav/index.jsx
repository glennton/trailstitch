//Core
import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom'
import compose from 'recompose/compose';
import { hot } from 'react-hot-loader'

//UI Elements
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

//Development Data
import DummyData from 'Utils/DummyData'

//import DummyData from 'Utils/DummyData'

//Utils

//Components

const styles = theme => ({
  navBarContainer: {
    [theme.breakpoints.up('sm')]: {
      width: `100%`,
    }
  },
  mainNavigation: {
    background: theme.palette.primary.dark,
    marginBottom: theme.spacing.unit * 4,
  },
  mainNavLink:{
    color: `#fff`,
    textDecoration: `none`,
  }
  
})

class MainNav extends React.Component{  
  constructor(props){
    super(props)
    this.state = {
      left: false,
    }
    this.navLinks = this.slides = DummyData(['pageNavItems']).pageNavItems
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
    const {classes} = this.props
    return(
      this.navLinks.map((e) =>(
        <Button key={`topNav-${e.linkName}`}>
          <NavLink className={classes.mainNavLink} to={e.linkPath}>{e.linkName}</NavLink>
        </Button>
      ))
    )
  }

  makeMobileNavLinks() {
    return (
      this.navLinks.map((e) => (
        <ListItem button key={`mobileNav-${e.linkName}`}>
          <ListItemIcon><MailIcon /></ListItemIcon>
          <ListItemText primary={e.linkName} />
        </ListItem>
      ))
    )
  }

  render(){
    const { classes } = this.props
    const { left } = this.state
    return (
      <div id="NavBarContainer" className={`${classes.navBarContainer}`}>
        <AppBar position="static" className={`${classes.mainNavigation}`}>
          <Toolbar>
            <IconButton color="inherit" aria-label="Menu" onClick={this.toggleDrawer('left', true)}>
              <MenuIcon />
            </IconButton>
            {this.makeNavLinks()}
          </Toolbar>
        </AppBar>
        <Drawer open={left} onClose={this.toggleDrawer('left', false)}>
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

MainNav.propTypes = {
  classes: PropTypes.shape({

  }).isRequired
}

export default compose(
  hot(module),
  withStyles(styles)
)(MainNav)
