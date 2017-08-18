const LocalStrategy = require('passport-local');
const User = require('./models/users');

function configure(passport) {

  const strategyFunc = function(username, password, done) {
    User.authenticate(username, password, function(err, user) {
      if (err) {
        console.log('LocalStrategy - error trying to authenticate');
        done(err);
      } else if (user) {
        console.log('LocalStrategy - Successful login');
        done(null, user);
      } else {
        console.log('LocalStrategy - general error');
        done(null, false, {
          message: 'Username or Password Invalid'
        });
      }
    });
  }

  passport.use(new LocalStrategy(strategyFunc));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

}

module.exports = {
  configure
};
