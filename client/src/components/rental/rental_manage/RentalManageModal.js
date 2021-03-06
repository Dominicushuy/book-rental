import React, { Component } from 'react';
import { pretifyDate } from './../../../helpers';
import Modal from 'react-responsive-modal';

class RentalManageModal extends Component {
    constructor() {
        super();
    
        this.state = {
          open: false
        }

      }

    renderBookings = (bookings) =>{
        return bookings.map( (booking, index) =>
        <React.Fragment key={index}>
            <p><span>Date:</span> {pretifyDate(booking.startAt)} - {pretifyDate(booking.endAt)}</p>
            <p><span>Guests:</span> {booking.guests}</p>
            <p><span>Total Price:</span> {booking.totalPrice} $</p>
            { index + 1 !== bookings.length && // ẩn cái cuối
            <hr></hr>
            }
        </React.Fragment>
        )
    }

    render() {
        const { bookings } = this.props

        return (
            <React.Fragment>
                <button type='button' onClick={ () => this.setState({ open: true }) } className='btn btn-bwm'>Bookings</button>
                <Modal open={this.state.open} onClose={() => this.setState({ open: false })} little classNames={{ modal: 'rental-booking-modal' }}>
                    <h4 className='modal-title title'>Made Bookings</h4>
                    <div className='modal-body bookings-inner-container'>

                        {this.renderBookings(bookings)}

                    </div>
                    <div className='modal-footer'>
                        <button type='button' onClick={ () => this.setState({ open: false }) } className='btn btn-bwm'>Cancel</button>
                    </div>
                </Modal>
            </React.Fragment>
        );
    }
}

export default RentalManageModal;