import React from 'react';
import ProductCarousel from './product-carousel';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      quantity: 1,
      dropdownOpen: false
    };
    this.getProductDetails = this.getProductDetails.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.setQuantity = this.setQuantity.bind(this);
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

  setQuantity(quantity) {
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
                      <div className="quantity-dropdown-wrapper mt-2">
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
                          <li className="quantity-dropdown-list-item pl-5" onClick={() => this.setQuantity(10)}>10</li>
                        </ul>
                      </div>
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
