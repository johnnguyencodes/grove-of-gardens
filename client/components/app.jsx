import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'catalog',
        params: {}
      },
      cart: []
    };
    this.setView = this.setView.bind(this);
    this.getView = this.getView.bind(this);
  }

  setView(name, params) {
    this.setState(state => ({
      view: {
        name: name,
        params: params
      }
    }));
  }

  getView() {
    switch (this.state.view.name) {
      case 'catalog':
        return <ProductList setView={this.setView} />;
      case 'details':
        return <ProductDetails
          productId={this.state.view.params.productId}
          setView={this.setView} />;
    }
  }

  render() {
    return (
      <div>
        <Header />
        { this.getView() }
      </div>
    );
  }
}
