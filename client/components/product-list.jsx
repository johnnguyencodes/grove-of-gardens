import React from 'react';
import ProductListItem from './product-list-item';

export default class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  render() {
    return (
      <div className="product-list-container col-10 offset-1">
        <div className="col-12 offset-1 d-flex flex-wrap card-deck m-0">
          <ProductListItem />
        </div>
      </div>

    );
  }
}
