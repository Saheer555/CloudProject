var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/admin/dashboard', function (req, res, next) {
  res.render('AdminDashboard', { title: 'WAR-Dashboard', layout: 'adminlayout' });
});

module.exports = router;
