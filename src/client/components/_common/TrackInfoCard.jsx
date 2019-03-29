//Core
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';

//UI Elements
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';

//Development Data
//import DummyData from 'Utils/DummyData'

//Utils

//Components

const styles = theme => ({
  wrapper: {
    width: `100%`,
    maxWidth: theme.breakpoints.values.lg,
    marginBottom: `3em`,
    margin: `0 auto`,
  },
})
class TrackInfoCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  componentWillReceiveProps() {
    const { title, value, icon } = this.props
    this.setState({
      title: title,
      value: value,
      icon: icon,
      dataLoaded: true
    })
  }

  render() {
    const { dataLoaded, icon, title, value } = this.state
    return dataLoaded ?     
      (
        <ListItem>
          <Avatar>
            <Icon>{icon}</Icon>
          </Avatar>
          <ListItemText primary={title} secondary={value} />
        </ListItem>
      )
      :
      'Loading...'
  }
}

TrackInfoCard.propTypes = {
  classes: PropTypes.shape({

  }).isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  icon: PropTypes.string.isRequired,
}

export default withStyles(styles)(TrackInfoCard);