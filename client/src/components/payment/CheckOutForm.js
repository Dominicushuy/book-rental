import React, { Component } from 'react';
import { injectStripe, CardElement } from 'react-stripe-elements';
import { formStyles, createOptions, paragraphStyles, buttonStyles } from './styles';


export class CheckOutForm extends Component {
    state = {
        error:undefined
    }

    handleSubmit = (event) =>{
        event.preventDefault();
        const { stripe , setPaymentToken} = this.props;
        if(stripe){
            stripe.createToken()
                  .then( payload => {
                      if(payload.error){
                          setPaymentToken(undefined)
                          this.setState({ error : payload.error.message })
                      }
                      setPaymentToken(payload.token.id);
                  })
        }else{
            console.error("Stripe.js hasn't loaded yet !!!")
        }
    }

    render() {
        const { error } = this.state
        return (
            <form {...formStyles()} onSubmit={this.handleSubmit} >
                <CardElement {...createOptions()} />
                <p {...paragraphStyles()} >*You will be not charget yet.</p>
                { error && <div className="alert alert-danger" > { error } </div> }
                <button {...buttonStyles()} className="btn btn-success" > Confirm Payment </button>
            </form>
        )
    }
}

export default injectStripe(CheckOutForm)
