import React from 'react'
import PropTypes from 'prop-types';
import { Col, Row } from 'react-materialize'
import Icon from '@material-ui/core/Icon';
import Slider from '../../_utils/StupidSlider'
import './styles.scss'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.slides = [
      {
        imgUrl: `https://i.redd.it/rdw6qlp5w1111.jpg`,
        locName: `Ansel Adams Wilderness`,
        subText: `Eu veniam anim laboris aliqua ipsum nostrud laboris consectetur voluptate esse labore anim proident.`,
        linkUrl: ``,
        locCoords: {
          lat: `21&deg; 58' 37.72" N`,
          lon: `81&deg; 13' 28.53" W`
        },
        features: {
          gpsTrax: true,
          pictures: true,
          blogNotes: true
        }
      },
      {
        imgUrl: `https://i.redd.it/m1x5kml1k3211.jpg`,
        locName: `Sample Header Text`,
        subText: `Duis occaecat sint laboris et consequat aliquip veniam reprehenderit consequat Lorem qui ea qui.`,
        linkUrl: ``,
        locCoords: {
          lat: `21&deg; 58' 37.72" N`,
          lon: `81&deg; 13' 28.53" W`
        },
        features: {
        }
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
              <Row>
                <Col s={10} m={8} push={'s1 m2'} className="slideInfo">
                  <h2 className="locationName">{e.locName}</h2>
                  <p className="coords">{e.locCoords.lat} | {e.locCoords.lon}</p>
                  <p className="subText">{e.subText}</p>
                </Col>
              </Row>
              <Row>
                {this.renderSlideFeatures(e.features)}
              </Row>
            </div>
          </div>
        </div>
      )
    )
  }
  renderSlideFeatures({gpsTrax = false, pictures = false, blogNotes = false}){
    return (
      <Col s={10} m={6} push={'s1 m3'} className="slideFeatures">
        { gpsTrax ? <div className="feature"><Icon>directions</Icon><p>GPS Tracks</p></div> : '' }
        { pictures ? <div className="feature"><Icon>camera_alt</Icon><p>Photo Album</p></div> : '' }
        { blogNotes ? <div className="feature"><Icon>directions</Icon><p>blogNotes</p></div> : '' }
      </Col>
    )
  }
  render() {
    return (
      <Col s={12} id="HomeContainer">
        <Slider carouselId="featured-carousel" ref={(instance)=>{this.featureCarousel = instance}}>
          {this.renderSlides()}
        </Slider>
        <a onClick={()=>{this.featureCarousel.prevSlide()}}>prev</a>
        <a onClick={()=>{this.featureCarousel.nextSlide()}}>next</a>        
      </Col>
    );
  }
}

Home.propTypes = {
  slides: PropTypes.array
}

export default Home
  