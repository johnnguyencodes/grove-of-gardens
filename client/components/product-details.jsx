import React from 'react';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {}
    };
    this.getProductDetails = this.getProductDetails.bind(this);
  }

  getProductDetails() {
    fetch(`api/products/${this.props.productId}`)
      .then(response => response.json())
      .then(productDetails => {
        this.setState(state => ({
          product: {
            image: productDetails.image,
            longDescription: productDetails.longDescription,
            name: productDetails.name,
            price: productDetails.price,
            productId: productDetails.productId,
            shortDescription: productDetails.shortDescription
          }
        })
        );
      })
      .catch(err => console.error('Fetch failed:', err));
  }

  componentDidMount() {
    this.getProductDetails();
  }

  render() {
    const productDetails = this.state.product;
    const pricing = this.state.product.price;
    const pricingFormatter = price => (price / 100).toFixed(2);
    if (this.state.product) {
      return (
        <div>
          <div className="product-list-container d-flex justify-content-center col-10 offset-1">
            <div className="my-4 pb-3" id={productDetails.productId}>
              <div className="h-100">
                <a onClick={() => this.props.setView('catalog', {})}>Back to Catalog</a>
                <img src={productDetails.image} className="card-img-top" alt={productDetails.name} />
                <h5 className="card-title text-left">{productDetails.name}</h5>
                <p className="card-price text-secondary font-weight-bold text-left">${pricingFormatter(pricing)}</p>
                <p className="card-text text-left">{productDetails.shortDescription}</p>
              </div>
              <p className="card-text text-left">{productDetails.longDescription}</p>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <h1>Whoops!</h1>
      );
    }
  }
}
