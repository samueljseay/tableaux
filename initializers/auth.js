module.exports = {
  init: function(app) {
    var passport = require('passport'),
        LocalStrategy = require('passport-local').Strategy,
        User = require('../models/user');

    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new LocalStrategy(
      function(username, password, done) {
        User.findOne({ where: { username: username } }).then(function(user) {
          if (!user) {
            return done(null, false, { message: 'Incorrect username or password' });
          }

          user.comparePassword(password, function(err, match) {
            if(match) {
              return done(null, user);
            }
            return done(null, false, { message: 'Incorrect username or password.' });
          });
        });
      }
    ));
  }
};