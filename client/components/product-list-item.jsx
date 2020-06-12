import React from 'react';

export default function ProductListItem(props) {
  const product = props.product;
  return (
    <div className="my-4 pb-3 col-4" id={product.productId}>
      <div className="card h-100">
        <img src={product.image} className="card-img-top" alt={product.name} />
        <div className="card-body h-100">
          <h5 className="card-title text-left">{product.name}</h5>
          <p className="card-price text-secondary font-weight-bold text-left">{product.price}</p>
          <p className="card-text text-left">{product.shortDescription}</p>
        </div>
      </div>
    </div>
  );
}
