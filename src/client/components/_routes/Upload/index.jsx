//Core
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import parser from 'fast-xml-parser'
import classnames from 'classnames'

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

//Development Data
import DummyData from 'Utils/DummyData'
import DummyGPX from 'Utils/DummyGPX'

//Utils
import describeGPX from 'Utils/describeGPX'
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

//Components
import TrackDetails from './TrackDetails'



const xmlOptions = {
  ignoreAttributes: false,
}

const styles = theme => ({
  wrapper: {
    width: `100%`,
    maxWidth: theme.breakpoints.values.lg,
    marginBottom: `3em`,
  },
  draggingBg: {
    background: `rgba(0,0,0,.5)`,
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
    super(props);
    this.state = {
      dragging: false,
      fileLoaded: false,
      loadedFileName: '',
      expanded: false,
      gpx:{
        gpxMeta:{
          id: '', //Set on server
          userId: '', //Set on server
          uploadDate: '', //Set on server
          lastModifiedDate: '', //Set on server
          days: [],
          dayCount: '',
          
          tags:[],
        },
        gpxData: {
          metadata: {
            link: {

            }
          },
          trk: {
            name: "",
            extensions: {
              'gpxx:TrackExtension': {},
              'gpxtrkx:TrackStatsExtension': {}
            },
            trkseg: {
              trkpt: []
            }
          }
        },
      },
      uploadError: false,
    }
    this.slides = DummyData(['slides']).slides
    this.handleDrag = this.handleDrag.bind(this)
    this.handleDragIn = this.handleDragIn.bind(this)
    this.handleDragOut = this.handleDragOut.bind(this)
    this.handleDrop = this.handleDrop.bind(this)
    this.readFiles = this.readFiles.bind(this)
    this.returnParsedData = this.returnParsedData.bind(this)
    this.parseFiles = this.parseFiles.bind(this)
    this.clearFileLoad = this.clearFileLoad.bind(this)
    this.handleExpandClick = this.handleExpandClick.bind(this)
    this.test = this.test.bind(this)

    this.dropRef = React.createRef()

  }
  test=()=>{
    console.log(this.state.gpx)
    
  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };
  clearFileLoad = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ fileLoaded: false, gpx: { gpxData: {} }, loadedFileName: '' })
  }
  parseFiles = (data)=>{
    return new Promise((resolve) => {
      if (parser.validate(data) === true) { 
        resolve(parser.parse(data, xmlOptions))
      } else {
        throw new Error("File is not a valid GPX file")
      }
    })
  }
  readFiles = (data) => {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      //Check files
      if (!window.FileReader) { throw new Error("Browser not supported") }
      if (!data.files) { throw new Error("Error Loading Files") }
      if (data.files.length != 1) { throw new Error("May only upload one file at a time") }
      reader.onerror = () => {
        reader.abort();
        reject(new DOMException("Problem parsing input file."));
      };
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsText(data.files[0]);
    })
  }

  returnParsedData = async (data) => {
    const fileName = data.files[0].name
    const readFiles = await this.readFiles(data);
    const parseFiles = await this.parseFiles(readFiles)
    const describeFiles = await describeGPX(parseFiles.gpx)
    return Promise.all([readFiles, parseFiles]).then(() => { return { data: parseFiles.gpx, name: fileName, meta: describeFiles}})
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
    e.stopPropagation();
    this.setState({ dragging: false });
    this.returnParsedData(e.dataTransfer)
      .then((res)=>{
        e.dataTransfer.clearData()
        this.dragCounter = 0;
        this.setState({ 
          fileLoaded: true, 
          gpx: {
            gpxData: res.data,
            gpxMeta: res.meta
          }, 
          loadedFileName: res.name 
        })
      }).catch(() => {
        e.dataTransfer.clearData()
        this.dragCounter = 0;
        //TODO Make Error Notification
      })

  }
  
  render() {
    const { classes } = this.props;
    return (
      <Grid container justify="center" direction="row" id="uploadContainer" onClick={this.test} className={this.state.dragging ? classes.draggingBg : ''}>
        <Grid container alignContent="center" className={`${classes.wrapper}`}>
          <Grid container justify="center">
            <Typography paragraph variant="h5">Upload a new GPX File</Typography>
          </Grid>
          <Grid container justify="center">
            <div ref={this.dropRef}>
              <Card className={classes.card}>
                <CardContent>
                  <Grid container justify="center" className={this.state.fileLoaded ? classes.hide : '' }>
                    <Typography align="center" className={classes.title} variant="body1" gutterBottom>
                      {this.state.dragging ? 'Drop here to upload files' : 'Drag a GPX track or waypoints here'}
                    </Typography>
                  </Grid>
                  <Grid container justify="center" className={!this.state.fileLoaded ? classes.hide : ''}>
                    <Grid item xs={10}>
                      <Typography align="center" variant="body1" gutterBottom className={classes.bold}>
                        File Uploaded Successfully!&nbsp;&nbsp;
                      </Typography>
                      <Typography align="center" variant="body1" gutterBottom>
                        From your GPX track, it looks like you went on a trip between
                        {this.state.gpx.gpxMeta.firstDay ? format(parseISO(this.state.gpx.gpxMeta.firstDay), ' MMMM d, yyyy ') : ''}
                        and
                        {this.state.gpx.gpxMeta.lastDay ? format(parseISO(this.state.gpx.gpxMeta.lastDay), ' MMMM d, yyyy ') : ''}
                        traveling over {this.state.gpx.gpxMeta.days.length} days. If this looks slightly off, you will be able to update your data after uploading.
                    </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions>
                  <Grid container direction="column">
                    <Grid container justify="center">
                      <Button variant="contained" color={this.state.fileLoaded ? 'primary' : 'default'} className={classes.button}>
                        Upload&nbsp;
                        <CloudUploadIcon className={classes.rightIcon} />
                      </Button>
                      <Button variant="contained" color="secondary" className={classnames(classes.button, this.state.fileLoaded ? '' : classes.hide)} onClick={this.clearFileLoad}>
                        Cancel&nbsp;
                        <DeleteIcon className={classes.rightIcon} />
                      </Button>
                    </Grid>
                  </Grid>
                </CardActions>
                <Grid container justify="center" direction="row" className={!this.state.fileLoaded ? classes.hide : ''}>
                  <Typography variant="body2" align="center" style={{alignSelf:'center', paddingRight:'1em'}}>
                    Click here to see/edit track details
                      </Typography>
                  <IconButton
                    className={classnames(classes.expand, {
                      [classes.expandOpen]: this.state.expanded,
                    })}
                    onClick={this.handleExpandClick}
                    aria-expanded={this.state.expanded}
                    aria-label="Show more"
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </Grid>
                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                  <TrackDetails gpxData={{ gpxName: this.state.gpx.gpxData.trk.name, gpxMeta: this.state.gpx.gpxData.metadata, gpxExtensions: this.state.gpx.gpxData.trk.extensions['gpxtrkx:TrackStatsExtension'],}}/>
                </Collapse>
              </Card>
            </div>
          </Grid>
        </Grid>
      </Grid>
    );
  }
  componentDidMount() {
    this.dragCounter = 0
    let e = this.dropRef.current
    e.addEventListener('dragenter', this.handleDragIn)
    e.addEventListener('dragleave', this.handleDragOut)
    e.addEventListener('dragover', this.handleDrag)
    e.addEventListener('drop', this.handleDrop)

    //FOR TESTING ONLY
    describeGPX(DummyGPX).then((res)=>{
      console.log(res)
      this.setState({
        gpx: {
          gpxData: DummyGPX,
          gpxMeta: res,
        },
        fileLoaded: true,
        loadedFileName: 'Track_AA18-06-18 112218.gpx',
      })
    }).catch(err=>err /*TODO Add error message*/)
  }

  componentWillUnmount() {
    let e = this.dropRef.current
    e.removeEventListener('dragenter', this.handleDragIn)
    e.removeEventListener('dragleave', this.handleDragOut)
    e.removeEventListener('dragover', this.handleDrag)
    e.removeEventListener('drop', this.handleDrop)
  }

}

Upload.propTypes = {
  classes: PropTypes.object,
}

export default withStyles(styles)(Upload);

// Drag and drop: https://medium.com/@650egor/simple-drag-and-drop-file-upload-in-react-2cb409d88929