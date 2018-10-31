const Payment = require('../models/payment');
const { normalizeErrors } = require('./../helpers/mongoose');

exports.getPendingPayments = function(req , res ){
    const user = res.locals.user;

    Payment
        .where({ user })
        .populate({
            path: 'booking',
            populate: { path: 'rental'}
        })
        .populate('fromUser')
        .exec( function(err , paymentResult){
            if (err) {
                return res.status(422).send({errors: normalizeErrors(err.errors)});
            }

            return res.json(paymentResult)
        })

}