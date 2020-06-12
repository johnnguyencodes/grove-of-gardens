import React from 'react';

export default function ProductListItem() {
  const productImg = null;
  const productName = null;
  const productPrice = null;
  const productDescription = null;
  return (
    <div className="my-4 col-4 pb-3">
      <div className="card h-100">
        <img src={productImg} className="card-img-top" alt={productName} />
        <div className="card-body h-100">
          <h5 className="card-title text-left">{productName}</h5>
          <p className="card-price text-secondary font-weight-bold text-left">{productPrice}</p>
          <p className="card-text text-left">{productDescription}</p>
        </div>
      </div>
    </div>
  );
}
