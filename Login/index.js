const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

const app = express();

//DB Config
const db = require('./config/keys.js').MongoURI;

//Connect to MongoDB
mongoose.connect(db, {usenewUrlParser: true})
	.then(() => console.log('MongoDB Connected......'))
	.catch(err => console.log(err));

var path = require ('path');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname + '.../Login/views')));

//EJS
app.use(expressLayouts);
app.set('view engine' , 'ejs');

//Routes
app.use('/' , require('./routes/index.js'));
app.use('/' , require('./routes/users.js'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));