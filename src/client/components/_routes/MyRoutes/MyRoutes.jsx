//Core
import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import { hot } from 'react-hot-loader'
import { Query } from "react-apollo";

//UI Elements
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubble from '@material-ui/icons/ChatBubble';
import ThumbUpAlt from '@material-ui/icons/ThumbUpAlt';
import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

//GraphQL Store
import UserContext from 'Context/UserContext'
import DummyStitch from 'Utils/DummyStitch'
import DummyData from 'Utils/DummyData'
import GET_ALL_GPX from 'GraphQLStore/Gpx/GET_ALL_GPX'

//import DummyData from 'Utils/DummyData'

//Utils
import convertDMS from 'Utils/mapUtils/convertDMS'

//Components
import ParseCoords from 'Utils/mapUtils/ParseCoords'

const styles = theme => ({
  wrapper: {
    width: `100%`,
    maxWidth: theme.breakpoints.values.lg,
    marginBottom: `3em`,
    margin: `0 auto`,
    paddingLeft: 2 * theme.spacing.unit,
    paddingRight: 2 * theme.spacing.unit,
    // [theme.breakpoints.up('lg')]: { //1280
      
    // },
  },
  routeGridItem: {
    '&:hover': {
      cursor: 'pointer',
    }
  },
  routeTopContainer: {
    position: 'relative',
    lineHeight: 0,
  },
  routePreviewImageContainer: {
    maxWidth: '100%',
    height: 0,
    paddingBottom: '60%',
    zIndex: 10,
    backgroundSize: `cover`,

  }, 
  routeOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    background: 'rgba(0,0,0,.5)',
    zIndex: 20,
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  routeOptions: {
    position: 'absolute',
    zIndex:  30,
    top: theme.spacing.unit,
    right: theme.spacing.unit,
  },
  optionsIcon: {
    background: 'rgba(255,255,255,.5)',
    transition: 'background 0.3s',
    padding: '5px',
    ['&:hover']:{
      background: 'rgba(255,255,255,1)',
      transition: 'background 0.3s',
    }
  },
  optionsMenuItem: {
    ...theme.typography.caption
  },
  optionsDelete: {
    color: red[400],
  },
  routeSocialContainer: {
    width: 'auto',
    marginRight: theme.spacing.unit,
  },
  routeSocialIcons: {
    width: '.7em',
    height: '.7em',
    marginRight: theme.spacing.unit * .5,
  },
  routeSocialText: {
    color: grey[500],
  },
  routePreviewCoords: {
    width: '100%',
  },
  routePreviewDetails: {
    paddingTop: theme.spacing.unit,
    paddingRight: 2 * theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: 2 * theme.spacing.unit,
  }

})


const MyRoutes = (props) => {
  const { classes, history } = props
  const { signedUser, setUserCookies, unsetUserCookies } = useContext(UserContext)
  const [activeRouteMenu, setActiveRouteMenu ] = useState(null)

  console.log('signedUser', signedUser)
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     routeOptionAnchorEl: null,
  //   }
  // }

  // componentDidMount() {
  //   this.setState({
  //     dataLoaded: true,
  //     slides: DummyData(['slides']).slides
  //   })
  // }
  // componentWillReceiveProps() {
  //   if (this.props) {
  //     this.setState({
  //       //
  //     })
  //   }
  // }
  const handleRouteMenuClick = (event) => {
    event.stopPropagation()
    setActiveRouteMenu(event.currentTarget)
  };

  const handleRouteMenuClose = () => {
    setActiveRouteMenu(null)
  };

  const handleDeleteRoute = () => {
    //this.setState({ routeOptionAnchorEl: null });
    //DELETE
  }

  const handleGridItemClick = (shortUrl) => (event) => {
    event.preventDefault()
    history.push(`/route/${shortUrl}`)

  }

  const renderRecentRoutes = ({getAllRoutes}) => {
    console.log('renderRecentRoutes', getAllRoutes)
    
    return getAllRoutes.map((route) => {
      const { _id = '', shortid = '', imgUrl = '', centralCoords = {lat: '', lng: ''}, name } = route
      return (
        <Grid item key={_id} sm={3} onClick={handleGridItemClick(shortid)} className={classes.routeGridItem}>
          <Paper>
            <Grid item className={classes.routeTopContainer}>
              <Grid className={classes.routeOptions}>
                <IconButton className={classes.optionsIcon} onClick={handleRouteMenuClick}>
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id=""
                  anchorEl={activeRouteMenu}
                  open={Boolean(activeRouteMenu)}
                  onClose={handleRouteMenuClose}
                >
                  <MenuItem onClick={handleRouteMenuClose} className={classes.optionsMenuItem}>Edit Route</MenuItem>
                  <MenuItem onClick={handleDeleteRoute} className={classNames(classes.optionsMenuItem, classes.optionsDelete)}>Delete Route</MenuItem>
                </Menu>
              </Grid>
              <Grid 
                className={classes.routePreviewImageContainer}
                style={{ backgroundImage: `url(${imgUrl})`}}
              />
              <Grid container className={classes.routeOverlay} alignContent="center">
                <Grid className={classes.routePreviewCoords}>
                  <ParseCoords coords={convertDMS(centralCoords.lat, centralCoords.lng)} variant="subtitle2" color="#fff" justifycontent="center" />
                </Grid>
              </Grid>
            </Grid>
            <Grid container className={classes.routePreviewDetails}>
              <Grid item sm={12} zeroMinWidth>
                <Typography gutterBottom noWrap> 
                  { name }
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Grid container justify="flex-end"> 
                  <Grid container className={classes.routeSocialContainer}>
                    <FavoriteIcon color="disabled" className={classes.routeSocialIcons} />
                    <Typography variant="caption" className={classes.routeSocialText}>2</Typography>
                  </Grid>
                  <Grid container className={classes.routeSocialContainer}>
                    <ChatBubble color="disabled" className={classes.routeSocialIcons} />
                    <Typography variant="caption" className={classes.routeSocialText}>20</Typography>
                  </Grid>
                  <Grid container className={classes.routeSocialContainer}>
                    <ThumbUpAlt color="disabled" className={classes.routeSocialIcons} />
                    <Typography variant="caption" className={classes.routeSocialText}>150</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      )
    })
    //const { slides, routeOptionAnchorEl } = this.state
    // return slides.map((e)=>{
    //   return (
    //     <Grid item key={e.id} sm={3}>
    //       <Paper>
    //         <Grid item className={classes.routeTopContainer}>
    //           <Grid className={classes.routeOptions}>
    //             <IconButton className={classes.optionsIcon} onClick={this.handleRouteMenuClick}>
    //               <MoreVertIcon />
    //             </IconButton>
    //             <Menu
    //               id=""
    //               anchorEl={routeOptionAnchorEl}
    //               open={Boolean(routeOptionAnchorEl)}
    //               onClose={this.handleRouteMenuClose}
    //             >
    //               <MenuItem onClick={this.handleRouteMenuClose} className={classes.optionsMenuItem}>Edit Route</MenuItem>
    //               <MenuItem onClick={this.handleDeleteRoute} className={classNames(classes.optionsMenuItem, classes.optionsDelete)}>Delete Route</MenuItem>
    //             </Menu>
    //           </Grid>
    //           <Grid 
    //             className={classes.routePreviewImageContainer}
    //             style={{ backgroundImage: `url(${e.imgUrl})`}}
    //           />
    //           <Grid container className={classes.routeOverlay} alignContent="center">
    //             <Grid className={classes.routePreviewCoords}>
    //               <ParseCoords coords={convertDMS(e.lat, e.lng)} variant="subtitle2" color="#fff" justifycontent="center" />
    //             </Grid>
    //           </Grid>
    //         </Grid>
    //         <Grid container className={classes.routePreviewDetails}>
    //           <Grid item sm={12} zeroMinWidth>
    //             <Typography gutterBottom noWrap> 
    //               {e.locName} 
    //             </Typography>
    //           </Grid>
    //           <Grid item xs={6}>
    //             <Grid container justify="flex-end"> 
    //               <Grid container className={classes.routeSocialContainer}>
    //                 <FavoriteIcon color="disabled" className={classes.routeSocialIcons} />
    //                 <Typography variant="caption" className={classes.routeSocialText}>2</Typography>
    //               </Grid>
    //               <Grid container className={classes.routeSocialContainer}>
    //                 <ChatBubble color="disabled" className={classes.routeSocialIcons} />
    //                 <Typography variant="caption" className={classes.routeSocialText}>20</Typography>
    //               </Grid>
    //               <Grid container className={classes.routeSocialContainer}>
    //                 <ThumbUpAlt color="disabled" className={classes.routeSocialIcons} />
    //                 <Typography variant="caption" className={classes.routeSocialText}>150</Typography>
    //               </Grid>
    //             </Grid>
    //           </Grid>
    //         </Grid>
    //       </Paper>
    //     </Grid>
    //   )
    // })
  } 
  return (
    <Grid container className={classNames(classes.wrapper, ``)}> 
      <Grid container spacing={16} direction="row" alignContent="flex-start">
        <Grid item xs={12}>
          <Typography variant="h6">My Routes:</Typography>
        </Grid>
        <Grid container spacing={16}>
          <Query query={GET_ALL_GPX} variables={{ ownerId: signedUser._id }}>
            {({ loading, error, data }) => {
              console.log('my routes data', data, Boolean(data))
              return data.getAllRoutes ? renderRecentRoutes(data) : <></>
            }}
          </Query>
        </Grid>
        {/* {renderRecentRoutes()} */}
      </Grid>
      <>
      </>
    </Grid>
  );
}

MyRoutes.propTypes = {
  classes: PropTypes.shape({

  }).isRequired,
}

export default compose(
  hot(module),
  withStyles(styles)
)(MyRoutes)