var express = require('express');
const multer = require('multer');
var router = express.Router();

const { ensureAuthenticated } = require('../config/auth');

var Car = require('../models/Car');
var User = require('../models/User');
var Booking = require('../models/Booking');

//Configuring multer
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

var upload = multer({ storage: storage });

// GET admin dashboard
router.get('/dashboard', function (req, res, next) {
    res.render('./admin/dashboard', {
        title: 'WAR-Dashboard',
        layout: './admin/layout'
    });
});

router.get('/viewusers', function (req, res, next) {
    User.find({}, (err, docs) => {
        res.render('./admin/viewusers', {
            title: 'WAR-View Users',
            layout: './admin/layout',
            user: docs
        });
    });
});

router.post('/verify/:id', (req, res, next) => {
    User.find({ _id: req.params.id }, (err, docs) => {
        var user = docs[0];
        user.verified = true;
        user.save();

        res.redirect('/admin/viewusers');
    });
});

router.post('/deverify/:id', (req, res, next) => {
    User.find({ _id: req.params.id }, (err, docs) => {
        var user = docs[0];
        user.verified = false;
        user.save();

        res.redirect('/admin/viewusers');
    });
});

router.get('/viewcars', function (req, res, next) {
    Car.find({}, (err, docs) => {
        res.render('./admin/viewcars', {
            title: 'WAR-View Cars',
            layout: './admin/layout',
            car: docs
        });
    });
});

router.get('/addcar', function (req, res, next) {
    res.render('./admin/addcar', {
        title: 'WAR-Add a Car',
        layout: './admin/layout'
    });
});

router.post('/addcar', upload.array('imagePath', 5), (req, res) => {
    const { brand, carmodel, carregnumber, price, description, imagePath } = req.body;
    let errors = [];

    console.log(req.body);
    console.log(brand, carmodel, carregnumber, price);
    // Check required fields
    if (!brand || !carmodel || !carregnumber || !price) {
        errors.push({ msg: 'Please fill in all fields.' });
    }

    // Check description length
    if (description.length < 20) {
        errors.push({ msg: 'Description should contain atleast 20 characters.' });
    }

    if (errors.length > 0) {
        res.render('./admin/addcar', {
            errors,
            brand,
            carmodel,
            carregnumber, 
            price, 
            description, 
            imagePath,
            title: 'WAR-Add a Car',
            layout: './admin/layout'
        });
    } else {
        // Validation Passed
        var newCar = new Car();

        const files = req.files;

        newCar.brand = brand;
        newCar.carmodel = carmodel;
        newCar.carregnumber = carregnumber;
        newCar.price = price;
        newCar.description = description;

        for (var i = 0; i < files.length; i++) {
            newCar.imagePath[i] = files[i].path.substring(6);
        }

        newCar.save();

        res.redirect('/admin/dashboard');
    }
});

router.get('/viewbookings', function (req, res, next) {
    //Not working
    Booking.find({}, (err, docs) => {
        console.log(docs);
        res.render('./admin/viewbookings', {
            booking: docs,
            title: 'WAR-View Bookings',
            layout: './admin/layout'
        });
    });
});

module.exports = router;