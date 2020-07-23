import React from 'react';

export default function ProductListItem(props) {
  const product = props.product;
  const pricing = product.price;
  const pricingFormatter = price => (price / 100).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  return (
    <div className="my-4 pb-3 col-4 fade-in slide-in" id={product.productId}>
      <div className="card h-100 stretched-link card-product-list-item shadow-sm" onClick={() => props.setView('details', { productId: product.productId })}>
        <img src={product.image} className="card-img-top mt-3" alt={product.name} />
        <div className="card-body h-100">
          <h5 className="card-title text-left">{product.name}</h5>
          <p className="card-price text-secondary font-weight-bold text-left">{product.shortDescription}</p>
          <p className="card-text text-left">Asking Price: ${pricingFormatter(pricing)}</p>
        </div>
      </div>
    </div>
  );
}
