import React from 'react';

export default function CartSummaryItem(props) {
  const item = props.cartSummaryItem;
  const productId = item.productId;
  const key = item.cartItemId;
  const image = item.image;
  const name = item.name;
  const pricing = item.price;
  const quantityInCart = item.quantity;
  const shortDescription = item.shortDescription;
  const quantityIndex = props.quantityToUpdateArray.findIndex(cartItem => cartItem.cartItemId === key);
  const quantity = props.quantityToUpdateArray[quantityIndex].quantity;
  let disabled;
  if (quantity > 0) {
    disabled = null;
  } else if (quantity <= 0) { disabled = 'disabled'; }
  const pricingFormatter1 = price => (price / 100).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  const pricingFormatter2 = price => ((price * quantityInCart) / 100).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  return (
    <div className="my-4" id={productId} key={key}>
      <div className="card card-cart-summary">
        <div className="card-body">
          <div className="col-12 p-0 m-0 row">
            <div className="col-4 d-flex align-items-center">
              <img src={image} className="cart-summary-img" alt={name} onClick={() => props.setView('details', { productId: productId })}/>
            </div>
            <div className="col-8 d-flex flex-column justify-content-start">
              <h3 className="card-title text-left mb-3">{name}</h3>
              <p className="card-text text-left">{shortDescription}</p>
              <p className="card-price text-left mb-3">${pricingFormatter1(pricing)}</p>
              <div className="input-row d-flex align-items-center">
                <label htmlFor="quantity" className="mr-2 font-weight-bold mb-0"><h6 className="m-0">Quantity:</h6></label>
                <div className='cart-quantity-input-container mr-4 p-0 d-flex align-items-center'>
                  <a href="#" className="btn rounded-right quantity-decrement-button" onClick={() => props.decrementCartQuantity(quantityIndex)}><i className="fas fa-minus text-white"></i></a>
                  <input type="number" className="cart-quantity-input border rounded text-center" pattern="[0-9]" min="0" onInput={props.quantityMaxLengthCheck} onKeyDown={props.quantityInputValidation} onChange={props.handleQuantityChange.bind(this, quantityIndex)} maxLength="3" value={quantity} />
                  <a href="#" className="btn rounded-left quantity-increment-button" onClick={() => props.incrementCartQuantity(quantityIndex)}><i className="fas fa-plus text-white"></i></a>
                </div>
                <button className="btn text-white mr-4" onClick={() => props.updateCartItemQuantity(key, quantity)} disabled={disabled}>Update</button>
                <button className="btn text-white" onClick={() => props.removeFromCart(key)}>Delete</button>
              </div>
              <h5 className="mt-3">Subtotal: ${pricingFormatter2(pricing)}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
