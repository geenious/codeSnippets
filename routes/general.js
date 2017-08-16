const router = require('express').Router();

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
  
});

module.exports = router;
