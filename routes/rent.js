const express = require('express');
const router = express.Router();

//import Authentication
const { ensureAuthenticated } = require('../config/auth');

var Car = require('../models/Car');
var User = require('../models/User');
var Booking = require('../models/Booking');

router.post('/:id', ensureAuthenticated, (req, res, next) => {
    const { userid, carid, pickupdate, dropdate, pickuppoint, droppoint, fuelpackage, totalprice, diffdays, carmodel, brand, username } = req.body;
    User.find({ _id: userid }, function (err, docs) {
        if (docs[0].verified === true) {
            const newBooking = new Booking({
                userid,
                carid,
                pickupdate,
                pickuppoint,
                dropdate,
                droppoint,
                fuelpackage,
                totalprice,
                diffdays,
                carmodel,
                brand,
                username
            });  

            newBooking.save();
            req.flash('success_msg', 'Booking Placed');
            res.redirect('/car/' + carid);
        } else {
            req.flash('error_msg', 'Your license has not been verified yet.');
            res.redirect('/car/' + carid);
        }
    });
});

module.exports = router;