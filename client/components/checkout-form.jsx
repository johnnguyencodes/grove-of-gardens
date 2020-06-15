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
}
