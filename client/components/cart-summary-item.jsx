import React from 'react';

export default function CartSummaryItem(props) {
  const item = props.cartSummaryItem;
  const productId = item.productId;
  const key = item.cartItemId;
  const image = item.image;
  const name = item.name;
  const pricing = item.price;
  const shortDescription = item.shortDescription;
  const quantity = item.quantity;
  const pricingFormatter = price => (price / 100).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  return (
    <div className="my-4 pb-3" id={productId} key={key}>
      <div className="card card-cart-summary">
        <div className="card-body mb-4">
          <div className="card-corner d-flex justify-content-end mr-1">
            <i className="fa fa-window-close text-danger fa-2x mr-2" onClick={() => props.removeFromCart(key)}></i>
          </div>
          <div className="col-12 row">
            <div className="col-4">
              <img src={image} className="card-img-top" alt={name} onClick={() => props.setView('details', { productId: productId })}/>
            </div>
            <div className="col-8 d-flex flex-column justify-content-start">
              <h3 className="card-title text-left mb-3">{name}</h3>
              <h4 className="card-price text-secondary font-weight-bold text-left mb-3">${pricingFormatter(pricing)}</h4>
              <p className="card-text text-left">{shortDescription}</p>
              <p className="card-text font-weight-bold">Quantity: {quantity}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
