const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const app = express();

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