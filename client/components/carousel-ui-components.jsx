import React from 'react';

function BackArrow(props) {
  return (
    <a href="#" className="slide-back-arrow arrow"
      onClick={props.goToPrevSlide}>
      <i className="fa fa-angle-left fa-3x text-white" aria-hidden="true"></i>
    </a>
  );
}

function NextArrow(props) {
  return (
    <a href="#" className="slide-next-arrow arrow"
      onClick={props.goToNextSlide}>
      <i className="fa fa-angle-right fa-3x text-white" aria-hidden="true"></i>
    </a>
  );
}

function Indicator(props) {
  return (
    <div className={
      props.index === props.activeIndex
        ? 'indicator focused text-white'
        : 'indicator unfocused text-white'
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
        ? 'slide d-flex justify-content-center align-items-center'
        : 'd-none'
    }
    key={props.index}>
      <img src={props.slide.image} alt={props.slide.imageCaption} />
      <h1 className="image-caption font-weight-bold text-white position-absolute">{props.slide.imageCaption}</h1>
      <p className="image-text text-black mt-5 position-absolute">{props.slide.imageText}</p>
    </div>
  );
}

export { NextArrow, BackArrow, Slide, Indicator };
