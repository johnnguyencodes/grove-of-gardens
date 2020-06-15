import React from 'react';
import CartSummaryItem from './cart-summary-item';

export default function CartSummary(props) {
  const cartArray = props.cartArray;
  if (!(cartArray.length)) {
    return (
      <div>
        <div>
          <a className="my-3" onClick={() => props.setView('catalog', {})}>Back to Catalog</a>
          <h1>My Cart</h1>
        </div>
        <div className="cart-summary-container col-10 offset-1">
          <div className="col-12 de-flex flex-wrap card-deck m-0">
            <h1>No items currently in cart.</h1>
          </div>
        </div>
      </div>
    );
  }
  let totalPricing;
  for (var i = 0; i < cartArray.length; i++) {
    totalPricing += cartArray[i].price;
  }
  const pricingFormatter = totalPricing => (totalPricing / 100).toFixed(2);
  return (
    <div>
      <div>
        <a className="my-3" onClick={() => props.setView('catalog', {})}>Back to Catalog</a>
        <h1>My Cart</h1>
      </div>
      <div className="cart-summary-container col-10 offset-1">
        <div className="col-12 d-flex flex-column card-deck m-0">
          {cartArray.map(cartSummaryItem => {
            return (
              <CartSummaryItem
                cartSummaryItem={cartSummaryItem}
                key={cartSummaryItem.cartItemId}/>
            );
          })}
        </div>
      </div>
      <h3>Item Total: ${pricingFormatter(totalPricing)}</h3>
    </div>
  );
}
