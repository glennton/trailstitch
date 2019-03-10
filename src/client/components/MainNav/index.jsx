import React from 'react'
import { Navbar, NavItem} from 'react-materialize'

class MainNav extends React.Component{

  handleOnClick = () => {
    this.setState({redirect: true});
  }
  
  render(){
    return (
      <Navbar>
        <div className="container">
          <NavItem href="/">Home</NavItem>
          <NavItem href="/albums">Albums</NavItem>
          <NavItem href="/stitches">Stitches</NavItem>
          <NavItem href="/upload">Upload</NavItem>
          <NavItem href="/account">Account</NavItem>
        </div>
      </Navbar>
    )
  }
}

export default MainNav