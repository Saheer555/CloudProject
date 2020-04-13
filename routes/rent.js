const express = require('express');
const router = express.Router();

//import Authentication
const { ensureAuthenticated } = require('../config/auth');

var Car = require('../models/Car');
var User = require('../models/User');

router.post('/:id',(req, res, next) => {
    const { pickupdate, dropdate, pickuppoint, droppoint, fuelpackage } = req.body;
    console.log(pickupdate, dropdate, pickuppoint, droppoint, fuelpackage);
});

module.exports = router;