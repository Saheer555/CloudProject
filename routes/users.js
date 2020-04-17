var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// User model
const User = require('../models/User');

// // GET users listing
// router.get('/', function (req, res, next) {
//   res.send('respond with a resource');
// });

// Login Page
router.get('/login', (req, res) => {
  if (typeof res.locals.username !== 'undefined') {
      res.redirect('/dashboard');
  } else {
      var messages = req.flash('error');
      res.render('login', {
          title: 'Login',
          messages: messages,
          hasErrors: messages.length > 0,
      });
  }
});

// Register Page
router.get('/register', (req, res) => {
  if (typeof res.locals.username !== 'undefined') {
      res.redirect('/dashboard');
  } else {
      var messages = req.flash('error');
      res.render('register', {
          title: 'Register',
          messages: messages,
          hasErrors: messages.length > 0,
      });
  }
});

// Register Handle
router.post('/register', (req, res) => {
  const { name, email, password, password2, license } = req.body;
  let errors = [];

  // Check required fields
  if(!name || !email || !password || !password2 || !license) {
      errors.push({ msg: 'Please fill in all fields.' });
  }

  
  //License validation
    var firstLetter = license[0];
    var secondLetter = license[1];
    if(license.length != 13  || isNaN(firstLetter) == false || isNaN(secondLetter) == false) {
        errors.push({ msg: 'Please enter a valid license number.' });
    }


  // Check passwords match
  if(password !== password2) {
      errors.push({ msg: 'Passwords do not match.' });
  }

  // Check password length
  if(password.length < 6) {
      errors.push({ msg: 'Password should be at least 6 characters' });
  }

  if(errors.length > 0) {
      res.render('register', {
          errors,
          name,
          email,
          password,
          password2,
          license
      });
  } else {
      // Validation Passed
      User.findOne({ email: email })
          .then(user => {
              if(user) {
                  // User exists
                  errors.push({ msg: 'Email is already registered' });
                  res.render('register', {
                      errors,
                      name,
                      email,
                      password,
                      password2,
                      license
                  });
              } else {
                  const newUser = new User({
                      name,
                      email,
                      password,
                      license
                  });

                  // Hash Password
                  bcrypt.genSalt(10, (err, salt) => {
                      bcrypt.hash(newUser.password, salt, (err, hash) => {
                          if(err) throw err;
                          // Set password to hashed
                          newUser.password = hash;
                          // Save User
                          newUser.save()
                              .then(user => {
                                  req.flash('success_msg', 'You are now registered and can log in');
                                  res.redirect('/users/login');
                              })
                              .catch(err => console.log(err));  
                      })
                  });
              }
          });
  }

});

// Login Handle
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
      successRedirect: req.session.returnTo || '/dashboard',
      failureRedirect: '/users/login',
      failureFlash: true
  })(req, res, next);
});

// Logout Handle
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out.');
  res.redirect('/users/login');
});

module.exports = router;
