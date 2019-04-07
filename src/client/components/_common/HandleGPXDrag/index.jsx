//Core
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import readGpxUpload from 'Common/HandleGPXDrag/readGpxUpload'
import compose from 'recompose/compose';
import { withSnackbar } from 'notistack';
import classnames from 'classnames'
import { hot } from 'react-hot-loader'

//Development Data
import DummyGPX from 'Utils/DummyGPX'

//UI Elements
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import pink from '@material-ui/core/colors/pink';
import IconButton from '@material-ui/core/IconButton';

//Utils
import describeGPX from 'Utils/mapUtils/describeGPX'
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import CloseIcon from '@material-ui/icons/Close';

//Components
import TrackDetails from 'Common/TrackDetails'

const styles = theme => ({
  dropContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
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
  uploadText: {
    color: pink[50],
  },
  uploadConfirmationBox: {
    flexBasis: '30vw',
    padding: 2 * theme.spacing.unit,
  },
  closeIcon: {
    background: 'rgba(255,255,255,.5)',
    ['&:hover']: {
      background: 'rgba(255,255,255,1)',
      transition: 'background 0.3s',
      color: '#000'
    },
    position: 'absolute',
    top: 2 * theme.spacing.unit,
    right: 2 * theme.spacing.unit,
    color: '#fff'
  }
})

class HandleGPXDrag extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      dragging: false,
      fileLoaded: false,
      expanded: false,
      gpx: null,
      uploadOverlayActive: false,
    }
    this.dropRef = React.createRef()
  }

  componentDidMount() {
    console.log(this.dropRef)
    this.dragCounter = 0
    let e = this.dropRef.current
    e.addEventListener('dragenter', this.handleDragIn)
    e.addEventListener('dragleave', this.handleDragOut)
    e.addEventListener('dragover', this.handleDrag)
    e.addEventListener('drop', this.handleDrop)

    //FOR TESTING ONLY
    describeGPX(DummyGPX).then((res) => {
      this.setState({
        gpx: res,
        fileLoaded: true,
      })
    }).catch(err => err /*TODO Add error message*/)
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
    this.setState({ fileLoaded: false, gpx: { gpxData: {} } })
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
      this.setState({ uploadOverlayActive: true })
    }
  }

  handleDragOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.dragCounter--
    if (this.dragCounter > 0) return
    this.setState({ uploadOverlayActive: false })
  }

  handleDrop = (e) => {
    const { enqueueSnackbar } = this.props
    e.preventDefault();
    readGpxUpload(e)
      .then((res) => {
        console.log(res)
        enqueueSnackbar('Done!')
        this.dragCounter = 0;
        this.setState({
          fileLoaded: true,
          gpx: res,
        })
      }).catch((err) => {
        console.log(err)
        this.setState({ uploadOverlayActive: false });
        this.dragCounter = 0;
        //TODO Make Error Notification
      })
  }

  render() {
    const { children, classes } = this.props
    const { uploadOverlayActive, fileLoaded, gpx } = this.state
    
    return(
      <div ref={this.dropRef} className={classes.dropContainer}>
        {children}
        {uploadOverlayActive ? (
          <Grid container className={classes.uploadBgActive}>
            <IconButton className={classes.closeIcon} onClick={this.clearFileLoad}>
              <CloseIcon />
            </IconButton>
            <Grid container alignContent="center" justify="center">
              {!fileLoaded ? (
                <Typography variant="h4" className={classes.uploadText}> Drop anywhere </Typography>
              ): ''}
              {fileLoaded ? (
                <Grid item className={classes.uploadConfirmationBox}>
                  <Typography align="center" variant="h6" className={classes.uploadText}>Ready to upload!</Typography>
                  <Typography align="center" variant="subtitle1" gutterBottom className={classes.uploadText}>
                    {`From your GPX track, it looks like you went on a trip on
                    ${gpx.dateFirst ? format(parseISO(gpx.dateFirst), ' MMMM d, yyyy ') : ''}
                    traveling over 
                    ${gpx.days.length} 
                    days.`}                     
                  </Typography>
                  <TrackDetails gpx={gpx} primaryColor="#fff" secondaryColor="#000" />
                </Grid>
              ) : ''}
            </Grid>
          </Grid> 
        ): ''}
      </div>
    )
  }
}

HandleGPXDrag.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  classes: PropTypes.shape({

  }).isRequired,
}

export default compose(
  withSnackbar,
  hot(module),
  withStyles(styles)
)(HandleGPXDrag)

//https://github.com/iamhosseindhv/notistack#withsnackbar