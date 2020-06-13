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
    if (this.state.product) {
      return (
        this.state.product.map(details => {
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
    } else {
      return null;
    }
  }

}
