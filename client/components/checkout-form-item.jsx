import React from 'react';

export default function CheckoutFormItem(props) {
  const item = props.checkoutFormItem;
  const key = item.cartItemId;
  const image = item.image;
  const name = item.name;
  const quantity = item.quantity;
  let hrClass = null;
  if (props.cartArray[props.cartArray.length - 1].cartItemId === key) {
    hrClass = 'd-none';
  } else {
    hrClass = 'mx-2 mb-0';
  }
  return (
    <div className="px-3 pt-3" id={key}>
      <div className="card-body">
        <div className="col-12 row p-0 m-0">
          <div className="col-4 p-0 d-flex align-item-center">
            <img src={image} className="checkout-form-item-img" alt={name}/>
          </div>
          <div className="col-8 d-flex flex-column justify-content-start pl-2 pr-0 m-0">
            <p className="card-title text-left mb-3 font-weight-bold">{name}</p>
            <p className="m-0 p-0">Quantity: {quantity}</p>
          </div>
        </div>
      </div>
      <hr className={hrClass}/>
    </div>
  );
}
