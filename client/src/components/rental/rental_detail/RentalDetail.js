import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as action from './../../../actions';

import RentalDetailInfo  from './RentailDetailInfo';
import RentalMap from './RentalMap';
import Booking from './../../booking/Booking';

import CircularProgress from '@material-ui/core/CircularProgress'; 

class RentalDetail extends Component {

    componentDidMount(){
        const id = this.props.match.params.id;
        this.props.dispatch( action.fetchRentalById( id )); 
    }

    componentWillMount(){
        this.props.dispatch( action.clearRentalDetail());
    }

    render() {
        let rental = this.props.rental.data;

        if(rental._id){
            return (
                <section id='rentalDetails'>
                    <div className='upper-section'>
                        <div className='row'>
                        <div className='col-md-6'>
                            <img src={rental.image} alt=''></img>
                        </div>
                        <div className='col-md-6'>
                            <RentalMap location={`${rental.city}, ${rental.street}`} />
                        </div>
                        </div>
                    </div>

                    <div className='details-section'>
                        <div className='row'>
                        <div className='col-md-8'>
                            <RentalDetailInfo rental={rental} /> 
                        </div>
                        <div className='col-md-4'>
                            <Booking rental = { rental } />
                        </div>
                        </div>
                    </div>
                </section>
            )
        }else{
            return (
                <CircularProgress thickness={7} style={{color:'red' , marginLeft:'45%'}} 
                />
            )
        }

    }
}

const mapStateToProps = state =>{
    return {
        rental : state.rental
    }
}

export default connect(mapStateToProps)(RentalDetail) ;