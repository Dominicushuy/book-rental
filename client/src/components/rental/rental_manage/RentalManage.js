import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import RentalManageCard from './RentalManageCard';
import RentalManageModal from './RentalManageModal';

import { Link } from 'react-router-dom';

import * as actions from './../../../actions';

import CircularProgress from '@material-ui/core/CircularProgress';

class RentalManage extends Component {
    constructor(){
        super()
        this.state = {
            userRentals : [],
            errors : [],
            isFetching: false
        }
    }

    componentWillMount(){
        this.setState({ isFetching : true });
        actions.getUserRentals().then(
            userRentals => this.setState({ userRentals, isFetching:false }),
            errors => this.setState({ errors })
        )
    }

    renderRentalCards = (userRentals) =>{
        const { isFetching } = this.state;
        if(isFetching){
            return (<CircularProgress thickness={7} style={{color:'red' , marginLeft:'45%'}} />)
        }

        return userRentals.map( (rental,index) =>
            <RentalManageCard key={index}
                modal={ <RentalManageModal bookings={rental.bookings} /> }
                rental={rental}
                rentalIndex={index}
                deleteRental={this.deleteRental}
            />     
        )
    }

    deleteRental = (id, index) =>{
        actions.deleteRental( id ).then(
            () => this.deleteRentalFromList(index),
            errors => toast.error(errors[0].detail)

        )
    }

    deleteRentalFromList = (index) =>{
        const userRentals = this.state.userRentals.slice();
        userRentals.splice( index, 1 );
        this.setState({ userRentals });
    }

    render() {
        const { userRentals , isFetching } = this.state;

        return (
            <section id='userRentals'>
                <ToastContainer />
                <h1 className='page-title'>My Rentals</h1>
                <div className='row'>
                    {this.renderRentalCards(userRentals)}
                </div>
                { !isFetching && userRentals.length === 0 &&
                <div className='alert alert-warning'>
                    You dont have any rentals currenty created. If you want advertised your property
                    please follow this link.
                    <Link style={{'marginLeft': '10px'}} className='btn btn-bwm' to='/rentals/new'>Register Rental</Link>
                </div>
                }
            </section>
        );
    }
}

export default RentalManage;