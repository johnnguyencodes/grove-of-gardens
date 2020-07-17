import React from 'react';

export default function CartSummaryItem(props) {
  const item = props.cartSummaryItem;
  const pricing = item.price;
  const key = props.cartItemId;
  const pricingFormatter = price => (price / 100).toFixed(2);
  return (
    <div className="my-4 pb-3" id={item.productId} key={key}>
      <div className="card card-cart-summary" onClick={() => props.setView('details', { productId: item.productId })}>
        <div className="card-body">
          <div className="col-12 row">
            <div className="col-4">
              <img src={item.image} className="card-img-top" alt={item.name} />
            </div>
            <div className="col-8 d-flex flex-column justify-content-center">
              <h3 className="card-title text-left mb-3">{item.name}</h3>
              <h4 className="card-price text-secondary font-weight-bold text-left mb-3">${pricingFormatter(pricing)}</h4>
              <p className="card-text text-left">{item.shortDescription}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
