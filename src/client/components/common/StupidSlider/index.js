import React from 'react'
import PropTypes from 'prop-types';
import Measure from 'react-measure';
import './styles.scss'

class Slider extends React.Component{

  constructor(props){
    super(props);
    //States
    this.state = {
      activeSlide: this.props.startSlide || 0,
      slideWidth: 0,
      stageLeft: 0,
      animateLeft: 0,
      transitionData: {}
    };
    //Options
    this.id = this.props.carouselId || '';
    this.speed = this.props.carouselSpeed || 500;
    this.padding = this.props.slidePadding || 0;
    this.easing = this.props.carouselEasing || 'linear';
    //Vars
    this.slideElements = [];
    this.reactItems = this.props.children || [];
    this.itemCount = this.reactItems.length || 0;
    this.isAnimating = false;
    //Bindings
    this.resetStagePosition = this.resetStagePosition.bind(this);
    this.goToSlide = this.goToSlide.bind(this);
    this.nextSlide = this.nextSlide.bind(this);
    this.prevSlide = this.prevSlide.bind(this);
  }

  getItemElement = (item, index, key) => {
    if(key == undefined) key = `slide-${index}`
    const obj =
     <li
        data-slide-index={index}
        className={`stupid-carousel-slide ${this.state.activeSlide === index ? 'active' : ''}`}
        key={key}
        id={key}
        style={{
          width: this.state.slideWidth,
          order: this.reorderOneSlide(index),
          padding: `0 ${this.padding}px 0`
        }}
        ref={(slide) => {this.slideElements[index] = slide}}
      >
        {item}
      </li>;
    return obj
  };

  reorderOneSlide(index){
    //1
    let order = index - this.state.activeSlide;
    if(order < 0) order = this.itemCount + order;
    return order
  }

  setDimensions(contentRect){
    this.setState({ slideWidth: contentRect.bounds.width + (2 * this.padding) },()=>{this.setState({animateLeft : -this.padding})})
  }

  resetStagePosition(){
    const { targetIndex } = this.state.transitionData
    this.isAnimating = false;
    this.setState({animateLeft: -this.padding, stageLeft: 0, activeSlide: targetIndex, transitionData: {direction: 1}}, ()=>{
      this.newReorderAllSlides();
    })
  }

  _moveStage(){
    const {slideWidth, transitionData} = this.state;
    this.isAnimating = true;
    this.sliderElement.addEventListener('transitionend', this.resetStagePosition);
    if(transitionData.direction){
      //Next
      this.setState({animateLeft: -(slideWidth * transitionData.distance + (2 * this.padding * transitionData.distance - this.padding) ) });
    }else{
      //Prev
      this.setState({animateLeft: slideWidth * transitionData.distance - this.padding });
    }
  }
  animateStagePosition(){
    const {slideWidth, transitionData} = this.state;
    this.isAnimating = false;
    //Prep Stage
    if(transitionData.direction){
      this.setState({stageLeft: 0 },()=>{
        this._moveStage()
      });
    }else{
      this.setState({stageLeft: -(slideWidth * (this.itemCount - 1)) },()=>{
        this._moveStage()
      });
    }
  }

  newReorderAllSlides(){
    const { activeSlide, transitionData } = this.state;
    let count = this.itemCount - 1;
    if(transitionData.direction){
      for(let i = 0; i <= count; i++){
        let j = i - activeSlide;
        if(j < 0) j = i + count - activeSlide + 1
        this.slideElements[i].style.order = j;
      }
    }else{
      //Prev
      for(let i = 0; i <= count; i++){
        let j = i + (count - activeSlide);
        if(j > count) j = i - activeSlide - 1;
        this.slideElements[i].style.order = j;
      }
    }
  }

  initTransitionData(targetIndex){
    const { activeSlide } = this.state;
    //Determine shortest route to slide
    let transitionData = {}
    const stepsForward = (activeSlide < targetIndex) ? (targetIndex - activeSlide) : (this.itemCount - activeSlide + targetIndex);
    const stepsBackward = (activeSlide > targetIndex)  ? (activeSlide - targetIndex) : (activeSlide + this.itemCount - targetIndex);
    //If forward is shortest route, set direction to 1, else 0 for prev.
    //Also declare the distance the slider needs to travel.
    stepsForward <= stepsBackward ? transitionData = {direction: 1, distance: stepsForward, targetIndex: targetIndex} : transitionData = {direction: 0, distance: stepsBackward, targetIndex: targetIndex}
    return transitionData;
  }

  goToSlide(targetIndex = 0){
    //Only execute if target slide is different from current slide
    if(targetIndex != this.state.activeSlide){
      this.setState({transitionData: this.initTransitionData(targetIndex)},()=>{
        this.newReorderAllSlides();
        this.animateStagePosition()
      })
    }
  }

  nextSlide(){
    let target = this.state.activeSlide + 1;
    if(target >= this.itemCount) target = this.itemCount - target;
    this.goToSlide(target);
  }

  prevSlide(){
    let target = this.state.activeSlide - 1;
    if(target < 0) target = this.itemCount - target - 2;
    this.goToSlide(target);
  }

  render(){
    //Declarations
    const { slideWidth, stageLeft, animateLeft} = this.state;
    const sliderStyle = {
      width: slideWidth * this.itemCount,
      left: stageLeft,
      marginLeft: `${animateLeft}px`,
      WebkitTransition: this.isAnimating ? `margin-left ${this.speed}ms ${this.easing}` : '0ms',
      MozTransition: this.isAnimating ? `margin-left ${this.speed}ms ${this.easing}` : '0ms',
      OTransition: this.isAnimating ? `margin-left ${this.speed}ms ${this.easing}` : '0ms',
      transition: this.isAnimating ? `margin-left ${this.speed}ms ${this.easing}` : '0ms',
    }
    let Slider

    if(this.itemCount){
      Slider = <Measure bounds onResize={(contentRect) => { this.setDimensions(contentRect) }}>
      {({ measureRef }) =>
        <div id={`${this.id}-container`} className={`stupid-carousel-container`} ref={measureRef}>
          <div id={`${this.id}-slider`} className={`stupid-carousel-slider`} style={sliderStyle} ref={(slider)=>{this.sliderElement = slider}}>
            <ul id={`${this.id}-list`} className={`stupid-carousel-list`}>
              {this.reactItems.map((item, index) => {
                return this.getItemElement(item, index, item.props['data-slideid']);
              })}
            </ul>
          </div>
        </div>
      }
    </Measure>
    }

    return(
      <div>
        {Slider}
      </div>
    )
  }
}

Slider.propTypes = {
  startSlide: PropTypes.string,
  carouselId: PropTypes.string,
  carouselSpeed: PropTypes.number,
  slidePadding: PropTypes.number,
  carouselEasing: PropTypes.string,
  children: PropTypes.array
}

export default Slider