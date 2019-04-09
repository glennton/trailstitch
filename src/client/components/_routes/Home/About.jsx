//Core
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';

//UI Elements
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core';
import { jssWrapper, jssWrapperPadding } from 'Styles/globalStyles'

//GraphQL Store
import DummyData from 'Utils/DummyData'

//Utils

//Components

const styles = () => ({
  aboutWrapper: {
    ...jssWrapper,
    ...jssWrapperPadding,
  },
})
class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    this.slides = DummyData(['slides']).slides
    this.sampleFunction = this.sampleFunction.bind(this)
  }

  sampleFunction(x){
    return x
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.aboutWrapper} direction="row">
        <Typography paragraph variant="h5">About</Typography>
        <Typography paragraph>Proident ex qui nulla labore ipsum exercitation anim aliqua sit elit. Mollit anim duis laborum quis tempor non culpa non mollit. Laborum sunt voluptate ipsum commodo officia proident ad ex eu sint in. Ad cupidatat exercitation ut amet consequat ex reprehenderit do consequat dolore in. In tempor sit dolor cillum. Consequat incididunt fugiat reprehenderit ullamco non sit culpa nostrud ipsum.</Typography>
      </Grid>
    );
  }
}

About.propTypes = {
  classes: PropTypes.shape({

  }).isRequired,
}

export default withStyles(styles)(About);