import React from 'react';
import Pagination from 'react-js-pagination';
import ProductListItem from './product-list-item';

export default class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      activePage: 1,
      productsPerPage: 9,
      totalItemsCount: 20,
      searchQuery: null
    };
    this.getProducts = this.getProducts.bind(this);
    this.getCategory = this.getCategory.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSearchQueryChange = this.handleSearchQueryChange.bind(this);
  }

  getProducts() {
    fetch('api/products')
      .then(response => response.json())
      .then(productsData => {
        this.setState({
          products: productsData,
          totalItemsCount: productsData.length
        });
      })
      .catch(err => console.error('Fetch failed:', err));
  }

  getCategory(category) {
    const itemCategory = {
      category: category
    };
    fetch(`api/category/${category}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(itemCategory)
    })
      .then(response => response.json())
      .then(productsData => {

        this.setState({
          products: productsData,
          totalItemsCount: productsData.length
        });
      })
      .catch(err => console.error('Fetch failed:', err));
  }

  handlePageChange(pageNumber) {
    this.setState({
      activePage: pageNumber
    });
  }

  handleSearchQueryChange() {
    const searchQuery = event.target.value;
    this.setState({
      searchQuery: searchQuery
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
    const pageRangeDisplayed = Math.ceil(this.state.totalItemsCount / 9);
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
            totalItemsCount={this.state.totalItemsCount}
            pageRangeDisplayed={pageRangeDisplayed}
            onChange={this.handlePageChange} />
        </div>
        <div className="category-container row d-flex justify-content-around col-10 offset-1">
          <button className="btn btn-danger text-white" onClick={() => this.getProducts()}>All</button>
          <button className="btn btn-danger text-white" onClick={() => this.getCategory('Action%20Adventure')}>Action Adventure</button>
          <button className="btn btn-danger text-white" onClick={() => this.getCategory('Fighting')}>Fighting</button>
          <button className="btn btn-danger text-white" onClick={() => this.getCategory('Platformer')}>Platformer</button>
          <button className="btn btn-danger text-white" onClick={() => this.getCategory('Puzzle')}>Puzzle</button>
          <button className="btn btn-danger text-white" onClick={() => this.getCategory('RPG')}>RPG</button>
          <button className="btn btn-danger text-white" onClick={() => this.getCategory('Sports')}>Sports</button>
          <div className="input-group">
            <input type="text" className="form-control ml-2 input rounded-left"
              placeholder="Search"></input>
            <button className="btn btn-primary rounded-right mr-2 input">
              <i className="fa fa-search"></i>
            </button>
          </div>
        </div>
        <div className="col-12 d-flex flex-wrap justify-content-center card-deck m-0">
          {renderTodo}
        </div>
      </div>
    );
  }
}
