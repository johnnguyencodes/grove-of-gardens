import React from 'react';

function BackArrow(props) {
  return (
    <a href="#" className="slide-back-arrow arrow"
      onClick={props.goToPrevSlide}>
      <i className="fa fa-angle-left fa-2x text-white" aria-hidden="true"></i>
    </a>
  );
}

function NextArrow(props) {
  return (
    <a href="#" className="slide-next-arrow arrow"
      onClick={props.goToNextSlide}>
      <i className="fa fa-angle-right fa-2x text-white" aria-hidden="true"></i>
    </a>
  );
}

function Indicator(props) {
  return (
    <div className={
      props.index === props.activeIndex
        ? 'homepage-indicator focused text-white'
        : 'homepage-indicator unfocused text-white'
    }
    key={props.index}>
      <a className="fa fa-minus fa-2x mr-1" onClick={props.onClick}></a>
    </div>
  );
}

function Slide(props) {
  return (
    <div className={
      props.index === props.activeIndex
        ? 'slide d-flex justify-content-center align-items-center center-caption'
        : 'd-none'
    }
    key={props.index}>
      <img src={props.slide.image} alt={props.slide.imageCaption} />
      <div className="position-absolute mx-3">
        <h1 className="catalog-carousel-caption font-weight-bold text-center mb-3">{props.slide.imageCaption}</h1>
        <h5 className="catalog-carousel-text text-center font-weight-bold">{props.slide.imageText}</h5>
      </div>
    </div>
  );
}

export { NextArrow, BackArrow, Slide, Indicator };
