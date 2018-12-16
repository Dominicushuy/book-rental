import React, { Component } from 'react';
import CheckOutForm from './CheckOutForm';
import {Elements} from 'react-stripe-elements';

export class Payment extends Component {
  render() {
    return (
      <Elements>
        <CheckOutForm {...this.props} /> 
      </Elements>
    )
  }
}

export default Payment