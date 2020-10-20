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
    const fullName = orderConfirmationArray[0].fullName.split(' ');
    let totalPricing = 0;
    for (var i = 0; i < orderConfirmationArray.length; i++) {
      totalPricing += (orderConfirmationArray[i].price * orderConfirmationArray[i].quantity);
    }
    const pricingFormatter = totalPricing => (totalPricing / 100).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    return (
      <div>
        <div className="col-xl-10 offset-xl-1 col-lg-10 offset-lg-1 col-md-12 col-sm-12 col-12 px-5">
          <p className="mt-3" id="view" onClick={() => this.props.setView('catalog', {})}><u>Back to Catalog</u></p>
          <p className="mt-3">Order #{this.props.orderId}, created at {orderConfirmationArray[0].createdAt.substr(0, 10)}</p>
          <h3 className="mt-3 font-weight-bold">Thank you {fullName[0]}!</h3>
        </div>
        <div className="order-confirmation-container row col-xl-10 offset-xl-1 col-lg-10 offset-lg-1 col-md-12 col-sm-12 col-12 pl-5">
          <div className="card col-12 my-4 mx-0 p-0">
            <div className="card-body m-0 p-0">
              {orderConfirmationArray.map(orderConfirmationItem => {
                return (
                  <OrderConfirmationItem
                    orderConfirmationItem={orderConfirmationItem}
                    key={orderConfirmationItem.cartItemId} />
                );
              })}
            </div>
            <footer className="order-confirmation-footer row">
              <div className="col-sm-6 offset-sm-4 col-12 d-flex justify-content-between align-content-center mb-3">
                <h4 className="ml-sm-2 ml-4 pl-1">Order Total: ${pricingFormatter(totalPricing)}</h4>
              </div>
            </footer>
          </div>
        </div>
      </div>
    );
  }
}
