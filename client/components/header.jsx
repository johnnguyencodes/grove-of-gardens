import React from 'react';

export default function Header(props) {
  const cartItemCount = props.cartItemCount;
  return (
    <header className="header-container bg-white fixed-top">
      <div className="header-container-md-up d-none d-sm-none d-md-flex d-lg-flex d-xl-flex col-xl-10 offset-xl-1 col-lg-12 col-md-12 justify-content-between align-content-center">
        <div className="col-xl-6 col-lg-6 col-md-4 col-sm-4 col-xs-12 d-flex justify-content-start mt-3 p-0">
          <img className="header-logo" src="..\images\grove-of-gardens-logo.jpg" alt="The Gardens of Grove Logo" onClick={() => props.setView('catalog', {})} />
        </div>
        <div className="col-xl-6 col-lg-6 col-md-8 col-sm-8 col-xs-12 d-flex flex-column align-items-end p-0">
          <div className="row m-0 p-0 col-xs-12">
            <div className="input-group search mt-3">
              <input type="text" id="search_input" onChange={() => props.handleSearchQueryChange(event)} onKeyDown={() => props.onEnter(event)} className="form-control ml-2 rounded-left search input"
                placeholder="Search"></input>
              <button onClick={() => props.setView('search', {})} className="btn btn-primary rounded-right mr-2 search input p-2 d-flex justify-content-center align-items-center">
                <i className="fa fa-search fa-xs p-0"></i>
              </button>
              <h4 id="shopping-cart" onClick={() => props.setView('cart', {})} className="text-light align-content-center m-0 text-dark"><i className="fa fa-shopping-cart text-dark mr-2 mb-0 fa-sm" aria-hidden="true"></i>{cartItemCount}</h4>
            </div>
          </div>
          <div className="category-container col-xs-12 row d-flex justify-content-around col-10 offset-1 px-0 mt-3">
            <a href="#" className="category" onClick={() => props.setView('catalog', {})}>Shop All</a>
            <a href="#" className="category" onClick={() => props.setView('category', { category: 'Cactus' })}>Cactus</a>
            <a href="#" className="category" onClick={() => props.setView('category', { category: 'Crassula' })}>Crassula</a>
            <a href="#" className="category" onClick={() => props.setView('category', { category: 'Echeveria' })}>Echeveria</a>
            <a href="#" className="category" onClick={() => props.setView('category', { category: 'Haworthia' })}>Haworthia</a>
          </div>
        </div>
      </div>
      {/* visible only on sm and down */}
      <div className="header-container-xs-sm d-flex col-12 d-sm-flex col-sm-12 d-md-none d-lg-none d-xl-none p-0 m-0 flex-column">
        <div className="row m-0 p-0 col-xs-12 d-flex align-items-center my-2">
          <div className="col-3 d-flex justify-content-center align-items-center p-0 header-small-first-row">
            <img className="header-logo-xs" src="..\images\grove-of-gardens-logo-xs.jpg" alt="The Gardens of Grove Logo" onClick={() => props.setView('catalog', {})} />
          </div>
          <div className="input-group col-9 input-group-small search d-flex justify-content-end">
            <input type="text" id="search_input" onChange={() => props.handleSearchQueryChange(event)} onKeyDown={() => props.onEnter(event)} className="form-control ml-2 rounded-left search input search-input-xs"
              placeholder="Search"></input>
            <button onClick={() => props.setView('search', {})} className="btn btn-primary rounded-right mr-2 search input p-2 d-flex justify-content-center align-items-center">
              <i className="fa fa-search fa-xs p-0"></i>
            </button>
            <h4 id="shopping-cart" onClick={() => props.setView('cart', {})} className="text-light align-content-center m-0 text-dark"><i className="fa fa-shopping-cart text-dark mr-2 mb-0 fa-sm" aria-hidden="true"></i>{cartItemCount}</h4>
          </div>
        </div>
        <div className="category-container col-12 row d-flex justify-content-between mx-0">
          <a href="#" className="category" onClick={() => props.setView('catalog', {})}>Shop All</a>
          <a href="#" className="category" onClick={() => props.setView('category', { category: 'Cactus' })}>Cactus</a>
          <a href="#" className="category" onClick={() => props.setView('category', { category: 'Crassula' })}>Crassula</a>
          <a href="#" className="category" onClick={() => props.setView('category', { category: 'Echeveria' })}>Echeveria</a>
          <a href="#" className="category" onClick={() => props.setView('category', { category: 'Haworthia' })}>Haworthia</a>
        </div>
      </div>
      {/* </div> */}
    </header>
  );
}
