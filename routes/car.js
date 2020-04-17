const express = require('express');
const router = express.Router();

var Car = require('../models/Car');
var Booking = require('../models/Booking');

router.get('/:id',(req, res) => {
  const id = req.params.id;
  var userid = null;
  if(typeof res.locals.username === 'undefined') {
    userid = null;
  } else {
    userid = res.locals.username._id;
  }
  
  Car.find({ _id: id }, function (err, docs) {
    const carbrand = docs[0].brand;
    const carmodel = docs[0].carmodel;
    var desc = docs[0].description;
    desc = desc.split("\n");
    docs[0].description = desc;
    
    const currentDate = new Date(Date.now()).toISOString().substr(0,10).split('-').join('');
    let availability = true;
    
    Booking.find({carid : docs[0]._id}, function(err,bookings) {
      if (typeof bookings !== 'undefined' && bookings.length > 0) {
        const pickupdate = bookings[0].pickupdate.split('-').join('');
        const dropdate = bookings[0].dropdate.split('-').join('');
        if(currentDate > pickupdate && currentDate < dropdate) {
          availability = false;
        }
      }
      // Render page
      res.render('car', {
        title: carbrand + " - " + carmodel,
        car: docs[0],
        desc,
        availability
      });
    });
  });
});

module.exports = router;