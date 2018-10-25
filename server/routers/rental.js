const express = require('express');
const router = express.Router();
const Rental = require('./../models/rental');

const UserCtrl = require('../controllers/user');
const { normalizeErrors } = require('../helpers/mongoose');


router.get('/secret', UserCtrl.authMiddleware, function(req, res) {
    res.json({"secret": true});
});

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