const router = require('express').Router();
const Snippet = require('../models/codeSnippets');

function authRequired(req, res, next) {
  if (req.user) { next(); }
  else { res.redirect('/login'); }
}

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/create', authRequired, (req, res) => {
  res.render('create', { userId: req.user._id });
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

router.get('/viewsnippets', authRequired, (req, res) => {
  Snippet
    .find({})
    .then((results) => {
      res.render('viewsnippets', {
        results,
        username: req.user.username
      });
    });
});

module.exports = router;
