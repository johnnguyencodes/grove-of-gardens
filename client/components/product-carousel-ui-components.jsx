import React from 'react';

function BackArrow(props) {
  return (
    <a href="#" className="slide-back-arrow arrow"
      onClick={props.goToPrevSlide}>
      <i className="fa fa-angle-left fa-3x text-secondary" aria-hidden="true"></i>
    </a>
  );
}

function NextArrow(props) {
  return (
    <a href="#" className="slide-next-arrow arrow"
      onClick={props.goToNextSlide}>
      <i className="fa fa-angle-right fa-3x text-secondary" aria-hidden="true"></i>
    </a>
  );
}

function Indicator(props) {
  return (
    <div className={
      props.index === props.activeIndex
        ? 'indicator unfocused d-flex align-items-center justify-content-center align-items-center'
        : 'indicator focused d-flex align-items-center'
    }
    key={props.index}>
      <a className="mx-2 d-flex align-items-center justify-content-center" onClick={props.onClick}>
        <img src={props.slide.imageURL} className="product-image-indicator" alt="Indicator" />
        <span className={
          props.index === props.activeIndex
            ? 'badge badge-secondary d-flex align-items-center justify-content-center'
            : 'd-none'
        }>Viewed</span>
      </a>
    </div>
  );
}

function Slide(props) {
  return (
    <div className={
      props.index === props.activeIndex
        ? 'product-slide d-flex justify-content-center align-items-center'
        : 'd-none'
    }
    key={props.index}>
      <img src={props.slide.imageURL} alt="Product Image" />
    </div>
  );
}

export { NextArrow, BackArrow, Slide, Indicator };
