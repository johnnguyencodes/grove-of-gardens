import React from 'react';
import CartSummaryItem from './cart-summary-item';

export default function CartSummary(props) {
  const cartArray = props.cartArray;
  if (!(cartArray.length)) {
    return (
      <div className="col-xl-10 offset-xl-1 px-5">
        <p className="mt-3" id="view" onClick={() => props.setView('catalog', {})}><u>Back to Catalog</u></p>
        <h1 className="mt-3">My Cart</h1>
        <div>
          <h3 className="my-5">No items currently in cart.</h3>
        </div>
      </div>
    );
  }
  let totalPricing = 0;
  let totalItems = 0;
  for (var i = 0; i < cartArray.length; i++) {
    totalPricing += (cartArray[i].price * cartArray[i].quantity);
    totalItems += (cartArray[i].quantity);
  }
  let itemSinglePlural = 'items';
  if (cartArray.length === 1) {
    itemSinglePlural = 'item';
  }
  const pricingFormatter = totalPricing => (totalPricing / 100).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  return (
    <div>
      <div className="col-xl-10 offset-xl-1 col-lg-10 offset-lg-1 col-md-12 col-sm-12 col-12 px-5">
        <p className="mt-3" id="view" onClick={() => props.setView('catalog', {})}><u>Back to Catalog</u></p>
        <h1 className="mt-3">{totalItems} {itemSinglePlural} in your cart</h1>
      </div>
      <div className="cart-summary-container row col-xl-10 offset-xl-1 col-lg-10 offset-lg-1 col-md-12 col-sm-12 col-12 pl-5">
        <div className="col-xl-8 d-flex flex-column mr-3 ml-0 my-0 p-0">
          <div className="card card-summary my-4 mx-0 p-0">
            <div className="card-body m-0 p-0">
              {cartArray.map(cartSummaryItem => {
                return (
                  <CartSummaryItem
                    quantityToUpdateArray={props.quantityToUpdateArray}
                    cartSummaryItem={cartSummaryItem}
                    key={cartSummaryItem.cartItemId}
                    setView={props.setView}
                    removeFromCart={props.removeFromCart}
                    quantityInputValidation={props.quantityInputValidation}
                    handleQuantityChange={props.handleQuantityChange}
                    incrementCartQuantity={props.incrementCartQuantity}
                    decrementCartQuantity={props.decrementCartQuantity}
                    quantityMaxLengthCheck={props.quantityMaxLengthCheck}
                    updateCartItemQuantity={props.updateCartItemQuantity}
                    cartArray={props.cartArray}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <footer className="cart-summary-checkout-container col-xl-3 col-12 mt-xl-4 mb-4 p-0">
          <div className="col-xl-12 p-0 m-0 d-flex justify-content-between align-content-center">
            <div className="card card-order">
              <div className="card-body">
                <div className="col-xl-12 p-0">
                  <h4 className="mb-4">Order Total: ${pricingFormatter(totalPricing)}</h4>
                  <button type="submit" onClick={() => props.setView('checkout', {})} className="btn text-white">Checkout</button>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>

  );
}
