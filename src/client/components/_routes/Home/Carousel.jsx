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

//Development Data
import DummyData from 'Utils/DummyData'

//Utils

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
    this.slides = DummyData(['slides']).slides
    this.renderSlides = this.renderSlides.bind(this)
    this.renderSlideFeatures = this.renderSlideFeatures.bind(this)
  }
  renderSlides(){
    const { classes } = this.props;
    return (
      this.slides.map( (e,i) =>
        <Grid container key={`slide-${i}`} className={`${classes.carouselSlide}`}>
          <Grid container className={`${classes.carouselBgContent}`} style={{backgroundImage : `url(${e.imgUrl})`}}></Grid>
          <Grid container className={`${classes.slideContent}`}>
            <Grid container className="wrapper" direction="row">
              <Grid container className={`${classes.slideTextContent}`}>
                <Grid container justify="center" className={`${classes.slideExrasContainer}`}>
                  {this.renderSlideFeatures(e.features)}
                </Grid>
                <Grid container justify="center" className={`${classes.slideHeader}`}>
                  <Grid item sm={10}>
                    <Typography component="h2" variant="h2" align="center" className={classNames(classes.locationHeader, 'txt-white')}>{e.locName}</Typography>
                    <ParseCoords coords={e.locCoords} styles={{ color: `#fff` }} className={`${classes.coordContainer}`} />
                    <Typography variant="h6" className={`txt-white`} align="center">{e.subText}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )
    )
  }
  renderSlideFeatures({gpsTrax = false, pictures = false, blogNotes = false}){
    const { classes } = this.props;
    return (
      <Grid container className={`${classes.slideFeatures}`} justify="center" direction="row">
        { gpsTrax ? <Grid item className={`${classes.featureItem}`}><Icon className={`${classes.featureIcons}`}>directions</Icon><Typography variant="caption" align="center" className={`${classes.featureTitle} txt-white`}>GPS Tracks</Typography></Grid> : '' }
        { pictures ? <Grid item className={`${classes.featureItem}`}><Icon className={`${classes.featureIcons}`}>camera_alt</Icon><Typography variant="caption" align="center" className={`${classes.featureTitle} txt-white`}>Photo Album</Typography></Grid> : '' }
        { blogNotes ? <Grid item className={`${classes.featureItem}`}><Icon className={`${classes.featureIcons}`}>directions</Icon><Typography variant="caption" align="center" className={`${classes.featureTitle} txt-white`}>blogNotes</Typography></Grid> : '' }
      </Grid>
    )
  }
  render() {
    const { classes } = this.props;
    console.log(this.props)
    return (
      <Grid container className={classNames(this.props.className, `txt-white`)}>
        <Slider carouselId="featured-carousel" ref={(instance)=>{this.featureCarousel = instance}}>
          {this.renderSlides()}
        </Slider>
        <Grid container justify="space-between" className={`${classes.carouselNav}`} >
          <Grid item onClick={() => { this.featureCarousel.prevSlide() }}><Icon className={classes.carouselNavArrowsIcons}>keyboard_arrow_left</Icon></Grid>
          <Grid item onClick={() => { this.featureCarousel.nextSlide() }}><Icon className={classes.carouselNavArrowsIcons}>keyboard_arrow_right</Icon></Grid>        
        </Grid>
      </Grid>
    );
  }
}

Carousel.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
}

export default withStyles(styles)(Carousel);