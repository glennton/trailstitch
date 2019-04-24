//Core
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames'
import compose from 'recompose/compose';
import { hot } from 'react-hot-loader'
import { Mutation } from "react-apollo";

//UI Elements
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

//GraphQL Store

//Utils
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

//Components
import readGpxUpload from 'Common/HandleGPXDrag/readGpxUpload'
import CREATE_GPX from 'GraphQLStore/Gpx/CREATE_GPX'
import TrackDetails from './TrackDetails'


const styles = theme => ({
  dropContainer: {
    width: '100%',
  },
  wrapper: {
    width: `100%`,
    maxWidth: theme.breakpoints.values.lg,
    marginBottom: `3em`,
  },
  uploadBgActive: {
    position: `fixed`,
    top: 0,
    left: 0,
    height: `100%`,
    width: `100%`,
    background: theme.palette.secondary.main,
    zIndex: 9999,
  },
  card: {
    width: `100%`,
    maxWidth: 500,
  },
  title: {
    fontSize: 14,
  },
  button: {
    margin: theme.spacing.unit,
  },
  pos: {
    marginBottom: 12,
  },
  hide: {
    display: `none`,
  },
  bold: {
    fontWeight: 500,
  }
});

class Upload extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dragging: false,
      fileLoaded: false,
      expanded: false,
      gpx: null,
    }
    this.dropRef = React.createRef()

  }

  componentDidMount() {
    this.dragCounter = 0
    let e = this.dropRef.current
    e.addEventListener('dragenter', this.handleDragIn)
    e.addEventListener('dragleave', this.handleDragOut)
    e.addEventListener('dragover', this.handleDrag)
    e.addEventListener('drop', this.handleDrop)

    // //FOR TESTING ONLY
    // describeGPX(DummyGPX).then((res) => {
    //   this.setState({
    //     gpx: res,
    //     fileLoaded: true,
    //   })
    // }).catch(err => err /*TODO Add error message*/)
  }

  componentWillUnmount() {
    let e = this.dropRef.current
    e.removeEventListener('dragenter', this.handleDragIn)
    e.removeEventListener('dragleave', this.handleDragOut)
    e.removeEventListener('dragover', this.handleDrag)
    e.removeEventListener('drop', this.handleDrop)
  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  clearFileLoad = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ fileLoaded: false, gpx: { gpxData: {} }})
  }

  handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }

  handleDragIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.dragCounter++  
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      this.setState({ dragging: true })
    }
  }

  handleDragOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.dragCounter--
    if (this.dragCounter > 0) return
    this.setState({ dragging: false })
  }

  handleDrop = (e) => {
    e.preventDefault();
    this.setState({ dragging: false });
    readGpxUpload(e)
      .then((res)=>{
        this.dragCounter = 0;
        this.setState({ 
          fileLoaded: true, 
          gpx: res, 
        })
      }).catch((err) => {
        console.log(err)
        this.dragCounter = 0;
        //TODO Make Error Notification
      })
  }
  
  render() {
    const { classes } = this.props;
    const { dragging, fileLoaded, gpx, expanded } = this.state
    console.log('gpx', gpx)
    return (
      <div ref={this.dropRef} className={classes.dropContainer}>
        {dragging ? <div className={classes.uploadBgActive} /> : ''}
        <Grid container justify="center" direction="row" id="uploadContainer">
          <Grid container alignContent="center" className={`${classes.wrapper}`}>
            <Grid container justify="center">
              <Typography paragraph variant="h5">Upload a new GPX File</Typography>
            </Grid>
            <Grid container justify="center">
              <Mutation mutation={CREATE_GPX}>
                {(createGpxRoute, { data }) => (


                  <Card className={classes.card}>
                    <CardContent>
                      {fileLoaded ? (
                        <Grid container justify="center" className={!fileLoaded ? classes.hide : ''}>
                          <Grid item xs={10}>
                            <Typography align="center" gutterBottom className={classes.bold}>
                              File Uploaded Successfully!&nbsp;&nbsp;
                            </Typography>
                            <Typography align="center" gutterBottom>
                              From your GPX track, it looks like you went on a trip between
                              {gpx.dateFirst ? format(parseISO(gpx.dateFirst), ' MMMM d, yyyy ') : ''}
                              and
                              {gpx.dateLast ? format(parseISO(gpx.dateLast), ' MMMM d, yyyy ') : ''}
                              traveling over 
                              {gpx.gpxRouteData.length} 
                              days. If this looks slightly off, you will be able to update your data after uploading.
                            </Typography>
                          </Grid>
                        </Grid>
                        ):(
                          <Grid container justify="center" className={fileLoaded ? classes.hide : ''}>
                            <Typography align="center" className={classes.title} gutterBottom>
                              {dragging ? 'Drop here to upload files' : 'Drag a GPX track or waypoints here'}
                            </Typography>
                          </Grid>
                      )}
                    </CardContent>
                    <CardActions>
                      <Grid container direction="column">
                        <Grid container justify="center">
                          <Button variant="contained" color={fileLoaded ? 'primary' : 'default'} className={classes.button} onClick={()=>{createGpxRoute({variables: gpx})}}>
                            Upload&nbsp;
                            <CloudUploadIcon className={classes.rightIcon} />
                          </Button>
                          <Button variant="contained" color="secondary" className={classnames(classes.button, fileLoaded ? '' : classes.hide)} onClick={this.clearFileLoad}>
                            Cancel&nbsp;
                            <DeleteIcon className={classes.rightIcon} />
                          </Button>
                        </Grid>
                      </Grid>
                    </CardActions>
                    {fileLoaded ?(
                      <Grid>
                        <Grid container justify="center" direction="row" className={!fileLoaded ? classes.hide : ''}>
                          <Typography align="center" style={{ alignSelf: 'center', paddingRight: '1em' }}>
                            Click here to see/edit track details
                          </Typography>
                          <IconButton
                            className={classnames(classes.expand, {
                              [classes.expandOpen]: expanded,
                            })}
                            onClick={this.handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="Show more"
                          >
                            <ExpandMoreIcon />
                          </IconButton>
                        </Grid>
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                          <TrackDetails gpx={gpx} />
                        </Collapse>
                      </Grid> 
                      ): ''}                
                  </Card>
                )}


              </Mutation>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Upload.propTypes = {
  classes: PropTypes.shape({

  }).isRequired,
}

export default compose(
  hot(module),
  withStyles(styles)
)(Upload)

// Drag and drop: https://medium.com/@650egor/simple-drag-and-drop-file-upload-in-react-2cb409d88929