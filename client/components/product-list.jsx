import React from 'react';
import ProductListItem from './product-list-item';

export default class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
    this.getProducts = this.getProducts.bind(this);
  }

  getProducts() {
    fetch('api/products')
      .then(response => response.json())
      .then(productsData => {
        this.setState({
          products: productsData
        });
      })
      .catch(err => console.error('Fetch failed:', err));
  }

  componentDidMount() {
    this.getProducts();
  }

  render() {
    return (
      <div className="product-list-container col-10 offset-1">
        <div className="col-12 d-flex flex-wrap card-deck m-0">
          {this.state.products.map(product => {
            return (
              <ProductListItem
                key={product.productId}
                product={product}
                setView={this.props.setView}/>
            );
          })}
        </div>
      </div>
    );
  }
}
