import React from 'react'
import { Navbar, NavItem} from 'react-materialize'

import './styles.scss'

class MainNav extends React.Component{  
  render(){
    return (
      <div id="NavBarContainer">
        <Navbar >
          <div className="container">
            <NavItem href="/">Home</NavItem>
            <NavItem href="/albums">Albums</NavItem>
            <NavItem href="/stitches">Stitches</NavItem>
            <NavItem href="/upload">Upload</NavItem>
            <NavItem href="/account">Account</NavItem>
          </div>
        </Navbar>
      </div>
    )
  }
}

export default MainNav