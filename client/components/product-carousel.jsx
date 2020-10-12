import React from 'react';
import { NextArrow, BackArrow, Slide, Indicator } from './product-carousel-ui-components';

export default class ProductCarousel extends React.Component {
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
  }

  getSlides() {
    fetch(`api/images/${this.props.productId}`)
      .then(response => response.json())
      .then(slidesData => {
        this.setState({
          slides: slidesData
        });
      })
      .catch(err => console.error('getProductImages() fetch failed:', err));
  }

  goToNextSlide() {
    event.preventDefault();
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
    event.preventDefault();
    let index = this.state.activeIndex;
    const length = this.state.slides.length;
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
  }

  componentDidMount() {
    this.getSlides();
  }

  render() {
    if (this.state.slides === null) {
      return null;
    }
    return (
      <>
        <div className="product-carousel-container d-flex align-items-center col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 p-0">
          <div className="back-arrow-container col-xl-1 col-lg-1 col-md-1 col-sm-1 d-flex justify-content-end align-items-center">
            <BackArrow
              goToPrevSlide={() => this.goToPrevSlide()} />
          </div>
          <div className="product-slide-container col-xl-10 col-lg-10 col-md-10 col-sm-10 col-10 d-flex justify-content-center">
            {this.state.slides.map((slide, index) =>
              <Slide
                key={index}
                index={index}
                activeIndex={this.state.activeIndex}
                slide={slide}
              />
            )}
          </div>
          <div className="next-arrow-container col-xl-1 col-lg-1 col-md-1 col-sm-1 col-1 d-flex justify-content-start align-items-center">
            <NextArrow
              goToNextSlide={() => this.goToNextSlide()} />
          </div>
        </div>
        <div className="product-indicator-container class col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-4 d-flex justify-content-center align-items-center">
          {this.state.slides.map((slide, index) =>
            <Indicator
              key={index}
              index={index}
              activeIndex={this.state.activeIndex}
              slide={slide}
              onClick={event => this.goToSlide(index)}
            />
          )}
        </div>
      </>
    );
  }
}
