const router = require('express').Router();
const Snippet = require('../models/codeSnippets');

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.get('/create', (req, res) => {
  res.render('create');
});

router.post('/create', (req, res) => {
  console.log(req.body);
  let newSnippet = new Snippet(req.body);

  newSnippet
    .save()
    .then((results) => {
      console.log(results);
      res.redirect('/');
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/');
    });
});

module.exports = router;
