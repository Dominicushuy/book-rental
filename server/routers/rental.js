const express = require('express');
const router = express.Router();
const Rental = require('./../models/rental');
const User = require('./../models/user');

const UserCtrl = require('../controllers/user');
const { normalizeErrors } = require('../helpers/mongoose');


router.get('/secret', UserCtrl.authMiddleware, function(req, res) {
    res.json({"secret": true});
});

router.get('/manage', UserCtrl.authMiddleware , function(req, res){
  const user = res.locals.user;

  Rental
    .where({user})
    .populate('bookings')
    .exec(function(err, rentalResult) {
      if (err) {
        return res.status(422).send({errors: normalizeErrors(err.errors)});
      }

      return res.json(rentalResult);
    });

})

router.get( '/:id', function(req, res){
    const id = req.params.id;

    Rental.findById( id )
          .populate('user',"username ") 
          .populate('bookings', "startAt endAt -_id")
          .exec( (err, rentalResult) =>{
            if(err) return res.status(400).send( {err: { title :'Rentail Error', detail:'could not find Retail' } } );
            return res.json( rentalResult );
          })

})

//Tạo mới rental
router.post( '', UserCtrl.authMiddleware , function(req , res ){
  const { title, city, street, category, image, shared, bedrooms, description, dailyRate } = req.body;
  const user = res.locals.user;
  
  const rental = new Rental( {title, city, street, category, image, shared, bedrooms, description, dailyRate} );
  rental.user = user;

  //Tạo database
  Rental.create( rental , function(err, newRental){
    if (err) return res.status(422).send({errors: normalizeErrors(err.errors)});

    //Cập nhập rental vào Schema User
    User.update( { _id : user.id }, { $push : { rentals : newRental } }, () =>{} );

    return res.json({newRental});

  })

})

//Delete Rental
router.delete('/:id', UserCtrl.authMiddleware ,function(req , res){
  const user = res.locals.user;

  Rental.findById(req.params.id)
        .populate('user', '_id')
        .populate({
          path:'bookings',
          match: { startAt: { $gt: new Date()}}
        })
        .exec( function(err, rentalResult){
          if (err) {
            return res.status(422).send({errors: normalizeErrors(err.errors)});
          }

          if (user.id !== rentalResult.user.id) { //không phải chủ sở hữu
            return res.status(422).send({errors: [{title: 'Invalid User!', detail: 'You are not rental owner!'}]});
          }

          if (rentalResult.bookings.length > 0) {
            return res.status(422).send({errors: [{title: 'Active Bookings!', detail: 'Cannot delete rental with active bookings!'}]});
          }

          rentalResult.remove( function(err){
            if(err){
              return res.status(422).send({errors: normalizeErrors(err.errors)});
            }

            return res.json({ "status" : 'deleted' });
          });

        })

})

//Edit Rental
//Find => Set => Save
router.patch('/:id', UserCtrl.authMiddleware, function(req, res) {

  const rentalData = req.body;
  const user = res.locals.user;

  Rental
    .findById(req.params.id)
    .populate('user')
    .exec(function(err, foundRental) {

      if (err) {
        return res.status(422).send({errors: normalizeErrors(err.errors)});
      }

      if (foundRental.user.id !== user.id) {
        return res.status(422).send({errors: [{title: 'Invalid User!', detail: 'You are not rental owner!'}]});
      }

      foundRental.set(rentalData);
      foundRental.save(function(err) {
        if (err) {
          return res.status(422).send({errors: normalizeErrors(err.errors)});
        }

        return res.status(200).send(foundRental);
      });
    });
});



router.get('', function(req,res){  //filter city with query
  const city = req.query.city;
  const query = city ? { city: city.toLowerCase() } :{};

  Rental.find(query)
        .select( '-bookings')
        .exec( (err, rentalResult ) => {
            if(err) return res.status(422).send({errors: normalizeErrors(err.errors)});
            if(city && rentalResult.length === 0){
              return res.status(422).send({errors: [{title: 'No Rentals Found!', detail: `There are no rentals for city ${city}`}]});
            }

            return res.json(rentalResult);
        })
  
})

module.exports = router