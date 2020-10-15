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
    if (this.props.searchQuery === null || this.props.searchQuery.length === 0 || this.props.searchQuery.length >= 3) {
      if (!(this.props.products.length)) {
        return (
          <div className="product-list-container col-12">
            <div className="title mt-4 d-flex justify-content-center">
              <h1 className="title-border">Search</h1>
            </div>
            <div className="col-12 d-flex flex-column align-items-center card-deck mt-3 mx-0 p-0">
              <h4 className="text-center">Search has returned no results</h4>
              <p className="text-center">Please try a different search</p>
            </div>
          </div>
        );
      }
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
      return (
        <div className="product-list-container col-xl-10 offset-xl-1 col-xs-12">
          <div className="title mt-4 d-flex justify-content-center">
            <h1 className="title-border">Search</h1>
          </div>
          <div className="col-12 d-flex flex-wrap justify-content-center m-0">
            {renderProducts}
          </div>
          <div className="pagination-container col-2 offset-5 d-flex justify-content-center">
            <Pagination
              linkClass="page-link shadow-none"
              activeLinkClass="page-link font-weight-bold shadow-none"
              hideFirstLastPages
              activePage={this.props.activePage}
              itemsCountPerPage={15}
              totalItemsCount={this.props.totalItemsCount}
              pageRangeDisplayed={pageRangeDisplayed}
              onChange={this.props.handlePageChange} />
          </div>
        </div>
      );
    } else if (this.props.searchQuery.length >= 1 && this.props.searchQuery.length < 3) {
      return (
        <div className="product-list-container col-8 offset-2">
          <div className="title mt-4 d-flex justify-content-center">
            <h1 className="title-border">Search</h1>
          </div>
          <div className="col-12 d-flex flex-column align-items-center card-deck m-0">
            <h1>Search by name or description</h1>
            <p>Enter a search with at least three characters</p>
          </div>
        </div>
      );
    }
  }
}
