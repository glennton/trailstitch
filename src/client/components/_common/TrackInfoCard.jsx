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

  render() {
    return this.state.dataLoaded ?     
      (
        <ListItem>
          <Avatar>
            <Icon>{this.state.icon}</Icon>
          </Avatar>
          <ListItemText primary={this.state.title}secondary={this.state.value} />
        </ListItem>
      )
      :
      'Loading...'
  }
  componentWillReceiveProps() {
    this.setState({
      title: this.props.title,
      value: this.props.value,
      icon: this.props.icon,
      dataLoaded: true
    })
  }
}

TrackInfoCard.propTypes = {
  classes: PropTypes.object,
  title: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  icon: PropTypes.string,
}

export default withStyles(styles)(TrackInfoCard);