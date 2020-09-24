import React from 'react';

export default function Header(props) {
  const cartItemCount = props.cartItemCount;
  return (
    <header className="header-container bg-white col-12 fixed-top">
      <div className="col-10 offset-1 d-flex justify-content-between align-content-center">
        <div className="col-6 pl-5 d-flex justify-content-start">
          <img className="header-logo" src="..\images\grove-of-gardens-logo.jpg" alt="The Gardens of Grove Logo" onClick={() => props.setView('catalog', {})}/>
        </div>
        <div className="col-6 d-flex flex-column align-items-end justify-content-center">
          <div className="row">
            <div className="input-group">
              <input type="text" onChange={() => props.handleSearchQueryChange(event)} onKeyDown={() => props.onEnter(event)} className="form-control ml-2 input rounded-left"
                placeholder="Search"></input>
              <button onClick={() => props.searchProducts()} className="btn btn-primary rounded-right mr-2 input">
                <i className="fa fa-search"></i>
              </button>
              <h4 id="shopping-cart" onClick={() => props.setView('cart', {})} className="text-light align-content-center m-0 text-dark"><i className="fa fa-shopping-cart text-dark mr-2 mb-0 fa-sm" aria-hidden="true"></i>{cartItemCount}</h4>
            </div>
          </div>
          <div className="row align-content-center">
            <h5 className="text-light align-content-center m-0 text-dark">Hello</h5>
          </div>
        </div>
      </div>
    </header>
  );
}
