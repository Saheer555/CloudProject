var express = require('express');
var router = express.Router();

const { ensureAuthenticated } = require('../config/auth');

var Car = require('../models/Car');
var User = require('../models/User');
var Booking = require('../models/Booking');

// GET admin dashboard
router.get('/dashboard', function (req, res, next) {
    res.render('AdminDashboard', {
        title: 'WAR-Dashboard',
        layout: 'adminlayout'
    });
});

router.get('/viewusers', function (req, res, next) {
    User.find({}, (err, docs) => {
        res.render('AdminViewUsers', {
            title: 'WAR-View Users',
            layout: 'adminlayout',
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
module.exports = router;