const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/User');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');


// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

// Admin Page
router.get('/adminDashboard', forwardAuthenticated, (req, res) => res.render('adminDashboard'));

// Update User Page
router.get('/updateUser', forwardAuthenticated, (req, res) => res.render('updateUser'));

// Register
router.post('/register', (req, res) => {
	
  const { name, email, grade, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2 || !grade) {
    errors.push({ msg: 'Please enter all fields' });
  }
  
  if (grade != '1' && grade != '6' && grade != '9'){
		errors.push({msg: 'Please enter a valid grade'});
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
	    grade,
      password,
      password2
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
          name,
          email,
		      grade,
          password,
          password2
        });
      } else {
        const newUser = new User({
          name,
          email,
		      grade,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/users/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/users/workspace',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});
  
// Workspace
router.get('/workspace', ensureAuthenticated, (req, res) =>
  res.render('index', {
    user: req.user,
    grade: req.user.grade
  })
);

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

module.exports = router;