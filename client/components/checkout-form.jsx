import React from 'react';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      creditCard: '',
      shippingAddress: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const change = {};
    change[event.target.name] = event.target.value;
    this.setState(change);
  }

  handleSubmit(event) {
    event.preventDefault();
    const newCustomerInfo = {
      name: this.state.name,
      creditCard: this.state.creditCard,
      shippingAddress: this.state.shippingAddress
    };
    this.props.placeOrder(newCustomerInfo);
    this.setState({
      name: '',
      creditCard: '',
      shippingAddress: ''
    });
  }

  render() {
    const cartArray = this.props.cartArray;
    let totalPricing = 0;
    for (var i = 0; i < cartArray.length; i++) {
      totalPricing += cartArray[i].price;
    }
    const pricingFormatter = totalPricing => (totalPricing / 100).toFixed(2);
    return (
      <div className="form-container col-10 offset-1">
        <form action="submit">
          <h2 className="mt-3 mb-3">My Cart</h2>
          <h5>Item Total: ${pricingFormatter(totalPricing)}</h5>
          <div className="name-container">
            <label htmlFor="name">Name</label>
            <input type="name" className="form-control border border-secondary" id="name" name="name" value={this.state.name} onChange={this.handleChange.bind(this)}/>
          </div>
          <div className="creditCard-container">
            <label htmlFor="creditCard">Credit Card</label>
            <input type="creditCard" className="form-control border border-secondary" id="creditCard" name="creditCard" value={this.state.creditCard} onChange={this.handleChange.bind(this)} />
          </div>
          <div className="shippingAddress-container">
            <label htmlFor="shippingAddress">Shipping Address</label>
            <textarea name="shippingAddress" className="form-control border border-secondary mb-5" id="shippingAddress" value={this.state.shippingAddress} onChange={this.handleChange.bind(this)} cols="60" rows="5"></textarea>
          </div>

          <footer className="checkout-form-footer">
            <div className="d-flex justify-content-between align-content-center">
              <p id="view" onClick={() => this.props.setView('catalog', {})}><u>Back to Shopping</u></p>
              <button type="submit" onClick={this.handleSubmit} className="btn btn-success py-0">Place Order</button>
            </div>
          </footer>
        </form>
      </div>
    );
  }
}
