//Core
import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom'
import compose from 'recompose/compose';
import { hot } from 'react-hot-loader'
import { jssWrapper } from 'Styles/globalStyles'

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
import { Grid } from '@material-ui/core';

//GraphQL Store
import DummyData from 'Utils/DummyData'
import UserContext from 'Context/UserContext'

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
})

const MainNav = (props) => {  
  
  const { classes } = props 
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const navLinks = DummyData(['pageNavItems']).pageNavItems
  const {signedUser} = useContext(UserContext)

  const makeNavLinks = () => {
    return(
      navLinks.map((e) =>(
        <Button key={`topNav-${e.linkName}`}>
          <NavLink className={classes.mainNavLink} to={e.linkPath}>{e.linkName}</NavLink>
        </Button>
      ))
    )
  }

  const makeMobileNavLinks = () => {
    return (
      navLinks.map((e) => (
        <ListItem button key={`mobileNav-${e.linkName}`}>
          <ListItemIcon><MailIcon /></ListItemIcon>
          <ListItemText primary={e.linkName} />
        </ListItem>
      ))
    )
  }

  return (
    <div id="NavBarContainer" className={`${classes.navBarContainer}`}>
      <AppBar position="static" className={`${classes.mainNavigation}`}>
        <Toolbar className={`${classes.toolbar}`}>
          <IconButton color="inherit" aria-label="Menu" onClick={() => setMobileNavOpen(true)}>
            <MenuIcon />
          </IconButton>
          <Grid className={classes.toolbarNav}>
            {makeNavLinks()}
          </Grid>
          <Login />
        </Toolbar>
      </AppBar>
      <Drawer open={mobileNavOpen} onClose={() => setMobileNavOpen(false)}>
        <div
          tabIndex={0}
          role="button"
          onClick={() => setMobileNavOpen(false)}
          onKeyDown={() => setMobileNavOpen(false)}
        >
          <List>
            {makeMobileNavLinks()}
          </List>
        </div>
      </Drawer>
    </div>
  )
}

MainNav.propTypes = {
  classes: PropTypes.shape({

  }).isRequired,
}

export default compose(
  hot(module),
  withStyles(styles)
)(MainNav)
