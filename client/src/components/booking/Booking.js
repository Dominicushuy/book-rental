import React, { Component } from 'react';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import * as moment from 'moment';

// import { ToastContainer , toast } from 'react-toastify';
import swal from 'sweetalert2';

import { getRangeOfDates } from './../../helpers';
import BookingModal from './BookingModal';
import Payment from './../payment/Payment';

import { connect } from 'react-redux';
import * as actions from './../../actions';

import { Link } from 'react-router-dom';


class Booking extends Component {
    constructor() {
        super();
        this.bookedOutDates = [];
        // this.dateRef = React.createRef();

        this.state = {
            dayPicker:"",
            proposedBooking: {
                startAt: '',
                endAt: '',
                guests: '',
                paymentToken:""
            },
            modal: {
                open: false
            },
            errors: []
        }
    }

    componentWillMount(){
        this.getBookedOutDates()
    }

    getBookedOutDates(){
        const { bookings } = this.props.rental;

        if(bookings && bookings.length > 0){
            bookings.forEach( booking => {
                const dateRange = getRangeOfDates(booking.startAt, booking.endAt, 'Y/MM/DD') ; //tạo array những ngày đặt
                this.bookedOutDates.push(...dateRange);
            })
        }
    }

    checkInvalidDates = (date) =>{
        return this.bookedOutDates.includes(date.format('Y/MM/DD')) || date.diff(moment(), 'days') < 0;
    }

    handleApply = ( event , picker ) =>{
        const startAt = picker.startDate.format('Y/MM/DD');
        const endAt = picker.endDate.format('Y/MM/DD');

        this.setState({
            dayPicker:startAt + ' to ' + endAt,
            proposedBooking : {
                ...this.state.proposedBooking,
                startAt, endAt
            }
        });
    }

    selectGuests = (event) =>{
        this.setState({
            proposedBooking : {
                ...this.state.proposedBooking,
                guests : parseInt( event.target.value ,10)
            }
        })
    }

    confirmProposedData = () =>{
        const { startAt, endAt } = this.state.proposedBooking;
        const days = getRangeOfDates(startAt , endAt ).length - 1;
        const { rental } = this.props

        this.setState({
            proposedBooking : {
                ...this.state.proposedBooking,
                days,
                totalPrice : days * rental.dailyRate,
                rental
            },
            modal : {
                open : true
            }
        });
    }

    cancelConfirmation = () =>{
        this.setState({
            modal: {
              open: false
            }
        })
    }

    reserveRental = () =>{
        actions.createBooking( this.state.proposedBooking ).then(
            (booking) =>{
                this.addNewBookedOutDates(booking);
                this.resetData();
                this.cancelConfirmation();

                // toast.success('Booking has been succesfuly created! Enjoy.');

                swal({
                    position: 'center',
                    type: 'success',
                    title: 'Booking has been succesfuly created! Enjoy.',
                    showConfirmButton: false,
                    timer: 1500
                })

            },
            (errors) =>{
                this.setState({ errors })
            }
        )
    }

    addNewBookedOutDates = (booking) =>{
        const dateRange = getRangeOfDates(booking.startAt , booking.endAt );
        this.bookedOutDates.push(...dateRange);
    }

    resetData = () =>{
        
        this.setState({
            dayPicker:"",
            proposedBooking : { guests : '' }
        })
    }

    onChange = (event) =>{
        this.setState({
            dayPicker : [event.target.value]
        })
    }

    setPaymentToken = (paymentToken) =>{
        const { proposedBooking } = this.state;
        proposedBooking.paymentToken = paymentToken;
        this.setState({ proposedBooking})
    }

    render() {
        const { rental } = this.props;
        const { startAt, endAt, guests , paymentToken } = this.state.proposedBooking;
        const isAuth = localStorage.getItem('auth_token');
        return (
            <div className='booking'>
                {/* <ToastContainer /> */}
                <h3 className='booking-price'>$ {rental.dailyRate} <span className='booking-per-night'>per night</span></h3>
                <hr></hr>
                { !isAuth &&
                <Link className='btn btn-bwm btn-confirm btn-block' to={{pathname: '/login'}}>
                    Login to book place.
                </Link>
                }
                { isAuth &&
                    <React.Fragment>
                        <div className='form-group'>
                        <label htmlFor='dates'>Dates</label>
                        <DateRangePicker onApply={this.handleApply}
                                        isInvalidDate={this.checkInvalidDates}
                                        opens='left'
                                        containerStyles={{display: 'block'}}>
                            <input
                                onChange={ this.onChange }  
                                name="dayPicker"
                                value={this.state.dayPicker}
                                id='dates' 
                                type='text' 
                                className='form-control'
                            >
                            </input>
                        </DateRangePicker>
                        </div>
                        <div className='form-group'>
                        <label htmlFor='guests'>Guests</label>
                        <input onChange={(event) => { this.selectGuests(event)}}
                                value={guests}
                                type='number'
                                className='form-control'
                                id='guests'
                                aria-describedby='guests'
                                placeholder=''>
                        </input>
                        </div>
                        <button 
                            disabled={!startAt || !endAt || !guests} onClick={() => this.confirmProposedData()} 
                            className='btn btn-bwm btn-confirm btn-block'
                        >
                            Reserve place now
                        </button>
                    </React.Fragment>
                }
                <hr></hr>
                <p className='booking-note-title'>People are interested into this house</p>
                <p className='booking-note-text'>
                    More than 500 people checked this rental in last month.
                </p>

                <BookingModal 
                    open = { this.state.modal.open }
                    booking = { this.state.proposedBooking }
                    errors = { this.state.errors }
                    rentalPrice = { rental.dailyRate }
                    closeModal={this.cancelConfirmation}
                    confirmModal={this.reserveRental}
                    disabled={!paymentToken}
                    acceptPayment={ () => <Payment setPaymentToken={this.setPaymentToken} /> }
                />
            </div>
        );
    }
}
const  mapStateToProps = state => {
    return {
      auth: state.auth
    }
  }
  
export default connect(mapStateToProps)(Booking)