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
    <div className="header-container bg-dark col-12">
      <div className="col-10 offset-1 d-flex justify-content-between align-content-center">
        <div className="row pl-5">
          <img src="images/wicked_logo.png" alt="logo" id="wicked-logo" />
          <h1 className="text-light align-text-bottom ml-2 mb-0 display-4 font-weight-bold">Sales</h1>
        </div>
        <div className="row pr-5 align-content-center" onClick={() => props.setView('cart', {})}>
          <h4 className="text-light align-content-center m-0">{cartItemCount} {itemSinglePlural}</h4><i className="fa fa-shopping-cart fa-2x text-light" aria-hidden="true"></i>
        </div>
      </div>
    </div>
  );
}
