import React from 'react';
import { Link } from 'react-router-dom';
import { toUpperCase , pretifyDate } from './../../../helpers';

export default function PaymentCard(props) {
  const { booking, payment , paymentBtns} = props;
  return (
    <div className="col-md-4">
        <div className="card text-center">
            <div className="card-header">
                Booking Made by { payment.fromUser.username }
            </div>
            <div className="card-block">
            { booking.rental &&
                <div>
                <h3 className="card-title"> {booking.rental.title} </h3>
                <h4 style={{fontSize:"15px"}} > {toUpperCase(booking.rental.city)}</h4>
                <p className="card-text booking-desc">{booking.rental.description}</p>
                </div>
            }
            <p className="card-text booking-days">{pretifyDate(booking.startAt)} - {pretifyDate(booking.endAt)} | {booking.days} days</p>
            <p className="card-text booking-price"><span>Price: </span> <span className="booking-price-value">{payment.amount / 100} $</span></p>
            <p className="card-text payment-status" > status: {payment.status} </p>
            { booking.rental &&
                <Link className="btn btn-bwm" to={`/rentals/${booking.rental._id}`}>Go to Rental</Link>
            }
            </div>
            <div className="card-footer text-muted">
                Created {pretifyDate(booking.createdAt)}
                {paymentBtns && paymentBtns(payment)}
            </div>
        </div>
    </div>
  )
}
