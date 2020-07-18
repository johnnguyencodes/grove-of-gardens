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
    const productId = productDetails.productId;
    const pricingFormatter = price => (price / 100).toFixed(2);
    return (
      <div>
        <div className="product-detail-container d-flex justify-content-center col-8 offset-2 slide-in fade-in">
          <div className="my-4" id={productDetails.productId}>
            <div className="card card-product-details">
              <div className="card-body">
                <p id="view" onClick={() => this.props.setView('catalog', {})}><u>Back to Catalog</u></p>
                <div className="col-12 my-4 row">
                  <div className="col-6 m-0 p-0 d-flex justify-content-center">
                    <img src={productDetails.image} className="card-img-detail" alt={productDetails.name} />
                  </div>
                  <div className="col-6">
                    <h1 className="card-title text-left mb-4">{productDetails.name}</h1>
                    <h4 className="card-price text-left mb-4">{productDetails.shortDescription}</h4>
                    <h5 className="card-text text-left mb-4 text-secondary font-weight-bold">Asking Price: ${pricingFormatter(pricing)}</h5>
                    <p className="card-text text-left mb-4">{productDetails.longDescription}</p>
                    <button onClick={() => this.props.addToCart(productId)} className="btn text-white">Add to Cart</button>
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
