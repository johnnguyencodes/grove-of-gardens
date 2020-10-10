import React from 'react';
import ProductCarousel from './product-carousel';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      quantity: 1,
      dropdownOpen: false,
      inputVisible: false
    };
    this.getProductDetails = this.getProductDetails.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.toggleInput = this.toggleInput.bind(this);
    this.setQuantity = this.setQuantity.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.incrementQuantity = this.incrementQuantity.bind(this);
    this.decrementQuantity = this.decrementQuantity.bind(this);
  }

  getProductDetails() {
    fetch(`api/products/${this.props.productId}`)
      .then(response => response.json())
      .then(productDetails => {
        this.setState(state => ({
          product: {
            longDescription: productDetails.longDescription,
            name: productDetails.name,
            price: productDetails.price,
            productId: productDetails.productId,
            shortDescription: productDetails.shortDescription
          }
        })
        );
      })
      .catch(err => console.error('getProductDetails() fetch failed:', err));
  }

  componentDidMount() {
    this.getProductDetails();
  }

  toggleDropdown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  toggleInput() {
    this.setState({
      inputVisible: !this.state.inputVisible
    });
  }

  setQuantity(quantity) {
    this.setState({
      quantity: quantity
    });
  }

  handleChange(event) {
    const quantity = event.target.value;
    this.setState({
      quantity: quantity
    });
  }

  incrementQuantity() {
    event.preventDefault();
    const quantity = this.state.quantity + 1;
    this.setState({
      quantity: quantity
    });
  }

  decrementQuantity() {
    event.preventDefault();
    if (this.state.quantity === 0) {
      return;
    }
    const quantity = this.state.quantity - 1;
    this.setState({
      quantity: quantity
    });
  }

  render() {
    if (this.state.product === null) {
      return null;
    }
    const productDetails = this.state.product;
    const pricing = productDetails.price;
    const productId = productDetails.productId;
    const dropdownOpen = this.state.dropdownOpen;
    const inputVisible = this.state.inputVisible;
    const quantity = this.state.quantity;
    let disabled;
    if (this.state.quantity > 0) {
      disabled = null;
    } else if (this.state.quantity <= 0) { disabled = 'disabled'; }
    const pricingFormatter = price => (price / 100).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    const modalItemClass = this.props.showItemModal ? 'modal-container' : 'modal-container d-none';
    const modalItemOverlayClass = this.state.showItemModal ? 'modal-overlay' : 'modal-overlay d-none';
    const isItemAlreadyInCart = this.props.isItemAlreadyInCart
      ? <p className="mb-0"><b>{this.props.addedItem ? this.props.addedItem[0].name : ''}</b>: Quantity has been updated to {this.props.addedItem ? this.props.addedItem[0].quantity : ''}.</p>
      : <p className="mb-0"><b>{this.props.addedItem ? this.props.addedItem[0].name : ''}</b> x {this.props.addedItem ? this.props.addedItem[0].quantity : ''} has been to your cart.
      </p>;
    const quantityErrorClass = this.state.quantity
      ? 'd-none'
      : 'error d-inline text-danger ml-3 mt-3';

    return (
      <div>
        <div className="product-detail-container d-flex justify-content-center col-xl-8 offset-xl-2 col-lg-12 col-md-12 col-sm-12">
          <div className="my-4" id={productDetails.productId}>
            <div className="card card-product-details">
              <div className="card-body" onClick={dropdownOpen
                ? () => this.toggleDropdown()
                : null}>
                <p id="view" onClick={() => this.props.setView('catalog', {})}><u>Back to Catalog</u></p>
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 my-4 row">
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 m-0 p-0">
                    <ProductCarousel
                      productId={productDetails.productId} />
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                    <h1 className="card-title text-left mb-4">{productDetails.name}</h1>
                    <h4 className="card-price text-left mb-4">{productDetails.shortDescription}</h4>
                    <h5 className="card-text text-left mb-4 text-secondary font-weight-bold">
                      ${pricingFormatter(pricing)}</h5>
                    <p className="card-text text-left mb-4">{productDetails.longDescription}</p>
                    <div className="d-flex justify-content-between col-xl-6 col-lg-6 col-md-6 col-sm-12 px-0 mx-0">
                      <div className={inputVisible
                        ? 'quantity-dropdown-wrapper mr-5 mt-2 d-none'
                        : 'quantity-dropdown-wrapper mr-5 mt-2'
                      }>
                        <div className="quantity-dropdown-header">
                          <div className="quantity-dropdown-header-title">
                            <a onClick={() => this.toggleDropdown()}
                              className={dropdownOpen
                                ? 'dropdown text-white border rounded-top px-3 py-2'
                                : 'dropdown text-white border rounded px-3 py-2'
                              }>Qty: {this.state.quantity}
                              {dropdownOpen
                                ? <i className="fas fa-chevron-up text-white fa-xs pl-2"></i>
                                : <i className="fas fa-chevron-down text-white fa-xs pl-2"></i>
                              }
                            </a></div>

                        </div>
                        <ul className={dropdownOpen
                          ? 'quantity-dropdown-list border border-warning rounded-bottom px-0'
                          : 'quantity-dropdown-list d-none'
                        }>
                          <li className="quantity-dropdown-list-item pl-5" onClick={() => this.setQuantity(1)}>1</li>
                          <li className="quantity-dropdown-list-item pl-5" onClick={() => this.setQuantity(2)}>2</li>
                          <li className="quantity-dropdown-list-item pl-5" onClick={() => this.setQuantity(3)}>3</li>
                          <li className="quantity-dropdown-list-item pl-5" onClick={() => this.setQuantity(4)}>4</li>
                          <li className="quantity-dropdown-list-item pl-5" onClick={() => this.setQuantity(5)}>5</li>
                          <li className="quantity-dropdown-list-item pl-5" onClick={() => this.setQuantity(6)}>6</li>
                          <li className="quantity-dropdown-list-item pl-5" onClick={() => this.setQuantity(7)}>7</li>
                          <li className="quantity-dropdown-list-item pl-5" onClick={() => this.setQuantity(8)}>8</li>
                          <li className="quantity-dropdown-list-item pl-5" onClick={() => this.setQuantity(9)}>9</li>
                          <li className="quantity-dropdown-list-item pl-5 border-top border-warning" onClick={() => {
                            this.toggleInput();
                            this.setQuantity(10);
                          }}>10+</li>
                        </ul>
                      </div>
                      <div className={inputVisible ? 'quantity-input-container mr-5 p-0 d-flex align-items-center' : 'quantity-input-container d-none'}>
                        <a href="#" className="btn rounded-right quantity-decrement-button" onClick={() => this.decrementQuantity()}><i className="fas fa-minus text-white"></i></a>
                        <input type="number" className="details-quantity-input border-0 text-center px-2" pattern="[0-9]" min="0" onInput={this.props.numberMaxLengthCheck} onKeyDown={this.props.numberInputValidation} onChange={this.handleChange.bind(this)} maxLength="3" value={this.state.quantity} />
                        <a href="#" className="btn rounded-left quantity-increment-button" onClick={() => this.incrementQuantity()}><i className="fas fa-plus text-white"></i></a>
                      </div>
                      <button onClick={() => this.props.addToCart(productId, quantity)} className="btn add-to-cart-button text-white col-xl-6 col-lg-6 col-md-6 col-sm-12" disabled={disabled}
                      >Add to Cart</button>
                    </div>
                    <div className="row">
                      <div id="quantity_error" className={quantityErrorClass}>Quantity must be greater than or equal to 1.</div>
                    </div>
                    <div id="item_modal_container" className={modalItemClass}>
                      <div className="modal-dialog m-0">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h3 className="modal-title text-center w-100">Added to Cart</h3>
                            <i className="fas fa-times-circle fa-lg" onClick={() => this.props.hideItemModal()}></i>
                          </div>
                          <div className="modal-body text-center">
                            {isItemAlreadyInCart}
                          </div>
                          <div className="modal-footer d-flex justify-content-around">
                            <button type="button" className="btn btn-danger" onClick={() => {
                              this.props.setView('catalog', {});
                              this.props.hideItemModal();
                            }}>Continue Shopping</button>
                            <button type="button" className="btn btn-danger" onClick={() => {
                              this.props.setView('cart', {});
                              this.props.hideItemModal();
                            }}>View Cart</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div id="item_modal_overlay" className={modalItemOverlayClass}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
