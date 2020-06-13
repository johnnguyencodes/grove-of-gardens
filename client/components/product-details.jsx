import React from 'react';
// import ProductList from './product-list';

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
    return null;
  }

}
