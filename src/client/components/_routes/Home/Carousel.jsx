//Core
import React from 'react'
import PropTypes from 'prop-types';
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles';

//UI Elements
import Grid from '@material-ui/core/Grid'
import Icon from '@material-ui/core/Icon';
import Slider from 'Utils/StupidSlider'
import Typography from '@material-ui/core/Typography';

//GraphQL Store
import DummyData from 'Utils/DummyData'

//Utils
import convertDMS from 'Utils/mapUtils/convertDMS'
//Components
import ParseCoords from 'Utils/mapUtils/ParseCoords'

const styles = theme => ({
  locationHeader:{
    textShadow: `1px 1px 2px #000000`,
  },
  carouselBgContent:{
    backgroundSize: `cover`,
    minHeight: '50vh',
    height: '70vh',
    zIndex: 1,
  },
  carouselSlide:{
    position: 'relative',
  },
  slideContent:{
    background: 'rgba(0, 0, 0, 0)',
    position: 'absolute',
    minHeight: '50vh',
    height: '70vh',
    zIndex: 2,
  },
  slideTextContent:{
    flexDirection: 'column-reverse',
    position: 'relative',
    overflow: 'hidden',
  },
  slideFeatures:{
    borderTop: `1px solid #fff`,
    alignSelf: 'self-start',
    width: 'auto',
    minWidth: '50vw',
    paddingTop: `1em`,
    marginTop: `1em`,
    paddingBottom: `1em`,
  },
  featureItem:{
    padding: `0.5em`,
    textAlign: `center`,
  },
  featureIcons:{
    fontSize: '3em',
  },
  coordContainer: {
    padding: `1em 0`,
  },
  carouselNav:{
    zIndex: 2,
    background: `#000`,
    overflow: 'visible',
    [theme.breakpoints.up('sm')]: {
      position: `absolute`,
      top: `50%`,
      height: 0,
    }
  },
  carouselNavArrows: {
    display: `flex`,
    alignItems: `center`,
    color: `#fff`,
  },
  carouselNavArrowsIcons:{
    fontSize: `5em`,
    color: `#fff`,
    '&:hover': {
      cursor: `pointer`,
    }
  },
  featureTitle:{
    textTransform: `uppercase`,
    fontWeight: 600,
  }
});

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      carouselCounter: 0
    }
    this.slides = DummyData(['slides']).slides
    this.renderSlides = this.renderSlides.bind(this)
    this.renderSlideFeatures = this.renderSlideFeatures.bind(this)
  }
  
  handleNextSlide = () => {
    this.setState((prevState) => ({
      carouselCounter: prevState.carouselCounter + 1
    }))
  }

  handlePrevSlide = () => {
    this.setState((prevState) => ({
      carouselCounter: prevState.carouselCounter - 1
    }))
  }
  renderSlides(){
    const { classes } = this.props;
    return (
      this.slides.map( (e) =>(
        <Grid container key={`slide-${e.id}`} className={`${classes.carouselSlide}`}>
          <Grid container className={`${classes.carouselBgContent}`} style={{backgroundImage : `url(${e.imgUrl})`}} />
          <Grid container className={`${classes.slideContent}`}>
            <Grid container className="wrapper" direction="row">
              <Grid container className={`${classes.slideTextContent}`}>
                <Grid container justify="center" className={`${classes.slideExrasContainer}`}>
                  {this.renderSlideFeatures(e.features)}
                </Grid>
                <Grid container justify="center" className={`${classes.slideHeader}`}>
                  <Grid item sm={10}>
                    <Typography component="h2" variant="h2" align="center" className={classNames(classes.locationHeader, 'txt-white')}>{e.locName}</Typography>
                    <ParseCoords coords={convertDMS(e.lat, e.lng)} styles={{ color: `#fff` }} className={`${classes.coordContainer}`} />
                    <Typography variant="h6" className="txt-white" align="center">{e.subText}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ))
    )
  }
  renderSlideFeatures({gpsTrax = false, pictures = false, blogNotes = false}){
    const { classes } = this.props;
    return (
      <Grid container className={`${classes.slideFeatures}`} justify="center" direction="row">
        { gpsTrax ? (
          <Grid item className={`${classes.featureItem}`}>
            <Icon className={`${classes.featureIcons}`}>
              directions
            </Icon>
            <Typography variant="caption" align="center" className={`${classes.featureTitle} txt-white`}>
              GPS Tracks
            </Typography>
          </Grid> 
        ): '' }
        { pictures ? (
          <Grid item className={`${classes.featureItem}`}>
            <Icon className={`${classes.featureIcons}`}>camera_alt</Icon>
            <Typography variant="caption" align="center" className={`${classes.featureTitle} txt-white`}>
              Photo Album
            </Typography>
          </Grid> 
        ): '' }
        { blogNotes ? (
          <Grid item className={`${classes.featureItem}`}>
            <Icon className={`${classes.featureIcons}`}>
              directions
            </Icon>
            <Typography variant="caption" align="center" className={`${classes.featureTitle} txt-white`}>
              blogNotes
            </Typography>
          </Grid> 
        ): '' }
      </Grid>
    )
  }
  render() {
    const { classes, className } = this.props;
    const { carouselCounter } = this.state
    return (
      <Grid container className={classNames(className, `txt-white`)}>
        <Slider carouselId="featured-carousel" counter={carouselCounter}>
          {this.renderSlides()}
        </Slider>
        <Grid container justify="space-between" className={`${classes.carouselNav}`}>
          <Grid item onClick={this.handlePrevSlide}><Icon className={classes.carouselNavArrowsIcons}>keyboard_arrow_left</Icon></Grid>
          <Grid item onClick={this.handleNextSlide}><Icon className={classes.carouselNavArrowsIcons}>keyboard_arrow_right</Icon></Grid>        
        </Grid>
      </Grid>
    );
  }
}

Carousel.propTypes = {
  classes: PropTypes.shape({

  }).isRequired,
  className: PropTypes.string.isRequired,
}

export default withStyles(styles)(Carousel);