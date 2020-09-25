import React from 'react';

export default function Header(props) {
  const cartItemCount = props.cartItemCount;
  return (
    <header className="header-container bg-white col-12 fixed-top">
      <div className="col-10 offset-1 d-flex justify-content-between align-content-center">
        <div className="col-6 pl-5 d-flex justify-content-start mt-3">
          <img className="header-logo" src="..\images\grove-of-gardens-logo.jpg" alt="The Gardens of Grove Logo" onClick={() => props.setView('catalog', {})}/>
        </div>
        <div className="col-6 d-flex flex-column align-items-end p-0">
          <div className="row m-0 p-0">
            <div className="input-group search mt-3">
              <input type="text" onChange={() => props.handleSearchQueryChange(event)} onKeyDown={() => props.onEnter(event)} className="form-control ml-2 rounded-left search input"
                placeholder="Search"></input>
              <button onClick={() => props.searchProducts()} className="btn btn-primary rounded-right mr-2 search input p-2 d-flex justify-content-center align-items-center">
                <i className="fa fa-search fa-xs p-0"></i>
              </button>
              <h4 id="shopping-cart" onClick={() => props.setView('cart', {})} className="text-light align-content-center m-0 text-dark"><i className="fa fa-shopping-cart text-dark mr-2 mb-0 fa-sm" aria-hidden="true"></i>{cartItemCount}</h4>
            </div>
          </div>
          <div className="category-container row d-flex justify-content-around col-10 offset-1 px-0 mt-3">
            <a href="#" className="category" onClick={() => props.getProducts()}>Shop All</a>
            <a href="#" className="category" onClick={() => props.getCategory('Action%20Adventure')}>Action Adventure</a>
            <a href="#" className="category" onClick={() => props.getCategory('Fighting')}>Fighting</a>
            <a href="#" className="category" onClick={() => props.getCategory('Platformer')}>Platformer</a>
            <a href="#" className="category" onClick={() => props.getCategory('Puzzle')}>Puzzle</a>
            <a href="#" className="category" onClick={() => props.getCategory('RPG')}>RPG</a>
            <a href="#" className="category" onClick={() => props.getCategory('Sports')}>Sports</a>
          </div>
        </div>
      </div>
    </header>
  );
}
