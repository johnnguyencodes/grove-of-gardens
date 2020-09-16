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
          <div className="col-12 row">
            <div className="col-4">
              <img src={image} className="card-img-top" alt={name} onClick={() => props.setView('details', { productId: productId })}/>
            </div>
            <div className="col-8 d-flex flex-column justify-content-start">
              <h3 className="card-title text-left mb-3">{name}</h3>
              <h4 className="card-price text-secondary font-weight-bold text-left mb-3">${pricingFormatter(pricing)}</h4>
              <p className="card-text text-left">{shortDescription}</p>
              <div className="input-row">
                <label htmlFor="quantity" className="mr-2 font-weight-bold">Quantity:</label>
                <input type="number" pattern="[0-9]" onInput={props.quantityMaxLengthCheck} onKeyDown={props.quantityInputValidation} onChange={props.handleQuantityChange.bind(this)} maxLength="3" value={quantity} className='quantity-input col-6 mr-5 px-3 py-2 border border-danger rounded'/>
                <button className="btn text-white" onClick={() => props.removeFromCart(key)}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
