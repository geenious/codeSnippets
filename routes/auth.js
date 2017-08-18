const router = require('express').Router();
const User = require('../models/users');

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res) => {
  console.log(req.body);
  res.redirect('/login');
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', (req, res) => {
  const user = new User({ username: req.body.username, password: req.body.password });
  user.save((err) => {
    if (err) {
      console.log('error', err);
    }
    res.redirect('/viewsnippets');
  });
});


module.exports = router;
