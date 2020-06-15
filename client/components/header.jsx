import React from 'react';

export default function Header(props) {
  alert(props.cartItemCount);
  const cartItemCount = props.cartItemCount;
  return (
    <div className="header-container bg-dark d-flex align-content-end">
      <img src="images/wicked_logo.png" alt="logo" id="wicked-logo" />
      <h1 className="text-light align-text-bottom m-0 p-0">Sales</h1>
      <p>{cartItemCount}</p><i className="fa fa-shopping-cart fa-lg" aria-hidden="true"></i>
    </div>
  );
}
