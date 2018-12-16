const Booking = require('./../models/booking');
const Rental = require('../models/rental');
const User = require('../models/user');
const Payment = require('../models/payment');
const moment = require('moment');

const { normalizeErrors } = require('../helpers/mongoose');

require('dotenv').config();
const stripe = require('stripe')("sk_test_0mUi423cAIwYtW8ywtUoCLDM");

//Contants
const CUSTOMER_SHARE = 0.8;

exports.createBooking = function( req, res ){

    const { startAt, endAt, totalPrice, guests, days, rental, paymentToken } = req.body;
    const user = res.locals.user;
  
    const booking = new Booking({ startAt, endAt, totalPrice, guests, days});

    Rental.findById(rental._id)
          .populate('bookings')
          .populate('user')
          .exec( async ( err , rentalResult) => {
              if(err) return res.status(422).send({errors: normalizeErrors(err.errors)}); //Lỗi database
              if( rentalResult.user.id === user.id ) {  //đã book rồi
                return  res.status(422).send({errors: [{title: 'Invalid User!', detail: 'Cannot create booking on your Rental!'}]});
              }
              if( isValidBooking(booking , rentalResult) ){ // chưa có người đặt

                booking.user = user;
                booking.rental = rentalResult;
                rentalResult.bookings.push( booking );

                const {payment , err } = await createPayment( booking , rentalResult.user , paymentToken );

                if(payment){
                    
                    booking.payment = payment
                    
                    
                    booking.save( (err) => {
                        if(err) return res.status(422).send({errors: normalizeErrors(err.errors)});

                        rentalResult.save();

                        //Cập nhật dữ liệu đặt vé vào model User
                        User.update( 
                            {_id : user.id},
                            { $push : { bookings : booking }  },
                            () =>{}
                        )

                        //trả dữ liệu cho FE
                        return res.json({ 
                            startAt : booking.startAt,
                            endAt : booking.endAt,
                        })
                    }) 
                }else{
                    return res.status(422).send({errors: [{title: 'Payment Error!', detail: err}]});
                }

              }else{ // đã có người đặt
                return res.status(422).send({errors: [{title: 'Invalid Booking!', detail: 'Choosen dates are already taken!'}]});
              }
        })
    
}
exports.getUserBookings = function(req, res) {
    const user = res.locals.user;
  
    Booking
      .where({user})
      .populate('rental')
      .exec((err, bookingResult) => {
  
      if (err) {
        return res.status(422).send({errors: normalizeErrors(err.errors)});
      }
  
      return res.json(bookingResult);
    });

}


function isValidBooking( proposedBooking, rental ){
    let isValid = true;
    
    if( rental.bookings && rental.bookings.length > 0 ){
        isValid = rental.bookings.every( function(booking){
            //ngày khách đề xuất
            const proposedStart = moment( proposedBooking.startAt ); 
            const proposedEnd = moment( proposedBooking.endAt );

            //ngày thực tế lấy dữ liệu từ  model Rental
            const actualStart = moment(booking.startAt);
            const actualEnd = moment(booking.endAt);

            return (( proposedStart > actualStart && proposedStart > actualEnd ) || ( proposedEnd < actualStart && proposedEnd < actualEnd ))
        });
    }

    return isValid;
}


async function createPayment( booking , toUser , token){ //toUser = rentalResult.user là chủ nhà , token = paymentToken req
    const { user } = booking;
    const tokenId = token.id || token;

    const customer = await stripe.customers.create({ 
        source : tokenId,
        email : user.email
    })

    if(customer){
        User.update( 
            {_id : user.id},
            { $set :  { stripeCustomerId : customer.id } },
            () =>{}
        )

        const payment = new Payment({
            fromUser : user,
            toUser,
            fromStripeCustomerId : customer.id,
            booking,
            tokenId : token.id,
            amount : booking.totalPrice * 100 * CUSTOMER_SHARE ,
        });

        try {
            const savedPayment = await payment.save();
            return { payment : savedPayment };

        } catch (err) {
            return { err : err.message };
        }

    }else{
        return {err : "cannot process Payment"}
    }

}