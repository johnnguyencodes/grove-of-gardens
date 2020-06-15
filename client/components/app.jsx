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
    this.addToCart = this.addToCart.bind(this);
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

  componentDidMount() {
    this.getCartItems();
  }

  addToCart(productId) {
    var addedItem = {};
    const cart = this.state.cart;
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].id === productId) {
        addedItem.image = cart[i].image;
        addedItem.name = cart[i].name;
        addedItem.price = cart[i].price;
        addedItem.productId = cart[i].productId;
        addedItem.shortDescription = cart[i].shortDescription;
      }
    }
    fetch(`/api/cart/${productId}`, {
      method: 'POST',
      body: JSON.stringify(addedItem),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json()
        .then(data => {
          this.setState({
            cart: this.state.cart.concat(data)
          });
        })
        .catch(err => console.error('Fetch failed:', err))
      );
  }

  getView() {
    switch (this.state.view.name) {
      case 'catalog':
        return <ProductList setView={this.setView} />;
      case 'details':
        return <ProductDetails
          productId={this.state.view.params.productId}
          setView={this.setView}
          addToCart={this.addToCart} />;
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
