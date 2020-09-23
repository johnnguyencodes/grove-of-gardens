import React from 'react';
import Pagination from 'react-js-pagination';
import ProductListItem from './product-list-item';

export default class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      activePage: 1,
      productsPerPage: 9
    };
    this.getProducts = this.getProducts.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
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

  getCategory(category) {
    const itemCategory = {
      category: category
    };
    fetch(`api/products/${category}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(itemCategory)
    })
      .then(response => response.json())
      .then(productsData => {
        this.setState({
          products: productsData
        });
      })
      .catch(err => console.error('Fetch failed:', err));
  }

  handlePageChange(pageNumber) {
    this.setState({
      activePage: pageNumber
    });
  }

  componentDidMount() {
    this.getProducts();
  }

  render() {
    const { products, activePage, productsPerPage } = this.state;
    const indexOfLastProduct = activePage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const renderTodo = currentProducts.map((product, index) => {
      return (
        <ProductListItem
          key={product.productId}
          product={product}
          setView={this.props.setView} />
      );
    });
    return (
      <div className="product-list-container col-8 offset-2">
        <div className="pagination-container col-2 offset-5 d-flex justify-content-center">
          <Pagination
            linkClass="page-link bg-white text-danger shadow-none"
            activeLinkClass="page-link font-weight-bold shadow-none"
            hideFirstLastPages
            activePage={this.state.activePage}
            itemsCountPerPage={9}
            totalItemsCount={20}
            pageRangeDisplayed={3}
            onChange={this.handlePageChange} />
        </div>
        <div className="col-12 d-flex flex-wrap justify-content-center card-deck m-0">
          {renderTodo}
        </div>
      </div>
    );
  }
}
