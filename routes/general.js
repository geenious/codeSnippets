const router = require('express').Router();
const Snippet = require('../models/codeSnippets');


router.get('/', (req, res) => {
  res.render('index');
});

router.get('/create', (req, res) => {
  res.render('create');
});

router.post('/create', (req, res) => {
  let newSnippet = new Snippet(req.body);

  newSnippet
    .save()
    .then((results) => {
      res.redirect('/');
    })
    .catch((err) => {
      res.redirect('/');
    });
});

router.get('/viewsnippets', (req, res) => {
  Snippet
    .find({})
    .then((results) => {
      res.render('viewsnippets', {results});
    });
});

module.exports = router;
