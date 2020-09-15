import React from 'react';
import ProductCarousel from './product-carousel';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      quantity: 0,
      dropdownOpen: false,
      inputVisible: false
    };
    this.getProductDetails = this.getProductDetails.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.toggleInput = this.toggleInput.bind(this);
    this.setQuantity = this.setQuantity.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.maxLengthCheck = this.maxLengthCheck.bind(this);
    this.inputValidation = this.inputValidation.bind(this);
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

  inputValidation(event) {
    if ([69, 109, 107, 110].includes(event.keyCode)) {
      event.preventDefault();
    }
  }

  handleChange(event) {
    const quantity = event.target.value;
    this.setState({
      quantity: quantity
    });
  }

  maxLengthCheck(object) {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(0, object.target.maxLength);
    }
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
    const pricingFormatter = price => (price / 100).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    return (
      <div>
        <div className="product-detail-container d-flex justify-content-center col-8 offset-2">
          <div className="my-4" id={productDetails.productId}>
            <div className="card card-product-details">
              <div className="card-body" onClick={dropdownOpen
                ? () => this.toggleDropdown()
                : null}>
                <p id="view" onClick={() => this.props.setView('catalog', {})}><u>Back to Catalog</u></p>
                <div className="col-12 my-4 row">
                  <div className="col-6 m-0 p-0">
                    <ProductCarousel
                      productId={productDetails.productId} />
                  </div>
                  <div className="col-6">
                    <h1 className="card-title text-left mb-4">{productDetails.name}</h1>
                    <h4 className="card-price text-left mb-4">{productDetails.shortDescription}</h4>
                    <h5 className="card-text text-left mb-4 text-secondary font-weight-bold">
                      Asking Price: ${pricingFormatter(pricing)}</h5>
                    <p className="card-text text-left mb-4">{productDetails.longDescription}</p>
                    <div className="d-flex justify-content-between col-6 px-0">
                      <div className={inputVisible
                        ? 'quantity-dropdown-wrapper mt-2 d-none'
                        : 'quantity-dropdown-wrapper mt-2'
                      }>
                        <div className="quantity-dropdown-header">
                          <div className="quantity-dropdown-header-title">
                            <a onClick={() => this.toggleDropdown()}
                              className={dropdownOpen
                                ? 'bg-danger text-white border rounded-top px-3 py-2'
                                : 'bg-danger text-white border rounded px-3 py-2'
                              }>Qty: {this.state.quantity}
                              {dropdownOpen
                                ? <i className="fas fa-chevron-up text-white fa-xs pl-2"></i>
                                : <i className="fas fa-chevron-down text-white fa-xs pl-2"></i>
                              }
                            </a></div>

                        </div>
                        <ul className={dropdownOpen
                          ? 'quantity-dropdown-list border border-danger rounded-bottom px-0'
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
                          <li className="quantity-dropdown-list-item pl-5 border-top border-danger" onClick={() => {
                            this.toggleInput();
                          }}>10+</li>
                        </ul>
                      </div>
                      <input type="number" pattern="[0-9]" onInput={this.maxLengthCheck} onKeyDown={this.inputValidation} onChange={this.handleChange.bind(this)} maxLength="3" className={inputVisible
                        ? 'quantity-input col-6 mr-5 px-3 py-2 border border-danger rounded'
                        : 'quantity-input mt-2 d-none'
                      }/>
                      <button onClick={() => this.props.addToCart(productId, quantity)} className="btn text-white col-6">Add to Cart</button>
                    </div>
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
