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

let mustacheExpressInstance = mustacheExpress();
mustacheExpressInstance.cache = null;
app.engine('mustache', mustacheExpressInstance);
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.use(require('./routes/general'));

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
