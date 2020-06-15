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
    this.getCartItems = this.getCartItems.bind(this);
  }

  setView(name, params) {
    this.setState(state => ({
      view: {
        name: name,
        params: params
      }
    }));
  }

  getCartItems() {
    fetch('/api/cart')
      .then(response => response.json())
      .then(cartItems => {
        this.setState({
          cart: cartItems
        });
      });
  }

  addToCart(product) {
    fetch('/api/cart', {
      method: 'POST',
      body: JSON.stringify(product),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json()
        .then(data => {
          this.setState({
            cart: this.state.cart.concat(product)
          });
        })
        .catch(err => console.error('Fetch failed:', err))
      );
  }

  componentDidMount() {
    this.getCartItems();
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
        <Header cartItemCount={this.state.cart.length}/>
        { this.getView() }
      </div>
    );
  }
}
