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
    fetch('api/products/:productId')
      .then(response => response.json())
      .then(productDetails => {
        this.setState({
          product: productDetails
        });
      })
      .catch(err => console.error('Fetch failed:', err));
  }

  componentDidMount() {
    this.getProductDetails();
  }

  render() {
    return (
      this.state.product.map(details => {
        // need to figure out a way to conditionally render a view of the product.
        // if the productId matches a product, then render.
        // if it doesn't, render null/404?
        return (
          <div key={details.productId}>
            <img src={details.image} alt={details.name}/>
            <h1>{details.name}</h1>
            <p>{details.price}</p>
            <p>{details.shortDescription}</p>
          </div>
        );
      })
    );
  }

}
