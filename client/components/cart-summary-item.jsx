import React from 'react';

export default function CartSummaryItem(props) {
  const item = props.cartSummaryItem;
  const pricing = item.price;
  const key = props.cartItemId;
  const pricingFormatter = price => (price / 100).toFixed(2);
  return (
    <div className="my-4 pb-3" id={item.productId} key={key}>
      <div className="card">
        <div className="card-body">
          <div className="col-12 row">
            <div className="col-4">
              <img src={item.image} className="card-img-top" alt={item.name} />
            </div>
            <div className="col-8 d-flex flex-column justify-content-center">
              <h5 className="card-title text-left">{item.name}</h5>
              <p className="card-price text-secondary font-weight-bold text-left">${pricingFormatter(pricing)}</p>
              <p className="card-text text-left">{item.shortDescription}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
