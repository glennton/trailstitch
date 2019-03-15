import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import DummyData from 'Utils/DummyData'

import classnames from 'classnames'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert'

const styles = theme => ({
  wrapper: {
    width: `100%`,
    maxWidth: `${theme.breakpoints.values.lg}px`,
  },
  card: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class RecentGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      expanded: false
    }
    this.cards = DummyData(['slides']).slides
    this.handleExpandClick = this.handleExpandClick.bind(this)
    this.makeCards = this.makeCards.bind(this)
  }
  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  }
  
  makeCards(){
    return (
      this.cards.map((e, i) =>
        <Grid item xs={12} sm={6} md={4} key={`recent-grid-card-${i}`}>
          <Card>
            <CardHeader
              avatar={
                <Avatar aria-label="Recipe" className={this.props.classes.avatar}>
                  R
              </Avatar>
              }
              action={
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              }
              title={e.locName}
              subheader="September 14, 2016"
            />
            <CardMedia
              className={this.props.classes.media}
              image={`${e.imgUrl}`}
              title="Paella dish"
            />
            <CardContent>
              <Typography component="p">
                {e.subText}
            </Typography>
            </CardContent>
            <CardActions className={this.props.classes.actions} disableActionSpacing>
              <IconButton aria-label="Add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="Share">
                <ShareIcon />
              </IconButton>
              <IconButton
                className={classnames(this.props.classes.expand, {
                  [this.props.classes.expandOpen]: this.state.expanded,
                })}
                onClick={this.handleExpandClick}
                aria-expanded={this.state.expanded}
                aria-label="Show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
            <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>Method:</Typography>
                <Typography paragraph>
                  Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                  minutes.
              </Typography>
                <Typography paragraph>
                  Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
                  heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
                  browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving
                  chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion,
                  salt and pepper, and cook, stirring often until thickened and fragrant, about 10
                  minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
              </Typography>
                <Typography paragraph>
                  Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
                  without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat
                  to medium-low, add reserved shrimp and mussels, tucking them down into the rice, and
                  cook again without stirring, until mussels have opened and rice is just tender, 5 to 7
                  minutes more. (Discard any mussels that don’t open.)
              </Typography>
                <Typography>
                  Set aside off of the heat to let rest for 10 minutes, and then serve.
              </Typography>
              </CardContent>
            </Collapse>
          </Card>
        </Grid>
      )
    )
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid container id="RecentGridContainer" justify="center">
        <Grid className={`${classes.wrapper}`}>
          <Typography variant="h5">Recent Trips</Typography>
          <Grid container spacing={16}>
            {this.makeCards()}
          </Grid>
        </Grid>
      </Grid>
    );
  }

}

RecentGrid.propTypes = {
  classes: PropTypes.object,
  classnames: PropTypes.string
}

export default withStyles(styles)(RecentGrid);
