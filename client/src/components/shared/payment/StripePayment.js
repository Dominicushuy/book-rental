import React, { Component } from 'react';
import { Elements } from 'react-stripe-elements';
import CheckOutForm from './CheckOutForm'

class StripePayment extends Component {

    render() {
        return (
            <Elements>
               <CheckOutForm />
            </Elements>
        );
    }
}

export default StripePayment;