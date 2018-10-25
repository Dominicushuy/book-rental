import React, { Component } from 'react';
import RentalCart from './RentalCart';

import { connect } from 'react-redux';
import * as action from './../../../actions';

import CircularProgress from '@material-ui/core/CircularProgress';

class RentalList extends Component {
    state = {
        loadding : true
    }

    componentDidMount(){
        this.props.dispatch(action.fetchRentals());
    }
    
    renderRentals = () =>(
        this.props.rentals.data ?
            this.props.rentals.data.map( (rental , i) =>(
                <RentalCart key={i}
                            rental = {rental}
                />
            ))
        :null    
    )

    render() {
        return (
            <div>
                <div className='container'>
                    <section id='rentalListing'>
                        <h1 className='page-title'>Your Home All Around the World</h1>
                        <div className='row'>
                            { this.renderRentals() }
                            
                        </div>
                    </section>
                </div>
                { this.state.loadding && !this.props.rentals.data ?
                    <CircularProgress thickness={7} style={{color:'red' , marginLeft:'45%'}} 
                    />
                    :null
                }
            </div>
        );
    }
}

const mapStateToProp = state =>{
    return {
        rentals : state.rentals
    }
}

export default connect(mapStateToProp)(RentalList) ;