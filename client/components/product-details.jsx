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
    const details = this.state.product;
    if (this.state.product) {
      return (
        <div key={details.productId}>
          <img src={details.image} alt={details.name}/>
          <h1>{details.name}</h1>
          <p>{details.price}</p>
          <p>{details.shortDescription}</p>
          <p>{details.longDescription}</p>
        </div>
      );
    } else {
      return (
        <h1>Whoops!</h1>
      );
    }
  }
}
