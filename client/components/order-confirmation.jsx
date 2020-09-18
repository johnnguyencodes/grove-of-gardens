import React from 'react';
import OrderConfirmationItem from './order-confirmation-item';

export default class OrderConfirmation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderConfirmationArray: []
    };
    this.getOrderConfirmation = this.getOrderConfirmation.bind(this);
  }

  componentDidMount() {
    this.getOrderConfirmation();
  }

  getOrderConfirmation(orderId) {
    fetch(`api/confirmation/${this.props.orderId}`)
      .then(response => response.json())
      .then(orderConfirmationItems => {
        this.setState({
          orderConfirmationArray: orderConfirmationItems
        });
      });
  }

  render() {
    const orderConfirmationArray = this.state.orderConfirmationArray;
    if (!(orderConfirmationArray.length)) {
      return (
        <div className="col-10 offset-1 px-5">
          <p className="mt-3" id="view" onClick={() => this.props.setView('catalog', {})}><u>Back to Catalog</u></p>
          <h1 className="mt-3">Order Confirmation</h1>
          <div>
            <h3 className="my-5">No items ordered.</h3>
          </div>
        </div>
      );
    }
    let totalPricing = 0;
    for (var i = 0; i < orderConfirmationArray.length; i++) {
      totalPricing += (orderConfirmationArray[i].price * orderConfirmationArray[i].quantity);
    }
    const pricingFormatter = totalPricing => (totalPricing / 100).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    return (
      <div>
        <div className="col-8 offset-2 px-5">
          <p className="mt-3" id="view" onClick={() => this.props.setView('catalog', {})}><u>Back to Catalog</u></p>
          <h1 className="mt-3">Order Confirmation</h1>
          <p className="mt-3">Order #{this.props.orderId}</p>
        </div>
        <div className="order-confirmation-container col-8 offset-2">
          <div className="col-12 d-flex flex-column card-deck m-0">
            {orderConfirmationArray.map(orderConfirmationItem => {
              return (
                <OrderConfirmationItem
                  orderConfirmationItem={orderConfirmationItem}
                  key={orderConfirmationItem.cartItemId} />
              );
            })}
          </div>
        </div>
        <footer className="order-confirmation-footer col-12 mb-5">
          <div className="col-8 offset-2 px-5 d-flex justify-content-between align-content-center">
            <h3>Order Total: ${pricingFormatter(totalPricing)}</h3>
          </div>
        </footer>
      </div>
    );
  }
}
