import React from 'react';
import CheckoutFormItem from './checkout-form-item';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      phone: '',
      email: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
      creditCardNumber: '',
      creditMonth: '',
      creditYear: '',
      creditCVV: '',
      terms: false,
      errors: {
        fullName: 'Invalid name input.',
        phone: 'Missing or invalid phone number.',
        email: 'Missing or invalid email address.',
        address1: 'Missing or invalid street address.',
        city: 'Missing or invalid city.',
        state: 'Select a state.',
        zip: 'Missing or invalid zipcode.',
        creditCardNumber: 'Credit card number must be at least 16 characters in length.',
        creditMonth: 'Select a month.',
        creditYear: 'Select a year.',
        creditCVV: 'Missing or invalid CVV.',
        terms: 'Terms are required.'
      }
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleTerms = this.handleTerms.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  handleChange(event) {
    const errorDivs = document.querySelectorAll('.error');
    for (let i = 0; i < errorDivs.length; i++) {
      if (errorDivs[i].textContent.length > 0) {
        errorDivs[i].classList = 'error d-inline text-white';
        if (i < errorDivs.length - 1) {
          errorDivs[i].previousSibling.classList = 'form-control';
        }
      }
    }
    const { name, value } = event.target;
    const errors = this.state.errors;
    const validEmailRegex =
      RegExp(/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i);

    switch (name) {
      case 'fullName':
        if (!(value.length)) {
          errors.fullName = 'Invalid name input.';
        } else if (value.length < 5) {
          errors.fullName = 'Minimum of five characters.';
        } else errors.fullName = '';
        break;
      case 'phone':
        errors.phone =
          value.length < 10
            ? 'Missing or invalid phone number.'
            : '';
        break;
      case 'email':
        errors.email =
          validEmailRegex.test(value)
            ? ''
            : 'Missing or invalid email address.';
        break;
      case 'address1':
        if (!(value.length)) {
          errors.address1 = 'Missing or invalid street address.';
        } else if (value.length < 3) {
          errors.address1 = 'Minimum of three characters.';
        } else errors.address1 = '';
        break;
      case 'city':
        if (!(value.length)) {
          errors.city = 'Missing or invalid city.';
        } else if (value.length < 3) {
          errors.city = 'Minimum of three characters.';
        } else errors.city = '';
        break;
      case 'state':
        errors.state =
          (!(value.length))
            ? 'Select a state.'
            : '';
        break;
      case 'zip':
        errors.zip =
          value.length < 5
            ? 'Missing or invalid zipcode.'
            : '';
        break;
      case 'creditCardNumber':
        errors.creditCardNumber =
          value.length < 16
            ? 'Credit card number must be at least 16 characters in length.'
            : '';
        break;
      case 'creditMonth':
        errors.creditMonth =
          !(value.length)
            ? 'Select a month.'
            : '';
        break;
      case 'creditYear':
        errors.creditYear =
          !(value.length)
            ? 'Select a year.'
            : '';
        break;
      case 'creditCVV':
        errors.creditCVV =
          !(value.length)
            ? 'Missing or invalid CVV.'
            : '';
        break;
      case 'terms':
        errors.terms =
          (value === 'true')
            ? 'Terms are required'
            : '';
        break;
      default:
        break;
    }
    this.setState({ errors, [name]: value });
  }

  handleTerms() {
    this.setState({
      terms: !this.state.terms
    });
  }

  validateForm(errors) {
    let valid = true;
    const errorDivs = document.querySelectorAll('.error');
    for (let i = 0; i < errorDivs.length; i++) {
      if (errorDivs[i].textContent.length > 0) {
        errorDivs[i].classList = 'error d-inline text-danger';
        if (i < errorDivs.length - 1) {
          errorDivs[i].previousSibling.classList = 'form-control border border-danger';
        }
      }
    }
    Object.values(errors).forEach(
      value => value.length > 0 && (valid = false)
    );
    return valid;
  }

  handleSubmit() {
    if (this.validateForm(this.state.errors)) {
      const newCustomerInfo = {
        fullName: this.state.fullName,
        phone: this.state.phone,
        email: this.state.email,
        address1: this.state.address1,
        address2: this.state.address2,
        city: this.state.city,
        state: this.state.state,
        zip: this.state.zip,
        creditCardNumber: this.state.creditCardNumber,
        creditMonth: this.state.creditMonth,
        creditYear: this.state.creditYear,
        creditCVV: this.state.creditCVV
      };
      this.props.placeOrder(newCustomerInfo);
      this.setState({
        fullName: '',
        phone: '',
        email: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
        creditCardNumber: '',
        creditMonth: '',
        creditYear: '',
        creditCVV: ''
      });

    }
  }

  render() {
    const { errors } = this.state;
    const cartArray = this.props.cartArray;
    let totalPricing = 0;
    for (var i = 0; i < cartArray.length; i++) {
      totalPricing += (cartArray[i].price * cartArray[i].quantity);
    }
    const pricingFormatter = totalPricing => (totalPricing / 100).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    return (
      <>
        <header className="form-header col-8 offset-2 p-0 mt-3">
          <p id="view" onClick={() => this.props.setView('catalog', {})}><u>Back
            to Shopping</u></p>
          <h2 className="my-3">My Cart</h2>
          <h5 className="mt-3">Order Total: ${pricingFormatter(totalPricing)}</h5>
        </header>
        <form action="submit" className="row col-8 offset-2 mt-2 p-0">
          <div className="form-container card col-8 mb-5">
            <h3 className="my-3">Billing/Shipping Address</h3>
            <div className="form-row d-flex mb-0">
              <div className="full-name-container col-12 px-1">
                <label htmlFor="fullName">Full Name</label>
                <input type="text" className="form-control" id="name" name="fullName"
                  value={this.state.fullName} onChange={this.handleChange.bind(this)} />
                <div className='error d-inline text-white'>{errors.fullName}</div>
              </div>
            </div>
            <div className="form-group d-flex mb-0">
              <div className="phone-container col-6 pl-0 pr-1">
                <label htmlFor="phone">Phone</label>
                <input type="number" onInput={this.props.numberMaxLengthCheck} maxLength="10" onKeyDown={this.props.numberInputValidation} className="form-control" id="phone" name="phone"
                  value={this.state.phone} onChange={this.handleChange.bind(this)}/>
                <div className='error d-inline text-white'>{errors.phone}</div>
              </div>
              <div className="email-container col-6 pr-0 pl-1">
                <label htmlFor="email">Email</label>
                <input type="email" className="form-control" id="email" name="email"
                  value={this.state.email} onChange={this.handleChange.bind(this)} />
                <div className='error d-inline text-white'>{errors.email}</div>
              </div>
            </div>
            <div className="form-group d-flex mb-0">
              <div className="address1-container col-6 pl-0 pr-1">
                <label htmlFor="address1">Address 1</label>
                <input type="text" className="form-control" id="address1" name="address1"
                  value={this.state.address1} onChange={this.handleChange.bind(this)} />
                <div className='error d-inline text-white'>{errors.address1}</div>
              </div>
              <div className="address2-container col-6 pr-0 pl-1">
                <label htmlFor="address2">Address 2</label>
                <input type="text" className="form-control" id="address2" name="address2"
                  value={this.state.address2} onChange={this.handleChange.bind(this)} />
              </div>
            </div>
            <div className="form-group d-flex mb-0">
              <div className="city-container col-6 pr-1 pl-0">
                <label htmlFor="city">City</label>
                <input type="text" className="form-control" id="city" name="city"
                  value={this.state.city} onChange={this.handleChange.bind(this)} />
                <div className='error d-inline text-white'>{errors.city}</div>
              </div>
              <div className="state-container col-3 px-1">
                <label htmlFor="state">State</label>
                <select name="state" id="state" className="form-control"
                  value={this.state.state} onChange={this.handleChange.bind(this)}>
                  <option hidden></option>
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="DC">District Of Columbia</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="IA">Iowa</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NY">New York</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="WA">Washington</option>
                  <option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WY">Wyoming</option>
                </select>
                <div className='error d-inline text-white'>{errors.state}</div>
              </div>
              <div className="zip-container col-3 pr-0 pl-1">
                <label htmlFor="zip">Zip</label>
                <input type="number" pattern="[0-9]" className="form-control" id="zip" name="zip"
                  value={this.state.zip} onInput={this.props.numberMaxLengthCheck} maxLength="5" onKeyDown={this.props.numberInputValidation} onChange={this.handleChange.bind(this)} />
                <div className='error d-inline text-white'>{errors.zip}</div>
              </div>
            </div>
            <h3>Payment Details</h3>
            <div className="form-group d-flex border rounded py-2 my-3">
              <div className="creditCardNumber-container col-6 pr-0">
                <label htmlFor="creditCardNumber">Credit Card</label>
                <input type="number" className="form-control" id="creditCardNumber"
                  name="creditCardNumber" pattern="[0-9]" value={this.state.creditCardNumber} onInput={this.props.numberMaxLengthCheck} maxLength="16" onKeyDown={this.props.numberInputValidation}
                  onChange={this.handleChange.bind(this)} />
                <div className='error d-inline text-white'>{errors.creditCardNumber}</div>
              </div>
              <div className="creditMonth-container col-2 pl-2 pr-1">
                <label htmlFor="creditMonth">Month</label>
                <select name="creditMonth" id="creditMonth" className="form-control"
                  value={this.state.creditMonth} onChange={this.handleChange.bind(this)}>
                  <option hidden></option>
                  <option value="01">01</option>
                  <option value="02">02</option>
                  <option value="03">03</option>
                  <option value="04">04</option>
                  <option value="05">05</option>
                  <option value="06">06</option>
                  <option value="07">07</option>
                  <option value="08">08</option>
                  <option value="09">09</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </select>
                <div className='error d-inline text-white'>{errors.creditMonth}</div>
              </div>
              <div className="creditYear-container col-2 px-1">
                <label htmlFor="creditYear">Year</label>
                <select name="creditYear" id="creditYear" className="form-control"
                  value={this.state.creditYear} onChange={this.handleChange.bind(this)}>
                  <option hidden></option>
                  <option value="2020">2020</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                  <option value="2028">2028</option>
                  <option value="2029">2029</option>
                  <option value="2030">2030</option>
                </select>
                <div className='error d-inline text-white'>{errors.creditYear}</div>
              </div>
              <div className="creditCVV-container col-2 pl-1 pr-2">
                <label htmlFor="creditCVV">CVV</label>
                <input type="number" className="form-control" id="creditCVV"
                  name="creditCVV" value={this.state.creditCVV} onInput={this.props.numberMaxLengthCheck} maxLength="3" onKeyDown={this.props.numberInputValidation}
                  onChange={this.handleChange.bind(this)} />
                <div className='error d-inline text-white'>{errors.creditCVV}</div>
              </div>
            </div>
            <footer className="checkout-form-footer form-check">
              <div className="terms-container">
                <input type="checkbox" id="terms" name="terms" className="p-0 m-0"
                  value={this.state.terms} onChange={() => { this.handleChange(event); this.handleTerms(); }} />
                <label htmlFor="terms" className="checkbox-label mb-0">
                  I accept that this website is for demonstration purposes, that
                  no payment processing will be done, and that personal information
                  such as names, addresses, or real credit card numbers should not
                  be used on submission of this form.
                </label>
                <div className='error d-inline text-white'>{errors.terms}</div>
              </div>
              <div className="d-flex justify-content-between align-content-center
              mb-3">
                <button type="submit" onClick={event => {
                  event.preventDefault();
                  this.handleSubmit();
                }} className="btn text-white p-2 my-2">Process Order</button>
              </div>
            </footer>
          </div>
          <div className="checkout-summary-container card-body bg-white col-3 ml-5 mb-5 p-0 pb-3 border border-black">
            {cartArray.map(checkoutFormItem => {
              return (
                <CheckoutFormItem
                  key={checkoutFormItem.cartItemId}
                  checkoutFormItem={checkoutFormItem}
                  cartArray={cartArray}
                />
              );
            })}
          </div>
        </form>
      </>
    );
  }
}
