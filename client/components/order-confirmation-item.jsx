import React from 'react';

export default function OrderConfirmationItem(props) {
  const item = props.orderConfirmationItem;
  const pricing = item.price;
  const key = item.cartItemId;
  const quantity = item.quantity;
  const pricingFormatter = pricing => (pricing / 100).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  return (
    <div className="my-4 pb-3" id={item.productId} key={key}>
      <div className="card card-order-confirmation-item">
        <div className="card-body mb-4">
          <div className="card-corner d-flex justify-content-end mr-1">
          </div>
          <div className="col-12 row">
            <div className="col-4">
              <img src={item.image} className="card-img-top" alt={item.name}/>
            </div>
            <div className="col-8 d-flex flex-column justify-content-start">
              <h3 className="card-title text-left mb-3">{item.name}</h3>
              <h4 className="card-price text-secondary font-weight-bold text-left mb-3">${pricingFormatter(pricing)}</h4>
              <p className="card-text">Quantity: {quantity} </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
