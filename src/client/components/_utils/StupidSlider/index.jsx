import React from 'react'
import PropTypes from 'prop-types';
import Measure from 'react-measure';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  stupidCarouselContainer: {
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  stupidCarouselSlider: {
    position: 'relative',
  },
  stupidCarouselList: {
    boxSizing: 'border-box',
    display: 'flex',
    flexFlow: 'row',
    flexGrow: 1,
    padding: 0,
    margin: 0,
  },
  stupidCarouselSlide: {
    boxSizing: 'border-box',
    flexShrink: 0,
    display: 'flex',
    listStyleType: 'none',
  },
}

class Slider extends React.Component {
  constructor(props) {
    super(props);
    const { children, startSlide, counter } = this.props

    this.state = {
      activeSlide: startSlide,
      slideWidth: 0,
      stageLeft: 0,
      animateLeft: 0,
      transitionData: {},
      directionCounter: counter
    };

    //Vars
    this.slideElements = [];
    this.reactItems = children;
    this.itemCount = this.reactItems.length || 0;
    this.isAnimating = false;
    //Bindings
    this.resetStagePosition = this.resetStagePosition.bind(this);
    this.goToSlide = this.goToSlide.bind(this);
    this.nextSlide = this.nextSlide.bind(this);
    this.prevSlide = this.prevSlide.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { counter } = this.props
    const { directionCounter } = this.state
    if (counter != prevProps.counter) {
      if (directionCounter > counter) {
        this.prevSlide()
      }
      if (directionCounter < counter) {
        this.nextSlide()
      }
      this.setState({
        directionCounter: counter
      })
    }
  }

  getItemElement = (item, index, key) => {
    const { slidePadding, classes } = this.props
    const { activeSlide, slideWidth } = this.state
    const itemKey = key ? key : `slide-${index}`
    return (
      <li
        data-slide-index={index}
        className={`${classes.stupidCarouselSlide} ${activeSlide === index ? 'active' : ''}`}
        key={itemKey}
        id={itemKey}
        style={{
          width: slideWidth,
          order: this.reorderOneSlide(index),
          padding: `0 ${slidePadding}px 0`
        }}
        ref={(slide) => { this.slideElements[index] = slide }}
      >
        {item}
      </li>
    )
  };
  setDimensions(contentRect) {
    const { slidePadding } = this.props
    this.setState({ slideWidth: contentRect.bounds.width + (2 * slidePadding) }, () => { this.setState({ animateLeft: - slidePadding }) })
  }

  reorderOneSlide(index) {
    const { activeSlide } = this.state
    let order = index - activeSlide;
    if (order < 0) order = this.itemCount + order;
    return order
  }


  resetStagePosition() {
    const { transitionData } = this.state
    const { slidePadding } = this.props
    const { targetIndex } = transitionData
    this.isAnimating = false;
    this.setState({ animateLeft: - slidePadding, stageLeft: 0, activeSlide: targetIndex, transitionData: { direction: 1 } }, () => {
      this.newReorderAllSlides();
    })
  }

  _moveStage() {
    const { slideWidth, transitionData } = this.state;
    const { slidePadding } = this.props
    this.isAnimating = true;
    this.sliderElement.addEventListener('transitionend', this.resetStagePosition);
    if (transitionData.direction) {
      //Next
      this.setState({ animateLeft: -(slideWidth * transitionData.distance + (2 * slidePadding * transitionData.distance - slidePadding)) });
    } else {
      //Prev
      this.setState({ animateLeft: slideWidth * transitionData.distance - slidePadding });
    }
  }
  animateStagePosition() {
    const { slideWidth, transitionData } = this.state;
    this.isAnimating = false;
    //Prep Stage
    if (transitionData.direction) {
      this.setState({ stageLeft: 0 }, () => {
        this._moveStage()
      });
    } else {
      this.setState({ stageLeft: -(slideWidth * (this.itemCount - 1)) }, () => {
        this._moveStage()
      });
    }
  }

  newReorderAllSlides() {
    const { activeSlide, transitionData } = this.state;
    let count = this.itemCount - 1;
    if (transitionData.direction) {
      for (let i = 0; i <= count; i++) {
        let j = i - activeSlide;
        if (j < 0) j = i + count - activeSlide + 1
        this.slideElements[i].style.order = j;
      }
    } else {
      //Prev
      for (let i = 0; i <= count; i++) {
        let j = i + (count - activeSlide);
        if (j > count) j = i - activeSlide - 1;
        this.slideElements[i].style.order = j;
      }
    }
  }

  initTransitionData(targetIndex) {
    const { activeSlide } = this.state;
    //Determine shortest route to slide
    let transitionData = {}
    const stepsForward = (activeSlide < targetIndex) ? (targetIndex - activeSlide) : (this.itemCount - activeSlide + targetIndex);
    const stepsBackward = (activeSlide > targetIndex) ? (activeSlide - targetIndex) : (activeSlide + this.itemCount - targetIndex);
    //If forward is shortest route, set direction to 1, else 0 for prev.
    //Also declare the distance the slider needs to travel.
    stepsForward <= stepsBackward ? transitionData = { direction: 1, distance: stepsForward, targetIndex: targetIndex } : transitionData = { direction: 0, distance: stepsBackward, targetIndex: targetIndex }
    return transitionData;
  }

  goToSlide(targetIndex = 0) {
    const { activeSlide } = this.state
    //Only execute if target slide is different from current slide
    if (targetIndex != activeSlide) {
      this.setState({ transitionData: this.initTransitionData(targetIndex) }, () => {
        this.newReorderAllSlides();
        this.animateStagePosition()
      })
    }
  }

  nextSlide() {
    const { activeSlide } = this.state
    let target = activeSlide + 1;
    if (target >= this.itemCount) target = this.itemCount - target;
    this.goToSlide(target);
  }

  prevSlide() {
    const { activeSlide } = this.state
    let target = activeSlide - 1;
    if (target < 0) target = this.itemCount - target - 2;
    this.goToSlide(target);
  }

  render() {
    //Declarations
    const { slideWidth, stageLeft, animateLeft } = this.state;
    const { carouselId, carouselSpeed, carouselEasing, classes } = this.props
    const sliderStyle = {
      width: slideWidth * this.itemCount,
      left: stageLeft,
      marginLeft: `${animateLeft}px`,
      transition: this.isAnimating ? `margin-left ${carouselSpeed}ms ${carouselEasing}` : '0ms',
    }
    return (
      <div id={`${carouselId}-container`} className={classes.stupidCarouselContainer}>
        {this.itemCount ? (
          <Measure bounds onResize={(contentRect) => { this.setDimensions(contentRect) }}>
            {({ measureRef }) => (
              <div ref={measureRef}>
                <div id={`${carouselId}-slider`} className={classes.stupidCarouselSlider} style={sliderStyle} ref={(slider) => { this.sliderElement = slider }}>
                  <ul id={`${carouselId}-list`} className={classes.stupidCarouselList}>
                    {this.reactItems.map((item, index) => {
                      return this.getItemElement(item, index, item.props['data-slideid']);
                    })}
                  </ul>
                </div>
              </div>
            )}
          </Measure>
        ) : ''}
      </div>
    )
  }
}

Slider.propTypes = {
  startSlide: PropTypes.number,
  carouselId: PropTypes.string,
  carouselSpeed: PropTypes.number,
  slidePadding: PropTypes.number,
  carouselEasing: PropTypes.string,
  counter: PropTypes.number,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  classes: PropTypes.shape({

  }).isRequired
}

Slider.defaultProps = {
  carouselId: '',
  carouselSpeed: 500,
  slidePadding: 0,
  carouselEasing: 'linear',
  startSlide: 0,
  counter: 0
}

export default withStyles(styles)(Slider);
