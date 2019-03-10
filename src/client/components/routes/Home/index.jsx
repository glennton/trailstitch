import React from 'react'
import PropTypes from 'prop-types';
import { Col } from 'react-materialize'
import Slider from '../../common/StupidSlider'
import './styles.scss'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slides: []
    };
    this.slides = [
      {
        imgUrl: `http://www.fillmurray.com/1500/800`,
        headerText: `Sample Header Text`,
        subText: `Same Sub Text`,
        linkUrl: ``,
      },
      {
        imgUrl: `http://www.fillmurray.com/1500/800`,
        headerText: `Sample Header Text`,
        subText: `Same Sub Text`,
        linkUrl: ``,
      }
    ]
  }

  render() {
    return (
      <Col s={12} id="HomeContainer">
        <Slider carouselId="featured-carousel" ref={(instance)=>{this.featureCarousel = instance}}>
          {
            this.slides.map( (e,i) =>
              <div key={`slide-${i}`} className='slide' style={{backgroundImage : `url(${e.imgUrl})`}}>
                {e.imgUrl}
              </div>
            )
          }
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
  