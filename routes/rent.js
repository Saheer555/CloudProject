const express = require('express');
const router = express.Router();

//import Authentication
const { ensureAuthenticated } = require('../config/auth');

var Car = require('../models/Car');
var User = require('../models/User');
var Booking = require('../models/Booking');

router.post('/:id', ensureAuthenticated, (req, res, next) => {
    const { userid, carid, pickupdate, dropdate, pickuppoint, droppoint, fuelpackage, totalprice } = req.body;
    console.log(req.body);

    const newBooking = new Booking({
        userid,
        carid,
        pickupdate,
        pickuppoint,
        dropdate,
        droppoint,
        fuelpackage,
        totalprice
    });

    newBooking.save();
    res.redirect('/car/' + carid);

});

module.exports = router;