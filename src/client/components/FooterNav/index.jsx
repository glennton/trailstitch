import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import './styles.scss'

class FooterNav extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      value: 0
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange = (event, value) => {
    this.setState({ value });
  };
  render() {
    return (
      <div id="FooterContainer">
        <BottomNavigation
          value={this.state.value}
          onChange={this.handleChange}
          showLabels
        >
          <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
          <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
          <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
        </BottomNavigation>
      </div>
    );
  }
}
  
export default FooterNav
  