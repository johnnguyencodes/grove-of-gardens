import React from 'react';
import CartSummaryItem from './cart-summary-item';

export default function CartSummary(props) {
  const itemArray = props.cart;
  return (
    <div className = "cart-summary-container col-10 offset-1">
      <div className="col-12 d-flex flex-wrap card-deck m-0">
        {itemArray.map(cartSummaryItem => {
          return (
            <CartSummaryItem
              key={cartSummaryItem.cartId}
              cartSummaryItem={cartSummaryItem}/>
          );
        })}
      </div>
    </div>
  );
}
