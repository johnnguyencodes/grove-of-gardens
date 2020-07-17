import React from 'react';
import CartSummaryItem from './cart-summary-item';

export default function CartSummary(props) {
  const cartArray = props.cartArray;
  if (!(cartArray.length)) {
    return (
      <div className="col-10 offset-1 px-5 slide-in">
        <p className="mt-3" id="view" onClick={() => props.setView('catalog', {})}><u>Back to Catalog</u></p>
        <h1 className="mt-3">My Cart</h1>
        <div>
          <h3 className="my-5">No items currently in cart.</h3>
        </div>
      </div>
    );
  }
  let totalPricing = 0;
  for (var i = 0; i < cartArray.length; i++) {
    totalPricing += cartArray[i].price;
  }
  const pricingFormatter = totalPricing => (totalPricing / 100).toFixed(2);
  return (
    <div>
      <div className="col-8 offset-2 px-5">
        <p className="mt-3" id="view" onClick={() => props.setView('catalog', {})}><u>Back to Catalog</u></p>
        <h1 className="mt-3">My Cart</h1>
      </div>
      <div className="cart-summary-container col-8 offset-2">
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
      <footer className="cart-summary-footer col-12 mb-4">
        <div className="col-8 offset-2 px-5 d-flex justify-content-between align-content-center">
          <h3>Item Total: ${pricingFormatter(totalPricing)}</h3>
          <button type="submit" onClick={() => props.setView('checkout', {})} className="btn btn-primary">Checkout</button>
        </div>
      </footer>
    </div>
  );
}
