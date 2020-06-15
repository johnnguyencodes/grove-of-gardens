import React from 'react';

export default function CartSummaryItem(props) {
  const item = props.cart;
  const keyAttr = props.cart.cartItemId;
  const pricing = item.price;
  const pricingFormatter = price => (price / 100).toFixed(2);
  return (
    <div key={keyAttr}>
      <div className="my-4 pb-3 col-4" id={item.productId}>
        <div className="card h-100">
          <img src={item.image} className="card-img-top" alt={item.name} />
          <div className="card-body h-100">
            <h5 className="card-title text-left">{item.name}</h5>
            <p className="card-price text-secondary font-weight-bold text-left">${pricingFormatter(pricing)}</p>
            <p className="card-text text-left">{item.shortDescription}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
