//Core
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';

//UI Elements
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';

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
  componentDidMount() {
    const { title, value, icon } = this.props
    this.setState({
      title: title,
      value: value,
      icon: icon,
      dataLoaded: true
    })
  }  
  componentWillReceiveProps() {
    const { title, value, icon } = this.props
    this.setState({
      title: title,
      value: value,
      icon: icon,
    })
  }

  render() {
    const { dataLoaded, icon, title, value } = this.state
    const { primaryColor, secondaryColor } = this.props
    return dataLoaded ?     
      (
        <ListItem>
          <Avatar style={{ backgroundColor: secondaryColor }}>
            <Icon>{icon}</Icon>
          </Avatar>
          <ListItemText primary={title} secondary={value} primaryTypographyProps={{ style: { color: primaryColor } }} secondaryTypographyProps={{ style: { color: primaryColor } }} />
        </ListItem>
      )
      :
      ''
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
  primaryColor: PropTypes.string,
  secondaryColor: PropTypes.string,

}
TrackInfoCard.defaultProps = {
  primaryColor: "#000",
  secondaryColor: "#FFF",
}

export default withStyles(styles)(TrackInfoCard);