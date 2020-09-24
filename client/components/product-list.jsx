import React from 'react';
import Pagination from 'react-js-pagination';
import ProductListItem from './product-list-item';

export default class ProductList extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    // this.state = {
    //   // products: [],
    //   // activePage: 1,
    //   // productsPerPage: 9,
    //   // totalItemsCount: 20
    // };
    // this.getProducts = this.getProducts.bind(this);
    // this.getCategory = this.getCategory.bind(this);
    // this.setSearchedProducts = this.setSearchedProducts.bind(this);
  }

  // getProducts() {
  //   fetch('api/products')
  //     .then(response => response.json())
  //     .then(productsData => {
  //       this.setState({
  //         products: productsData,
  //         totalItemsCount: productsData.length
  //       });
  //     })
  //     .catch(err => console.error('Fetch failed:', err));
  // }

  // getCategory(category) {
  //   const itemCategory = {
  //     category: category
  //   };
  //   fetch(`api/category/${category}`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(itemCategory)
  //   })
  //     .then(response => response.json())
  //     .then(productsData => {
  //       this.setState({
  //         products: productsData,
  //         totalItemsCount: productsData.length
  //       });
  //     })
  //     .catch(err => console.error('Fetch failed:', err));
  // }

  // handlePageChange(pageNumber) {
  //   this.setState({
  //     activePage: pageNumber
  //   });
  // }

  componentDidMount() {
    this.props.getProducts();
  }

  render() {
    const { products, activePage, productsPerPage } = this.props;
    const indexOfLastProduct = activePage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const pageRangeDisplayed = Math.ceil(this.props.totalItemsCount / 9);
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
            activePage={this.props.activePage}
            itemsCountPerPage={9}
            totalItemsCount={this.props.totalItemsCount}
            pageRangeDisplayed={pageRangeDisplayed}
            onChange={this.props.handlePageChange} />
        </div>
        <div className="category-container row d-flex justify-content-around col-10 offset-1">
          <button className="btn btn-danger text-white" onClick={() => this.props.getProducts()}>All</button>
          <button className="btn btn-danger text-white" onClick={() => this.props.getCategory('Action%20Adventure')}>Action Adventure</button>
          <button className="btn btn-danger text-white" onClick={() => this.props.getCategory('Fighting')}>Fighting</button>
          <button className="btn btn-danger text-white" onClick={() => this.props.getCategory('Platformer')}>Platformer</button>
          <button className="btn btn-danger text-white" onClick={() => this.props.getCategory('Puzzle')}>Puzzle</button>
          <button className="btn btn-danger text-white" onClick={() => this.props.getCategory('RPG')}>RPG</button>
          <button className="btn btn-danger text-white" onClick={() => this.props.getCategory('Sports')}>Sports</button>
        </div>
        <div className="col-12 d-flex flex-wrap justify-content-center card-deck m-0">
          {renderTodo}
        </div>
      </div>
    );
  }
}
