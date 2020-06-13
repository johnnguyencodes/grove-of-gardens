import React from 'react';
import Header from './header';
import ProductList from './product-list';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'catalog',
        params: {}
      }
    };
    this.setView = this.setView.bind(this);
  }

  setView(name, params) {
    this.setState(state => ({
      name: name,
      params: params
    }));
  }

  render() {
    return (
      <div>
        <Header />
        <ProductList setView={this.setView}/>
      </div>);
  }
}
