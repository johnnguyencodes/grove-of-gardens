import React from 'react';

export default function OrderConfirmationItem(props) {
  const item = props.orderConfirmationItem;
  const pricing = item.price;
  const key = item.cartItemId;
  const quantity = item.quantity;
  const pricingFormatter1 = pricing => (pricing / 100).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  const pricingFormatter2 = pricing => ((pricing * quantity) / 100).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  return (
    <div className="m-3" id={item.productId} key={key}>
      <div className="card card-order-confirmation-item border-0">
        <div className="card-body p-0">
          <div className="col-12 p-0 m-0 row">
            <div className="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4 d-flex align-items-center justify-content-center">
              <img src={item.image} className="order-confirmation-img" alt={item.name} onClick={() => props.setView('details', { productId: item.productId })}/>
            </div>
            <div className="col-12 col-sm-8 col-md-8 col-lg-8 col-xl-8 d-flex flex-column justify-content-start">
              <h3 className="card-title text-left my-3">{item.name}</h3>
              <p className="card-price text-left mb-3">${pricingFormatter1(pricing)}</p>
              <p className="card-text">Quantity: {quantity}</p>
              <p className="font-weight-bold">Subtotal: ${pricingFormatter2(pricing)}</p>
            </div>
          </div>
        </div>
      </div>
      <hr className="mx-3"/>
    </div>
  );
}
