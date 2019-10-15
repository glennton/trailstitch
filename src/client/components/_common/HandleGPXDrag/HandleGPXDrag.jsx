//Core
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import readGpxUpload from 'Common/HandleGPXDrag/readGpxUpload'
import compose from 'recompose/compose';
import { withSnackbar } from 'notistack';
import { hot } from 'react-hot-loader'
import { graphql } from "react-apollo";
import { useCookies } from 'react-cookie';
import { withRouter } from "react-router-dom";
import parsePayload from 'Utils/GraphQL/parsePayload'

//GraphQL Store
import CREATE_GPX from 'GraphQLStore/Gpx/CREATE_GPX'

//UI Elements
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import pink from '@material-ui/core/colors/pink';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Cancel from '@material-ui/icons/Cancel';

//Utils
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
    zIndex: 1000,
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
  },
  buttonContainer: {
    paddingTop: 2 * theme.spacing.unit,
    paddingBottom: 2 * theme.spacing.unit,
  }
})

const HandleGPXDrag = (props) => {
  const { children, classes, CREATE_GPX, enqueueSnackbar, history } = props

  const [cookies, setCookie] = useCookies(['user']);
  const signedUser = cookies.userData || null

  const dropRef = React.createRef()
  const [isExpanded, setIsExpanded] = useState(false)
  //const [dragIncrementer, setDragIncrementer] = useState(1)
  const [gpx, setGpx] = useState(null)
  const [isOverlayActive, setIsOverlayActive] = useState(false)
 
  let counter = 0

  useEffect(() => {

    let e = dropRef.current
    if (e){
      e.addEventListener('dragenter', handleDragIn)
      e.addEventListener('dragleave', handleDragOut)
      e.addEventListener('dragover', handleDrag)
      e.addEventListener('drop', handleDrop)
    }
  }, [dropRef.current])
  
  const handleExpandClick = () => {
    setIsExpanded(!isExpanded)
  };

  const clearFileLoad = () => {
    setIsOverlayActive(false)
    setGpx(null)
  }



  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }

  const handleDragIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    counter++
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsOverlayActive(true)
    }
  }
  const handleDragOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    counter--
    if (counter > 0) return
    setIsOverlayActive(false)
  }

  const handleDrop = (e) => {
    e.preventDefault();
    readGpxUpload(e)
      .then((res) => {
        counter = 0
        setGpx(res)
      }).catch((err) => {
        console.log(err)
        setIsOverlayActive(false)
        counter = 0
        //TODO Make Error Notification
      })
  }
 
  const handleSubmit = () => {
    console.log('data', {
      variables: {
        ...gpx,
        ownerId: signedUser._id,
        gpxRecord: signedUser.gpxRecord,
      }})
    CREATE_GPX({
      variables : {
        ...gpx,
        ownerId: signedUser._id,
        gpxRecord: signedUser.gpxRecord || "",
      }
    }).then(({data})=>{
      const { createGpxRoute } = data
      console.log('successful data', data)
      const { success, payload } = createGpxRoute
      const RecordUrl = parsePayload(payload, "RecordUrl")
      if (success && RecordUrl) {
        handleSuccessfulSubmit(RecordUrl.value)
      } else {
        handleSubmitFormErrors()
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  const handleSuccessfulSubmit = (RecordUrl) => {
    enqueueSnackbar('Upload Successful!')
    history.push(`/route/${RecordUrl}`)
    clearFileLoad()
  }
  const handleSubmitFormErrors = (errPayload = 'We apologize, an unknown error has occured. Please try logging in again.') => {
    //setFormError(errPayload)
  }

  return(
    <div ref={dropRef} className={classes.dropContainer}>
      {children}
      {isOverlayActive ? (
        <Grid container className={classes.uploadBgActive}>
          <IconButton className={classes.closeIcon} onClick={clearFileLoad}>
            <CloseIcon />
          </IconButton>
          <Grid container alignContent="center" justify="center">
            {!gpx ? (
              <Typography variant="h4" className={classes.uploadText}> Drop anywhere </Typography>
            ): ''}
            {gpx ? (
              <Grid item className={classes.uploadConfirmationBox}>
                <Grid>
                  <Typography align="center" variant="h6" className={classes.uploadText}>Ready to upload!</Typography>
                  <Typography align="center" variant="subtitle1" gutterBottom className={classes.uploadText}>
                    {`From your GPX track, it looks like you went on a trip on
                    ${gpx.dateFirst ? format(parseISO(gpx.dateFirst), ' MMMM d, yyyy ') : ''}
                    traveling over 
                    ${gpx.gpxRouteData.length} 
                    days. You can edit this later.`}                     
                  </Typography>
                </Grid>  
                <Grid container justify="center" spacing={32} className={classes.buttonContainer}>
                  <Grid item>
                    <Button variant="contained" color="primary" className={classes.button} onClick={handleSubmit}>
                      <CloudUploadIcon className={classes.rightIcon} />
                        &nbsp;&nbsp;Upload
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="outlined" color="default" className={classes.button}>
                      <Cancel className={classes.rightIcon} />
                      &nbsp;&nbsp;Cancel                      
                    </Button>
                  </Grid>
                </Grid>
                <Grid>
                  <TrackDetails gpx={gpx} primaryColor="#fff" secondaryColor="#000" />
                </Grid>
              </Grid>
            ) : ''}
          </Grid>
        </Grid> 
      ): ''}
    </div>
  )
}

HandleGPXDrag.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  classes: PropTypes.shape({

  }).isRequired,
  CREATE_GPX: PropTypes.func.isRequired,
}

export default compose(
  graphql(CREATE_GPX, { name: 'CREATE_GPX' }),
  withRouter,
  withSnackbar,
  hot(module),
  withStyles(styles)
)(HandleGPXDrag)

//https://github.com/iamhosseindhv/notistack#withsnackbar