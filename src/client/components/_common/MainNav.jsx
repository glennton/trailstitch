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
import AccountCircle from '@material-ui/icons/AccountCircle';
import Popover from '@material-ui/core/Popover';
import { jssWrapper } from 'Styles/globalStyles'
import Typography from '@material-ui/core/Typography'

//Development Data
import DummyData from 'Utils/DummyData'
import { Grid } from '@material-ui/core';

//import DummyData from 'Utils/DummyData'

//Utils

//Components
import Login from 'Common/Login'

const styles = theme => ({
  navWrapper: {
    ...jssWrapper
  },
  navBarContainer: {
    [theme.breakpoints.up('sm')]: {
      width: `100%`,
    }
  },
  mainNavigation: {
    background: theme.palette.common.white,
    boxShadow: 'none',
    borderBottom: '1px solid ' + theme.palette.border.light,

  },
  toolbar: {
    display: 'flex',
    ...jssWrapper
  },
  toolbarNav: {
     flexGrow: '1',
  },
  mainNavLink:{
    color: theme.palette.grey.A700,
    textDecoration: `none`,
  },
  accountButton:{
    justifySelf: 'flex-end',
  },
  accountIcon: {
    color: theme.palette.grey[500],
  },
  popoverContainer: {
    padding: 2 * theme.spacing.unit,
  },
})

class MainNav extends React.Component{  
  constructor(props){
    super(props)
    this.state = {
      left: false,
      loginPopoverActive: true,
    }
    this.popoverRef = React.createRef()
    this.navLinks = this.slides = DummyData(['pageNavItems']).pageNavItems
  }
  
  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    })
  }
  
  makeNavLinks = () => {
    const {classes} = this.props
    return(
      this.navLinks.map((e) =>(
        <Button key={`topNav-${e.linkName}`}>
          <NavLink className={classes.mainNavLink} to={e.linkPath}>{e.linkName}</NavLink>
        </Button>
      ))
    )
  }

  handlePopoverOpen = () => {
    this.setState({
      loginPopoverActive: true
    })
  }
  handlePopoverClose = () => {
    this.setState({
      loginPopoverActive: false
    })
  }

  makeMobileNavLinks = () => {
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
    const { left, loginPopoverActive} = this.state
    return (
      <div id="NavBarContainer" className={`${classes.navBarContainer}`}>
        <AppBar position="static" className={`${classes.mainNavigation}`}>
          <Toolbar className={`${classes.toolbar}`}>
            <IconButton color="inherit" aria-label="Menu" onClick={this.toggleDrawer('left', true)}>
              <MenuIcon />
            </IconButton>
            <Grid className={classes.toolbarNav}>
              {this.makeNavLinks()}
            </Grid>
            <div ref={this.popoverRef}>
              <IconButton
                aria-owns={open ? 'menu-appbar' : undefined}
                aria-haspopup="true"
                onClick={this.handlePopoverOpen}
                color="inherit"
                className={classes.accountButton}

              >
                <AccountCircle className={classes.accountIcon} />
              </IconButton>
            </div>
            <Login 
              anchorEl={()=>this.popoverRef.current}
              onClose={this.handlePopoverClose}
              openState={loginPopoverActive}
            />
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
