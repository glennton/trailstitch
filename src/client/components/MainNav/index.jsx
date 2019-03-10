import React from 'react'
import { Navbar, NavItem} from 'react-materialize'
import { NavLink } from 'react-router-dom';

class MainNav extends React.Component{
  render(){
    return (
      <Navbar>
        <div className="container">
          <NavItem><NavLink to="/">Home</NavLink></NavItem>
          <NavItem><NavLink to="/albums">Albums</NavLink></NavItem>
          <NavItem>Stitches</NavItem>
          <NavItem>Upload</NavItem>
          <NavItem>Account</NavItem>
        </div>
      </Navbar>
    )
  }
}

export default MainNav