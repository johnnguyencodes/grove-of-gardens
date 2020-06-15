import React from 'react';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
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
    if (this.state.product === null) {
      return null;
    }
    const productDetails = this.state.product;
    const pricing = productDetails.price;
    const pricingFormatter = price => (price / 100).toFixed(2);
    return (
      <div>
        <div className="product-detail-container d-flex justify-content-center col-10 offset-1">
          <div className="my-4" id={productDetails.productId}>
            <div className="card">
              <div className="card-body">
                <a className="my-3" onClick={() => this.props.setView('catalog', {})}>Back to Catalog</a>
                <div className="col-12 my-4 row">
                  <div className="col-4 m-0 p-0">
                    <img src={productDetails.image} className="card-img-top" alt={productDetails.name} />
                  </div>
                  <div className="col-8">
                    <h1 className="card-title text-left">{productDetails.name}</h1>
                    <h4 className="card-price text-secondary font-weight-bold text-left">${pricingFormatter(pricing)}</h4>
                    <p className="card-text text-left">{productDetails.shortDescription}</p>
                    <button className="btn btn-primary">Add to Cart</button>
                  </div>
                </div>
                <p className="card-text text-left">{productDetails.longDescription}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
