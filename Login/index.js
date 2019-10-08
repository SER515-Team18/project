const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const passport = require('passport');
const session = require('express-session');

const app = express();

//DB Config
const db = require('./config/keys.js').MongoURI;

// Passport Config
require('./config/passport')(passport);

//Connect to MongoDB
mongoose.connect(db, { usenewUrlParser: true })
	.then(() => console.log('MongoDB Connected......'))
	.catch(err => console.log(err));

var path = require ('path');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname + '.../Login/views')));

//EJS
app.use(expressLayouts);
app.set('view engine' , 'ejs');

//BODYPARSER
app.use(express.urlencoded({extended: false}));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Connect flash
app.use(flash());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

//Routes
app.use('/' , require('./routes/index.js'));
app.use('/users' , require('./routes/users.js'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));