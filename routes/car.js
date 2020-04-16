const express = require('express');
const multer = require('multer');
const router = express.Router();

//import Authentication
const { ensureAuthenticated } = require('../config/auth');

var Car = require('../models/Car');
var User = require('../models/User');

//Configuring multer
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
      console.log(file.mimetype);
  }
});

var upload = multer({ storage: storage });

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

    // Render page
    res.render('car', {
      title: carbrand + " - " + carmodel,
      brand: carbrand,
      carmodel: carmodel,
      car: docs[0],
      desc
    });
  });
});

module.exports = router;