require('dotenv').config();
const express = require('express');
const mustacheExpress = require('mustache-express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const flash = require('express-flash-messages');
const expressValidator = require('express-validator');

const app = express();

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/code-snippets', { useMongoClient: true }).then(() => {
  console.log('Database Connected');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(express.static('public'));

app.use(session({
  secret: 'woeuajsdnf',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
require('./passportconfig').configure(passport);

let mustache = mustacheExpress();
if (`${process.env.NODE_ENV}` === 'development') { mustache.cache = null }
app.engine('mustache', mustache);
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.use(require('./routes/general'));
app.use(require('./routes/auth'));

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
