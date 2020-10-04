import React from 'react';

export default function CheckoutFormItem(props) {
  const item = props.checkoutFormItem;
  const key = item.cartItemId;
  const image = item.image;
  const name = item.name;
  const quantity = item.quantity;
  return (
    <div className="px-3 pt-3" id={key}>
      <div className="card card-checkout-summary">
        <div className="card-body">
          <div className="col-12 row pr-0 mr-0">
            <div className="col-4 p-0 d-flex align-item-center">
              <img src={image} className="checkout-form-item-img" alt={name}/>
            </div>
            <div className="col-8 d-flex flex-column justify-content-start">
              <p className="card-title text-left mb-3 font-weight-bold">{name}</p>
              <p>Quantity: {quantity}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
