const router = require('express').Router();
const User = require('../models/users');

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res) => {
  User.authenticate(req.body.username, req.body.password, (err, user) => {
    if (err || user === false) {
      console.log('problem with login');
      res.redirect('/login');
    } else {
      console.log('Successful login');
      res.redirect('/viewsnippets');
    }
  });
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
