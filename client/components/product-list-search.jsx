import React from 'react';
import Pagination from 'react-js-pagination';
import ProductListItem from './product-list-item';

export default class ProductListSearch extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.searchProducts(this.props.searchQuery);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.props.searchProducts();
    }
  }

  render() {
    const { products, activePage, productsPerPage } = this.props;
    const indexOfLastProduct = activePage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const pageRangeDisplayed = Math.ceil(this.props.totalItemsCount / 9);
    const renderProducts = currentProducts.map((product, index) => {
      return (
        <ProductListItem
          key={product.productId}
          product={product}
          setView={this.props.setView} />
      );
    });
    if (!this.props.products.length) {
      return (
        <div className="product-list-container col-8 offset-2">
          <div className="title mt-4 d-flex justify-content-center">
            <h1 className="title-border">Search: {this.props.searchQuery}</h1>
          </div>
          <div className="col-12 d-flex flex-wrap justify-content-center card-deck m-0">
            <h1>Searching...</h1>
          </div>
          <div className="pagination-container col-2 offset-5 d-flex justify-content-center">
            <Pagination
              linkClass="page-link shadow-none"
              activeLinkClass="page-link font-weight-bold shadow-none"
              hideFirstLastPages
              activePage={this.props.activePage}
              itemsCountPerPage={9}
              totalItemsCount={this.props.totalItemsCount}
              pageRangeDisplayed={pageRangeDisplayed}
              onChange={this.props.handlePageChange} />
          </div>
        </div>
      );
    }
    return (
      <div className="product-list-container col-8 offset-2">
        <div className="title mt-4 d-flex justify-content-center">
          <h1 className="title-border">Search: {this.props.searchQuery}</h1>
        </div>
        <div className="col-12 d-flex flex-wrap justify-content-center card-deck m-0">
          {renderProducts}
        </div>
        <div className="pagination-container col-2 offset-5 d-flex justify-content-center">
          <Pagination
            linkClass="page-link shadow-none"
            activeLinkClass="page-link font-weight-bold shadow-none"
            hideFirstLastPages
            activePage={this.props.activePage}
            itemsCountPerPage={9}
            totalItemsCount={this.props.totalItemsCount}
            pageRangeDisplayed={pageRangeDisplayed}
            onChange={this.props.handlePageChange} />
        </div>
      </div>
    );
  }
}
