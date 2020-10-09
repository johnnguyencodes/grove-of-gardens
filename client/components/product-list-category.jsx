import React from 'react';
import Pagination from 'react-js-pagination';
import ProductListItem from './product-list-item';

export default class ProductListCategory extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getCategory();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.category !== this.props.category) {
      this.props.getCategory();
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
    return (
      <div className="product-list-container col-xl-10 offset-xl-1 col-xs-12">
        <div className="title mt-4 d-flex justify-content-center">
          <h1 className="title-border">{this.props.category}</h1>
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
            itemsCountPerPage={12}
            totalItemsCount={this.props.totalItemsCount}
            pageRangeDisplayed={pageRangeDisplayed}
            onChange={this.props.handlePageChange} />
        </div>
      </div>
    );
  }
}
