require('dotenv').config();
const express = require('express');
const mustacheExpress = require('mustache-express');

const app = express();

app.use(express.static('public'));

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.use(require('./routes/general'));

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
