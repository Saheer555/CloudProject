var express = require('express');
const multer = require('multer');
var router = express.Router();
var cloudinary = require('cloudinary').v2;
const keys = require('../config/keys');
const sleep = require('system-sleep');

const { ensureAuthenticated } = require('../config/auth');

var Car = require('../models/Car');
var User = require('../models/User');
var Booking = require('../models/Booking');

// Configure cloudinary
cloudinary.config({
    cloud_name: keys.cloud_name,
    api_key: keys.api_key,
    api_secret: keys.api_secret
});

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

router.post('/modifycar/:id', function (req, res, next) {
    const { brand, carmodel, carregnumber, price } = req.body;

    Car.find({ _id: req.params.id }, (err, docs) => {

        if(carregnumber.length != 13) {
            req.flash('error_msg', 'Please enter a valid registration number.');
            res.redirect('/admin/viewcars');
            return;
        }

        var car = docs[0];
        car.brand = brand;
        car.carmodel = carmodel;
        car.carregnumber = carregnumber;
        car.price = price;

        car.save();

        req.flash('success_msg', 'Car details modified!');
        res.redirect('/admin/viewcars');
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

        const arrurl = [];

        for(var i=0; i<files.length; i++) {
            console.log(i);
            cloudinary.uploader.upload(files[i].path, (err, result) => {
                arrurl[--i] = result.url;
                console.log(`Array url ${i}: `, arrurl[i]);
            });
        }
        
        sleep(10000);

        newCar.brand = brand;
        newCar.carmodel = carmodel;
        newCar.carregnumber = carregnumber;
        newCar.price = price;
        newCar.description = description;

        for(var i=0; i<arrurl.length; i++) {
            newCar.imagePath[i] = arrurl[i];
        }

        console.log(newCar);

        newCar.save();

        res.redirect('/admin/dashboard');
    }
});

router.get('/viewbookings', function (req, res, next) {
    //Not working
    Booking.find({}, (err, docs) => {
        res.render('./admin/viewbookings', {
            booking: docs,
            title: 'WAR-View Bookings',
            layout: './admin/layout'
        });
    });
});

router.post('/deletebooking/:id', function (req, res, next) {
    Booking.remove({ _id: req.params.id }, (err, docs) => {
        res.redirect('/admin/viewbookings');
    });
});

module.exports = router;