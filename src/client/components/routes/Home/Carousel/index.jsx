import React from 'react'
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid'
import Icon from '@material-ui/core/Icon';
import Slider from 'Utils/StupidSlider'
import ParseCoords from 'Utils/ParseCoords'
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import DummyData from 'Utils/DummyData'
import './styles.scss'

const styles = theme => ({
  locationHeader:{
    textShadow: `1px 1px 2px #000000`,
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
    return (
      this.slides.map( (e,i) =>
        <Grid key={`slide-${i}`} className='slide'>
          {console.log(e)}
          <Grid className="slideBgContainer" style={{backgroundImage : `url(${e.imgUrl})`}}></Grid>
          <Grid className="slideContent">
            <Grid className="wrapper slideContentWrapper">
              <Grid item className="pushDown"></Grid>
              <Grid className="slideText">
                <Grid container justify="center">
                  <Grid item sm={10} className="slideInfo">
                    <Typography component="h2" variant="h2" className={`${this.props.classes.locationHeader} txt-white`}>{e.locName}</Typography>
                    <ParseCoords coords={e.locCoords} styles={{color: `#fff`}}/>
                    <Typography variant="h6" className={`txt-white`}>{e.subText}</Typography>
                  </Grid>
                </Grid>
                <Grid container justify="center">
                  { this.renderSlideFeatures(e.features) }
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )
    )
  }
  renderSlideFeatures({gpsTrax = false, pictures = false, blogNotes = false}){
    return (
      <Grid item className="slideFeatures">
        { gpsTrax ? <Grid item className="feature"><Icon>directions</Icon><Typography variant="caption" className={`${this.props.classes.featureTitle} txt-white`}>GPS Tracks</Typography></Grid> : '' }
        { pictures ? <Grid item className="feature"><Icon>camera_alt</Icon><Typography variant="caption" className={`${this.props.classes.featureTitle} txt-white`}>Photo Album</Typography></Grid> : '' }
        { blogNotes ? <Grid item className="feature"><Icon>directions</Icon><Typography variant="caption" className={`${this.props.classes.featureTitle} txt-white`}>blogNotes</Typography></Grid> : '' }
      </Grid>
    )
  }
  render() {
    return (
      <Grid container id="carouselContainer" className={`txt-white`}>
        <Slider carouselId="featured-carousel" ref={(instance)=>{this.featureCarousel = instance}}>
          {this.renderSlides()}
        </Slider>
        <Grid container justify="space-between" className={`carouselNav ${this.props.classes.carouselNav}`} >
          <Grid item onClick={() => { this.featureCarousel.prevSlide() }}><Icon className={this.props.classes.carouselNavArrowsIcons}>keyboard_arrow_left</Icon></Grid>
          <Grid item onClick={() => { this.featureCarousel.nextSlide() }}><Icon className={this.props.classes.carouselNavArrowsIcons}>keyboard_arrow_right</Icon></Grid>        
        </Grid>
      </Grid>
    );
  }
}
Carousel.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Carousel);