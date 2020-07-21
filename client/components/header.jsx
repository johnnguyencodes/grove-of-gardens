import React from 'react';

export default function Header(props) {
  const cartItemCount = props.cartItemCount;
  let itemSinglePlural;
  if (cartItemCount === 1) {
    itemSinglePlural = 'Item';
  } else {
    itemSinglePlural = 'Items';
  }
  return (
    <header className="header-container col-12 fixed-top">
      <div className="col-8 offset-2 d-flex justify-content-between align-content-center">
        <div className="row pl-5">
          <h1 className="text-light align-text-bottom ml-2 my-1 logo" onClick={() => props.setView('catalog', {})}><i className="fa fa-gamepad text-light mr-2" aria-hidden="true"></i>Lost Levels Collectibles</h1>
        </div>
        <div className="row pr-5 align-content-center" id="shopping-cart" onClick={() => props.setView('cart', {})}>
          <h4 className="text-light align-content-center m-0">{cartItemCount} {itemSinglePlural}</h4><i className="fa fa-shopping-cart fa-2x text-light" aria-hidden="true"></i>
        </div>
      </div>
    </header>
  );
}
