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
    const newCustomerInfo = {
      name: this.state.name,
      course: this.state.creditCard,
      shippingAddress: this.state.shippingAddress
    };
    this.props.onSubmit(newCustomerInfo);
    this.setState({
      name: '',
      creditCard: '',
      shippingAddress: ''
    });
  }

  render() {
    return (
      <div className="form-container col-10 offset-1">
        <form action="submit">
          <h2>My Cart</h2>
          <p>$Price</p>
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
            <textarea name="shippingAddress" className="form-control border border-secondary" id="shippingAddress" value={this.state.shippingAddress} onChange={this.handleChange.bind(this)} cols="60" rows="5"></textarea>
          </div>
          <div className="button-container">
            <button type="submit" onClick={this.handleSubmit} className="btn btn-success mr-3">Place Order</button>
          </div>
        </form>
      </div>
    );
  }
}
