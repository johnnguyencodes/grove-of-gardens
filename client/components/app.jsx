import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';
import Carousel from './carousel';
import Footer from './footer';
import OrderConfirmation from './order-confirmation';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'catalog',
        params: {}
      },
      cart: [],
      showModal: true,
      orderConfirmationArray: []
    };
    this.setView = this.setView.bind(this);
    this.getView = this.getView.bind(this);
    this.getCartItems = this.getCartItems.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    // this.fadeIn = this.fadeIn.bind(this);
    // this.fadeOut = this.fadeOut.bind(this);
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

  // fadeIn() {
  //   this.setState(state => ({
  //     fadeOut: false
  //   }));
  // }

  // fadeOut() {
  //   this.setState(state => ({
  //     fadeOut: true
  //   }));
  // }

  showModal() {
    this.setState({ showModal: true });
  }

  hideModal() {
    this.setState({ showModal: false });
  }

  addToCart(productId) {
    fetch(`/api/cart/${productId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          cart: this.state.cart.concat(data)
        });
      })
      .catch(err => console.error('Fetch failed:', err));
  }

  removeFromCart(cartItemId) {
    var removedItem = {};
    const cart = this.state.cart;
    for (var i = 0; i < cart.length; i++) {
      if ([cart[i]].cartItemId === cartItemId) {
        removedItem.cartItemId = cart[i].cartItemId;
      }
    }
    fetch(`/api/cart/${cartItemId}`, {
      method: 'DELETE',
      body: JSON.stringify(removedItem),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          cart: this.state.cart.filter(cartItem => cartItem.cartItemId !== cartItemId)
        });
      });
  }

  placeOrder(customerInfo) {
    fetch('/api/orders/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(customerInfo)
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          cart: [],
          view: {
            name: 'orderConfirmation',
            params: {}
          }
        });
      })
      .catch(err => console.error('Fetch failed:', err));
  }

  getView() {
    switch (this.state.view.name) {
      case 'catalog':
        return ([
          <Carousel key={1}/>,
          <ProductList
            key={2}
            setView={this.setView} />
        ]);
      case 'details':
        return <ProductDetails
          productId={this.state.view.params.productId}
          setView={this.setView}
          addToCart={this.addToCart} />;
      case 'cart':
        return <CartSummary
          cartArray={this.state.cart}
          setView={this.setView}
          removeFromCart={this.removeFromCart} />;
      case 'checkout':
        return <CheckoutForm
          setView={this.setView}
          placeOrder={this.placeOrder}
          cartArray={this.state.cart} />;
      case 'orderConfirmation':
        return <OrderConfirmation
          orderConfirmationArray={this.state.orderConfirmationArray}
          orderId={this.state.view.params.orderId}
          setView={this.setView}
          getOrderconfirmation={this.getOrderConfirmation}
        />;
    }
  }

  render() {
    const modalClass = this.state.showModal ? 'modal-container' : 'modal-container d-none';
    const modalOverlayClass = this.state.showModal ? 'modal-overlay' : 'modal-overlay d-none';
    return (
      <div>
        <Header
          cartItemCount={this.state.cart.length}
          setView={this.setView} />
        <div id="content-wrap">
          {this.getView()}
          <div className={modalClass}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <div className="modal-title">
                    <h3>Welcome to Lost Levels Collectibles</h3>
                  </div>
                </div>
                <div className="modal-body text-center">
                  <p className="mb-2">
                    Lost Levels Collectibles is a PERN stack content management app that was created strictly for demonstration purposes. By clicking the button below, you accept that no purchases will be made, no payment processing will be done, and that actual personal information should not be used in checkout, such as real names, addresses, or credit card numbers.
                  </p>
                  <p className="my-2">Images and pricing obtained from Heritage Auctions. This website is not affiliated with or endorsed by Heritage Auctions or Wata Games.</p>
                </div>
                <div className="modal-footer d-flex justify-content-center">
                  <button type="button" className="btn btn-danger" onClick={this.hideModal}>I Accept</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={modalOverlayClass}></div>
        <Footer />
      </div>
    );
  }
}
