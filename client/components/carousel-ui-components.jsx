import React from 'react';

function NextArrow(props) {
  return (
    <a href="#" className="slide-next-arrow"
      onClick={props.goToNextSlide}>
      <i className="fa fa-angle-right fa-3x text-secondary" aria-hidden="true"></i>
    </a>
  );
}

function BackArrow(props) {
  return (
    <a href="#" className="slide-back-arrow"
      onClick={props.goToPrevSlide}>
      <i className="fa fa-angle-left fa-3x text-secondary" aria-hidden="true"></i>
    </a>
  );
}

function Indicator(props) {
  return (
    <div className={
      props.index === props.activeIndex
        ? 'focused'
        : 'unfocused'
    }
    key={props.index}>
      <a className="fa fa-circle mx-1" onClick={props.onClick}></a>
    </div>
  );
}

function Slide(props) {
  return (
    <div className={
      props.index === props.activeIndex
        ? 'slide d-flex justify-content-center align-items-center col-12'
        : 'd-none'
    }
    key={props.index}>
      <img src={props.slide.image} alt={props.slide.imageCaption} />
      <h1 className="image-caption font-weight-bold">{props.slide.imageCaption}</h1>
    </div>
  );
}

export { NextArrow, BackArrow, Slide, Indicator };
