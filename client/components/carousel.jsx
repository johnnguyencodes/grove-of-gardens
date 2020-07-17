import React from 'react';
import { NextArrow, BackArrow, Slide, Indicator } from './carousel-ui-components';

export default class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slides: [],
      activeIndex: 0
    };
    this.goToPrevSlide = this.goToPrevSlide.bind(this);
    this.goToNextSlide = this.goToNextSlide.bind(this);
    this.goToSlide = this.goToSlide.bind(this);
    this.getSlides = this.getSlides.bind(this);
    this.setTimer = this.setTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
  }

  getSlides() {
    fetch('/api/carousel')
      .then(response => response.json())
      .then(slidesData => {
        this.setState(state => ({
          slides: slidesData
        }));
      })
      .catch(err => console.error('getSlides() fetch failed:', err));
  }

  goToNextSlide() {
    let index = this.state.activeIndex;
    const length = this.state.slides.length;
    if (index === length - 1) {
      index = 0;
    } else {
      index++;
    }
    this.setState({
      activeIndex: index
    });
  }

  goToPrevSlide() {
    let index = this.state.activeIndex;
    const length = this.state.flashcards.length;
    if (index < 1) {
      index = length - 1;
    } else {
      index--;
    }
    this.setState({
      activeIndex: index
    });
  }

  goToSlide(index) {
    this.setState({
      activeIndex: index
    });
    this.resetTimer();
    this.setTimer();
  }

  setTimer() {
    this.intervalId = setInterval(this.goToNextSlide, 5000);
  }

  resetTimer() {
    clearInterval(this.intervalId);
  }

  componentDidMount() {
    this.getSlides();
    this.setTimer();
  }

  render() {
    if (this.state.slides === null) {
      return null;
    }
    return (
      <>
        <div className="carousel-container col-12 d-flex align-items-center justify-content-center">
          <BackArrow
            goToPrevSlide={() => this.goToPrevSlide()} />
          <div className="slide-container d-flex flex-row justify-content-center col-10">
            {this.state.slides.map((slide, index) =>
              <Slide
                key={index}
                index={index}
                activeIndex={this.state.activeIndex}
                slide={slide}
              />
            )}
            {this.state.slides.map((slide, index) =>
              <Indicator
                key={index}
                index={index}
                activeIndex={this.state.activeIndex}
                slide={slide}
                onClick={event => this.goToNextSlide(index)}
              />
            )}
          </div>
          <NextArrow
            goToNextSlide={() => this.goToNextSlide()} />
        </div>
      </>
    );
  }
}
