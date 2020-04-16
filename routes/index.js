var express = require('express');
var router = express.Router();

const { ensureAuthenticated } = require('../config/auth');

var Car = require('../models/Car');
var User = require('../models/User');
var Booking = require('../models/Booking');

// GET home page
router.get('/', (req, res) => {
  Car.find((err, docs) => {
    res.render('index', { title: 'Index Page', layout: 'userlayout', cars: docs });
  });
});

// GET admin dashboard
router.get('/admin/dashboard', function (req, res, next) {
  res.render('AdminDashboard', { title: 'WAR-Dashboard', layout: 'adminlayout' });
});
router.get('/admin/viewusers', function (req, res, next) {
  res.render('AdminViewUsers', { title: 'WAR-View Users', layout: 'adminlayout' });
});

// GET user dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => {
  const userid = req.user._id;
  Booking.find({ userid: userid }, function (err, docs) {
      if (typeof docs !== 'undefined' && docs.length > 0) {

          res.render('dashboard', {
              title: 'Dashboard',
              booking: docs,
              userid: req.user._id,
              name: req.user.name,
              email: req.user.email
          });
      } else {
          res.render('dashboard', {
              title: 'Dashboard',
              booking: docs,
              userid: req.user._id,
              name: req.user.name,
              email: req.user.email
          });
      }
  });
});

// User Dashbaord - Change name or email
router.post('/dashboard', ensureAuthenticated, (req, res) => {
  const { userid, name, email } = req.body;

  // Validation Passed
  User.findOne({ _id: userid })
      .then(user => {
          // User exists
          user.email = email;
          user.name = name;
          user.save();

          res.render('dashboard', {
              userid,
              name,
              email
          });
      });
});

// User Dashbaord - Change password
router.post('/dashboard/changepass', ensureAuthenticated, (req, res) => {
  const { email, password, newpassword, newpassword2 } = req.body;

  // Check if passwords match
  if (newpassword != newpassword2) {
      req.flash('error_msg', 'New passwords do not match');
      res.redirect('/dashboard');
  }

  // Check password length
  if (newpassword.length < 6) {
      req.flash('error_msg', 'Password should be at least 6 characters');
      res.redirect('/dashboard');
  }

  // Validation Passed
  User.findOne({ email: email })
      .then(user => {
          // Match password
          bcrypt.compare(password, user.password, (err, isMatch) => {
              if (err) throw err;

              if (isMatch) {
                  // Hash Password
                  bcrypt.genSalt(10, (err, salt) => {
                      bcrypt.hash(newpassword, salt, (err, hash) => {
                          if (err) throw err;
                          // Set password to hashed
                          user.password = hash;
                          // Save User
                          user.save()
                              .then(user => {
                                  req.flash('success_msg', 'Password changed successfully.');
                                  res.redirect('/dashboard');
                              })
                              .catch(err => console.log(err));
                      })
                  });
              } else {
                  req.flash('error_msg', 'Incorrect password.');
                  res.redirect('/dashboard');
              }
          });
      });
});

module.exports = router;
