import React from 'react'
import PropTypes from 'prop-types'
import parser from 'fast-xml-parser'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';
import DummyData from 'Utils/DummyData'

const xmlOptions = {
  ignoreAttributes: false,
}

const styles = theme => ({
  wrapper: {
    width: `100%`,
    maxWidth: theme.breakpoints.values.lg,
    marginBottom: `3em`,
  },
  navOffset:{
    height: `10em`,
  },
  card: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dragging: false
    }
    this.slides = DummyData(['slides']).slides

    this.handleDrag = this.handleDrag.bind(this)
    this.handleDragIn = this.handleDragIn.bind(this)
    this.handleDragOut = this.handleDragOut.bind(this)
    this.handleDrop = this.handleDrop.bind(this)
    this.handleFiles = this.handleFiles.bind(this)

    this.dropRef = React.createRef()

  }

  handleFiles = (f) => {
    // Closure to capture the file information.
    const reader = new FileReader();
    reader.onload = (function (theFile) {
      console.log(theFile)
      return function (e) {
        // Render thumbnail.
        // var span = document.createElement('span');
        // span.innerHTML = ['<img class="thumb" src="', e.target.result,
        //   '" title="', escape(theFile.name), '"/>'].join('');
        // document.getElementById('list').insertBefore(span, null);
      };
    })(f);
    reader.readAsDataURL(f);

    // Read in the image file as a data URL.
    reader.readAsDataURL(f);
  }
  handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }
  handleDragIn = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.dragCounter++  
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      this.setState({ dragging: true })
    }
  }
  handleDragOut = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.dragCounter--
    if (this.dragCounter > 0) return
    this.setState({ dragging: false })
  }
  handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.setState({ drag: false })
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      console.log(e, e.dataTransfer.files)
      if (window.FileReader){
        
        var reader = new FileReader();

        reader.onload = function (e) {
          var text = reader.result;
          console.log(parser.parse(text, xmlOptions))
        }

        reader.readAsText(e.dataTransfer.files[0]);


      }
      //this.props.handleDrop(e.dataTransfer.files)
      //e.dataTransfer.clearData()
      this.dragCounter = 0
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid container justify="center" direction="row">
        <Grid container className={classes.navOffset}></Grid>
        <Grid container className={`${classes.wrapper}`}>
          <Grid container justify="center">
            <Typography paragraph variant="h5">Upload a new GPX</Typography>
          </Grid>
          <Grid container justify="center">
            <div ref={this.dropRef}>
              <Card className={classes.card}>
                <CardContent>
                  <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {this.state.dragging?'dragging':'not dragging'}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Upload</Button>
                </CardActions>
              </Card>
            </div>
          </Grid>
        </Grid>
      </Grid>
    );
  }
  componentDidMount() {
    this.dragCounter = 0
    let div = this.dropRef.current
    div.addEventListener('dragenter', this.handleDragIn)
    div.addEventListener('dragleave', this.handleDragOut)
    div.addEventListener('dragover', this.handleDrag)
    div.addEventListener('drop', this.handleDrop)
  }
  componentWillUnmount() {
    let div = this.dropRef.current
    div.removeEventListener('dragenter', this.handleDragIn)
    div.removeEventListener('dragleave', this.handleDragOut)
    div.removeEventListener('dragover', this.handleDrag)
    div.removeEventListener('drop', this.handleDrop)
  }

}

Upload.propTypes = {
  classes: PropTypes.object,
}

export default withStyles(styles)(Upload);