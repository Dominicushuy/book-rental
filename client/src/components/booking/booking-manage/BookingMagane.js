import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import CircularProgress from '@material-ui/core/CircularProgress';
import BookingCard from './BookingCard';

import { connect } from 'react-redux';
import * as actions from './../../../actions';


class BookingManage extends Component {
    constructor(){
        super()
        this.state = {
            isLoading : false
        }
    }

    componentWillMount(){
        this.props.dispatch( actions.fetchUserBookings() );
    }

    renderBookings = (bookings) =>{
        return bookings.map( (booking, index) => <BookingCard key={index} booking={booking} />   )
    }

    render() {
        const { data:bookings, isFetching } = this.props.userBookings;

        if( bookings.length === 0 ){
            return ( <CircularProgress thickness={7} style={{color:'red' , marginLeft:'45%'}} /> )
        }
        
        return (
            <section id="userBookings">
                <h1 className="page-title">My Bookings</h1>
                <div className="row">
                { this.renderBookings(bookings) }
                </div>
                { !isFetching && bookings.length === 0 &&
                <div className="alert alert-warning">
                    You have no bookings created go to rentals section and book your place today.
                    <Link style={{'marginLeft': '10px'}} className="btn btn-bwm" to="/rentals">Available Rental</Link>
                </div>
                }
            </section>
        );
    }
}

const mapStateToProps = state =>{
    return {
        userBookings : state.userBookings
    }
}

export default connect(mapStateToProps)(BookingManage)  ;