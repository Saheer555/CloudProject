var express = require('express');
var router = express.Router();

const { ensureAuthenticated } = require('../config/auth');

// GET home page
router.get('/', (req, res) => {
  res.render('index', { title: 'Index Page', layout: 'userlayout' });
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

module.exports = router;
