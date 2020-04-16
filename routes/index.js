var express = require('express');
var router = express.Router();

const { ensureAuthenticated } = require('../config/auth');

var Car = require('../models/Car');
var User = require('../models/User');

// GET home page
router.get('/', (req, res) => {
  Car.find( (err, docs) => {
    res.render('index', { title: 'Index Page', layout: 'userlayout', cars: docs });
  });
});

// GET dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => {
  res.render('dashboard', {
    title: 'Dashboard',
    name: req.user.name
});
});

// GET admin dashboard
router.get('/admin/dashboard', function (req, res, next) {
  res.render('AdminDashboard', { title: 'WAR-Dashboard', layout: 'adminlayout' });
});

router.get('/admin/dashboard/users', ensureAuthenticated, (req, res) => {
  const userid = req.user._id;
  User.find({}, function (err, docs) {
      if (typeof docs !== 'undefined' && docs.length > 0) {
          //var quantity = docs[0].quantity;

          res.render('dashboard', {
              title: 'Dashboard',
              user: docs,
              quantity,
              userid: req.user._id,
              name: req.user.name,
              email: req.user.email,
          });
      } else {
          res.render('dashboard', {
              title: 'Dashboard',
              user: docs,
              userid: req.user._id,
              name: req.user.name,
              email: req.user.email,
          });
      }
  });
});

module.exports = router;
