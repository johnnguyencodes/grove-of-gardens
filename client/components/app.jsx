import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductListCategory from './product-list-category';
import ProductListSearch from './product-list-search';
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
      products: [],
      activePage: 1,
      productsPerPage: 9,
      totalItemsCount: 20,
      showDemoModal: true,
      quantityToUpdateArray: [],
      addedItem: null,
      isItemAlreadyInCart: false,
      showItemModal: false,
      searchQuery: null
    };
    this.setView = this.setView.bind(this);
    this.getView = this.getView.bind(this);
    this.getCartItems = this.getCartItems.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.showDemoModal = this.showDemoModal.bind(this);
    this.hideDemoModal = this.hideDemoModal.bind(this);
    this.showItemModal = this.showItemModal.bind(this);
    this.hideItemModal = this.hideItemModal.bind(this);
    this.cartItemCount = this.cartItemCount.bind(this);
    this.numberInputValidation = this.numberInputValidation.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.incrementCartQuantity = this.incrementCartQuantity.bind(this);
    this.decrementCartQuantity = this.decrementCartQuantity.bind(this);
    this.numberMaxLengthCheck = this.numberMaxLengthCheck.bind(this);
    this.getQuantityToUpdate = this.getQuantityToUpdate.bind(this);
    this.updateCartItemQuantity = this.updateCartItemQuantity.bind(this);
    this.handleSearchQueryChange = this.handleSearchQueryChange.bind(this);
    this.onEnter = this.onEnter.bind(this);
    this.searchProducts = this.searchProducts.bind(this);
    this.getProducts = this.getProducts.bind(this);
    this.getCategory = this.getCategory.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
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
    this.getQuantityToUpdate();
  }

  showDemoModal() {
    this.setState({ showDemoModal: true });
  }

  hideDemoModal() {
    this.setState({ showDemoModal: false });
  }

  showItemModal() {
    this.setState({ showItemModal: true });
  }

  hideItemModal() {
    this.setState({ showItemModal: false });
  }

  addToCart(productId, quantity) {
    const itemQuantity = {
      quantity: quantity
    };
    fetch(`/api/cart/${productId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(itemQuantity)
    })
      .then(response => response.json())
      .then(data => {
        const cartIndex = this.state.cart.findIndex(cartItem => cartItem.cartItemId === data[0].cartItemId);
        if (cartIndex === -1) {
          this.setState({
            cart: this.state.cart.concat(data),
            addedItem: data,
            isItemAlreadyInCart: false
          });
          this.setState({
            quantityToUpdateArray: this.state.quantityToUpdateArray.concat({
              cartItemId: data[0].cartItemId,
              quantity: data[0].quantity
            })
          });
        } else {
          const cartCopy = this.state.cart;
          cartCopy[cartIndex].quantity = data[0].quantity;
          this.setState({
            cart: cartCopy,
            addedItem: data,
            isItemAlreadyInCart: true
          });
          const quantityCopy = this.state.quantityToUpdateArray;
          quantityCopy[cartIndex].cartItemId = data[0].cartItemId;
          quantityCopy[cartIndex].quantity = data[0].quantity;
          this.setState({
            quantityToUpdateArray: quantityCopy
          });
        }
        this.showItemModal();
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
          cart: this.state.cart.filter(cartItem => cartItem.cartItemId !== cartItemId),
          quantityToUpdateArray: this.state.quantityToUpdateArray.filter(cartItem => cartItem.cartItemId !== cartItemId)
        });
      });
  }

  cartItemCount() {
    let cartItemCount = 0;
    this.state.cart.forEach(function (cartItem) {
      cartItemCount += cartItem.quantity;
    });
    return cartItemCount;
  }

  searchProducts() {
    const search = {
      searchQuery: this.state.searchQuery
    };
    fetch('api/search/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(search)
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

  handleSearchQueryChange(event) {
    const searchQuery = event.target.value;
    this.setState({
      searchQuery: searchQuery
    });
  }

  onEnter(event) {
    if (event.keyCode === 13) {
      this.setView('search', {});
    }
  }

  getProducts() {
    fetch('api/products')
      .then(response => response.json())
      .then(productsData => {
        this.setState({
          products: productsData,
          totalItemsCount: productsData.length,
          view: {
            name: 'catalog',
            params: {}
          }
        });
      })
      .catch(err => console.error('Fetch failed:', err));
  }

  getCategory() {
    fetch(`api/category/${this.state.view.params.category}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
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

  numberInputValidation(event) {
    if ([69, 109, 107, 110].includes(event.keyCode)) {
      event.preventDefault();
    }
  }

  handleQuantityChange(index) {
    const quantity = event.target.value;
    const quantityToUpdateCopy = this.state.quantityToUpdateArray;
    quantityToUpdateCopy[index].quantity = quantity;
    this.setState({
      quantityToUpdateArray: quantityToUpdateCopy
    });
  }

  incrementCartQuantity(index) {
    const quantityToUpdateCopy = this.state.quantityToUpdateArray;
    const quantity = quantityToUpdateCopy[index].quantity + 1;
    quantityToUpdateCopy[index].quantity = quantity;
    this.setState({
      quantityToUpdateArray: quantityToUpdateCopy
    });
  }

  decrementCartQuantity(index) {
    if (this.state.quantityToUpdateArray[index].quantity === 0) {
      return;
    }
    const quantityToUpdateCopy = this.state.quantityToUpdateArray;
    const quantity = quantityToUpdateCopy[index].quantity - 1;
    quantityToUpdateCopy[index].quantity = quantity;
    this.setState({
      quantityToUpdateArray: quantityToUpdateCopy
    });
  }

  numberMaxLengthCheck(object) {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(0, object.target.maxLength);
    }
  }

  getQuantityToUpdate() {
    fetch('/api/quantity')
      .then(response => response.json())
      .then(cartItemsQuantity => {
        this.setState({
          quantityToUpdateArray: cartItemsQuantity
        });
      });
  }

  updateCartItemQuantity(cartItemId, quantity) {
    const itemQuantity = {
      quantity: quantity
    };
    if (parseInt(quantity) > 0) {
      fetch(`/api/update/${cartItemId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(itemQuantity)
      })
        .then(response => response.json())
        .then(data => {
          const cartIndex = this.state.cart.findIndex(cartItem => cartItem.cartItemId === data[0].cartItemId);
          const cartCopy = this.state.cart;
          cartCopy[cartIndex].quantity = data[0].quantity;
          this.setState({
            cart: cartCopy
          });
          const quantityCopy = this.state.quantityToUpdateArray;
          quantityCopy[cartIndex].cartItemId = data[0].cartItemId;
          quantityCopy[cartIndex].quantity = data[0].quantity;
          this.setState({
            quantityToUpdateArray: quantityCopy
          });
        })
        .catch(err => console.error('Fetch Failed:', err));
    } else if (parseInt(quantity) <= 0) {
      this.removeFromCart(cartItemId);
    }
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
            params: { orderId: data.orderId }
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
            setView={this.setView}
            getProducts={this.getProducts}
            handlePageChange={this.handlePageChange}
            products={this.state.products}
            activePage={this.state.activePage}
            productsPerPage={this.state.productsPerPage}
            totalItemsCount={this.state.totalItemsCount}
          />
        ]);
      case 'category':
        return ([
          <ProductListCategory
            key={2}
            category={this.state.view.params.category}
            setView={this.setView}
            getCategory={this.getCategory}
            handlePageChange={this.handlePageChange}
            products={this.state.products}
            activePage={this.state.activePage}
            productsPerPage={this.state.productsPerPage}
            totalItemsCount={this.state.totalItemsCount}
          />
        ]);
      case 'search':
        return ([
          <ProductListSearch
            key={2}
            setView={this.setView}
            searchProducts={this.searchProducts}
            searchQuery={this.state.searchQuery}
            handlePageChange={this.handlePageChange}
            products={this.state.products}
            activePage={this.state.activePage}
            productsPerPage={this.state.productsPerPage}
            totalItemsCount={this.state.totalItemsCount}
          />
        ]);
      case 'details':
        return <ProductDetails
          productId={this.state.view.params.productId}
          setView={this.setView}
          addToCart={this.addToCart}
          addedItem={this.state.addedItem}
          showItemModal={this.state.showItemModal}
          hideItemModal={this.hideItemModal}
          isItemAlreadyInCart={this.state.isItemAlreadyInCart}
          numberInputValidation={this.numberInputValidation}
          numberMaxLengthCheck={this.numberMaxLengthCheck}
        />;
      case 'cart':
        return <CartSummary
          cartArray={this.state.cart}
          quantityToUpdateArray={this.state.quantityToUpdateArray}
          setView={this.setView}
          removeFromCart={this.removeFromCart}
          numberInputValidation={this.numberInputValidation}
          handleQuantityChange={this.handleQuantityChange}
          incrementCartQuantity={this.incrementCartQuantity}
          decrementCartQuantity={this.decrementCartQuantity}
          numberMaxLengthCheck={this.numberMaxLengthCheck}
          updateCartItemQuantity={this.updateCartItemQuantity}
        />;
      case 'checkout':
        return <CheckoutForm
          setView={this.setView}
          placeOrder={this.placeOrder}
          cartArray={this.state.cart}
          numberInputValidation={this.numberInputValidation}
          numberMaxLengthCheck={this.numberMaxLengthCheck} />;
      case 'orderConfirmation':
        return <OrderConfirmation
          orderConfirmationArray={this.state.orderConfirmationArray}
          orderId={this.state.view.params.orderId}
          setView={this.setView}
          getOrderConfirmation={this.getOrderConfirmation}
        />;
    }
  }

  render() {
    const modalDemoClass = this.state.showDemoModal ? 'modal-container' : 'modal-container d-none';
    const modalDemoOverlayClass = this.state.showDemoModal ? 'modal-overlay' : 'modal-overlay d-none';
    return (
      <div>
        <Header
          cartItemCount={this.cartItemCount()}
          setView={this.setView}
          handleSearchQueryChange={this.handleSearchQueryChange}
          onEnter={this.onEnter}
          searchProducts={this.searchProducts}
          getCategory={this.getCategory}
          getProducts={this.getProducts}
          searchQuery={this.state.searchQuery}
        />
        <div id="content-wrap">
          {this.getView()}
          <div className={modalDemoClass}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h3 className="modal-title text-center w-100">Welcome to The Grove of Gardens</h3>
                </div>
                <div className="modal-body text-center">
                  <p className="mb-2">
                    The Grove of Gardens is a PERN stack e-commerce shopping app that was created strictly for demonstration purposes. By clicking the button below, you accept that no purchases will be made, no payment processing will be done, and that actual personal information should not be used in checkout, such as real names, addresses, or credit card numbers.
                  </p>
                  <p className="my-2">Images, descriptions, and pricing obtained from <a href="https://succulentsbox.com">Succulents Box</a>. This website is not affiliated with or endorsed by Succulents Box.</p>
                </div>
                <div className="modal-footer d-flex justify-content-center">
                  <button type="button" className="btn text-white" onClick={this.hideDemoModal}>I Accept</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={modalDemoOverlayClass}></div>
        <Footer />
      </div>
    );
  }
}
