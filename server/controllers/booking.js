const Booking = require('./../models/booking');
const Rental = require('../models/rental');
const User = require('../models/user');

const moment = require('moment');

const { normalizeErrors } = require('../helpers/mongoose');

exports.createBooking = function( req, res ){

    const { startAt, endAt, totalPrice, guests, days, rental } = req.body;
    const user = res.locals.user;
  
    const booking = new Booking({ startAt, endAt, totalPrice, guests, days});

    Rental.findById(rental._id)
          .populate('bookings')
          .populate('user')
          .exec( ( err , rentalResult) => {
              if(err) return res.status(422).send({errors: normalizeErrors(err.errors)}); //Lỗi database
              if( rentalResult.user.id === user.id ) {  //đã book rồi
                return  res.status(422).send({errors: [{title: 'Invalid User!', detail: 'Cannot create booking on your Rental!'}]});
              }
              if( isValidBooking(booking , rentalResult) ){ // chưa có người đặt

                booking.user = user;
                booking.rental = rentalResult;
                rentalResult.bookings.push( booking );
                
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

              }else{ // đã có người đặt
                return res.status(422).send({errors: [{title: 'Invalid Booking!', detail: 'Choosen dates are already taken!'}]});
              }
        })
    
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