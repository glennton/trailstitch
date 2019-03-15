import React from 'react';
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  footerContainer: {
    paddingTop: `1em`,
  },
  wrapper: {
    width: `100%`,
    maxWidth: theme.breakpoints.lg,
  },
})

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
    const { classes } = this.props;
    return (
      <Grid className={classes.footerContainer}>
        <BottomNavigation
          value={this.state.value}
          onChange={this.handleChange}
          showLabels          
        >
          <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
          <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
          <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
        </BottomNavigation>
      </Grid>
    );
  }
}
  
FooterNav.propTypes = {
  classes: PropTypes.object,
}

export default withStyles(styles)(FooterNav);