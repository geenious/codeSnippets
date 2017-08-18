require('dotenv').config();
const express = require('express');
const mustacheExpress = require('mustache-express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/code-snippets', { useMongoClient: true }).then(() => {
  console.log('Database Connected');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

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
