const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User & Home work model
const User = require('../models/User');
const HomeWork = require('../models/HomeWork');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');


// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Register Page
router.get('/register', ensureAuthenticated, (req, res) => res.render('register'));

// Admin Page
router.get('/adminDashboard', ensureAuthenticated, (req, res) => res.render('adminDashboard'));

// Search User Page
router.get('/searchUser', ensureAuthenticated, (req, res) => res.render('searchUser'));

// Search User Page to delete
router.get('/searchUserToDelete', (req, res) => res.render('searchUserToDelete'));

//createQuiz Page
router.get('/createQuiz', (req, res) => res.render('createQuiz'));




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
router.post('/login', 
  passport.authenticate('local', { failureRedirect: '/users/login' }),
  function(req, res) {
    if (req.user.email == "admin@gmail.com"){
      res.redirect('/users/adminDashboard');
    }

    else if (req.user.grade == "teacher"){
      res.render('teacherdashboard');
    }
    else
    res.redirect('/users/workspace');

  });
  
// Workspace
router.get('/workspace', ensureAuthenticated, (req, res) =>
  res.render('index', {
    user: req.user,
    grade: req.user.grade
  })
);

//updateUser
router.post('/updateUser/:id' , (req, res) =>{
   let updates = {};
   updates.name = req.body.name;
   updates.email = req.body.email;
   updates.grade = req.body.grade;

   let query = {_id:req.params.id};

   User.updateOne(query, updates, function(err){
          if(err){
            console.log(err);
            return;
          }
          else{
            res.redirect('/users/adminDashboard');
          }
   });
});

//Delete User
router.post('/deleteUser/:id' , (req, res) =>{


  let query = {_id:req.params.id};

  User.remove(query, function(err){
         if(err){
           console.log(err);
           return;
         }
         else{
           res.redirect('/users/adminDashboard');
         }
  });
});

//search User to update
router.post('/searchUser',(req,res) => {
  const  {email} = req.body;
  let errors=[];
  
  User.findOne({ email: email }).then(user => {
    
      if (user) {
        res.render('updateUser', {user});
              
      } else {
        errors.push({ msg: 'Email does not exist' });
        res.render('searchUser',{
          errors
        })
          
    }
  }
)});

//search User to delete
router.post('/searchUserToDelete',(req,res) => {
  const  {email} = req.body;
  let errors=[];
  
  User.findOne({ email: email }).then(user => {
    
      if (user) {

        res.render('deleteUser', {user});
              
      } else {
        errors.push({ msg: 'Email does not exist' });
        res.render('searchUserToDelete',{
          errors
        })
          
    }
  }
)});

//Add homework
router.post('/createQuiz',function(req,res) {
  const newHomeWork = new HomeWork({
    title: req.body.title,
    grade: req.body.gradeType,
    question: req.body.question,
    answer: req.body.answer
    });
    
    newHomeWork
    .save()
    .then(homework => {
      req.flash(
        'success_msg',
        'Question added'
      );
      res.redirect('/users/createQuiz');
    })
    .catch(err => console.log(err));
});


// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

module.exports = router;