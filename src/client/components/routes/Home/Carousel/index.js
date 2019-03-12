import React from 'react'
import Grid from '@material-ui/core/Grid'
import Icon from '@material-ui/core/Icon';
import Slider from 'Utils/StupidSlider'
import ParseCoords from 'Utils/ParseCoords'
import PropTypes from 'react-dom'
import Typography from '@material-ui/core/Typography';
import './styles.scss'
//import FormatMapCoords from '../../../_utils/MapCoords'

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.slides = [
      {
        imgUrl: `http://glennroman.com/trailstitch/images/DSC03858-HDR.jpg`,
        locName: `Ansel Adams Wilderness`,
        subText: `Eu veniam anim laboris aliqua ipsum nostrud laboris consectetur voluptate esse labore anim proident.`,
        linkUrl: ``,
        locCoords: {
          lat: `21|58|37.72|N`,
          lon: `81|13|28.53|W`
        },
        features: {
          gpsTrax: true,
          pictures: true,
          blogNotes: true
        }
      },
      {
        imgUrl: `http://glennroman.com/trailstitch/images/DSC02492.jpg`,
        locName: `Ruby Lake`,
        subText: `Duis occaecat sint laboris et consequat aliquip veniam reprehenderit consequat Lorem qui ea qui.`,
        linkUrl: ``,
        locCoords: {
          lat: ``,
          lon: ``
        },
        features: {}
      },
      {
        imgUrl: `http://glennroman.com/trailstitch/images/DSC02425.jpg`,
        locName: `Yosemite National Park`,
        subText: `Duis occaecat sint laboris et consequat aliquip veniam reprehenderit consequat Lorem qui ea qui.`,
        linkUrl: ``,
        locCoords: {
          lat: `21|58|37.72|N`,
          lon: `81|13|28.53|W`
        },
        features: {}
      }
    ]
    this.renderSlides = this.renderSlides.bind(this)
    this.renderSlideFeatures = this.renderSlideFeatures.bind(this)
  }
  renderSlides(){
    return (
      this.slides.map( (e,i) =>
        <div key={`slide-${i}`} className='slide'>
          <div className="slideBgContainer" style={{backgroundImage : `url(${e.imgUrl})`}}></div>
          <div className="slideContent">
            <div className="pushDown"></div>
            <div className="slideText container">
              <Grid>
                <Grid s={10} m={8} push={'s1 m2'} className="slideInfo">
                  <Typography component="h2" variant="h2" className="locationName">{e.locName}</Typography>
                  { ParseCoords(e.locCoords) }
                  <Typography variant="h5" className="subText">{e.subText}</Typography>
                </Grid>
              </Grid>
              <Grid>
                {this.renderSlideFeatures(e.features)}
              </Grid>
            </div>
          </div>
        </div>
      )
    )
  }
  renderSlideFeatures({gpsTrax = false, pictures = false, blogNotes = false}){
    return (
      <Grid s={10} m={6} push={'s1 m3'} className="slideFeatures">
        { gpsTrax ? <div className="feature"><Icon>directions</Icon><p>GPS Tracks</p></div> : '' }
        { pictures ? <div className="feature"><Icon>camera_alt</Icon><p>Photo Album</p></div> : '' }
        { blogNotes ? <div className="feature"><Icon>directions</Icon><p>blogNotes</p></div> : '' }
      </Grid>
    )
  }
  render() {
    return (
      <Grid s={12} id="carouselContainer">
        <Slider carouselId="featured-carousel" ref={(instance)=>{this.featureCarousel = instance}}>
          {this.renderSlides()}
        </Slider>
        <div className="carouselNav">
          <a className="carouselLeftArrow" onClick={()=>{this.featureCarousel.prevSlide()}}><Icon>keyboard_arrow_left</Icon></a>
          <a className="carouselRightArrow" onClick={()=>{this.featureCarousel.nextSlide()}}><Icon>keyboard_arrow_right</Icon></a>        
        </div>
      </Grid>
    );
  }
}

Carousel.propTypes = {
  slides: PropTypes.array
}


export default Carousel