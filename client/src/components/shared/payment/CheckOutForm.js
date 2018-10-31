import React, { Component } from 'react';
import {injectStripe} from 'react-stripe-elements';
import {CardElement} from 'react-stripe-elements';

class CheckOutForm extends Component {
    constructor(){
        super();
        this.state = {
            name : ""
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.stripe.createSource({type: 'card', owner: { name: 'Jenny Rosen'}});

    }

    onChange = (event) =>{
        this.setState({
            name : event.target.value
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input 
                        type="text"
                        name="name"
                        value={this.state.name}
                        onChange={this.onChange} 
                    />

                    <label>
                        Card details
                        <CardElement style={{base: {fontSize: '18px'}}} />
                    </label>

                    <button type="submit" > Confirm order</button>
                </form>
            </div>
        );
    }
}

export default injectStripe(CheckOutForm);