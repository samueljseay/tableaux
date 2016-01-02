var db = require('../lib/db'),
    Sequelize = require('sequelize'),
    Promise = Sequelize.Promise,
    bcrypt = require('bcrypt'),
    passport = require('passport');

var SALT_WORK_FACTOR = 10;

var User = db.define('User', {
  username: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
      notEmpty: true
    }
  },

  email: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
      notEmpty: true
    }
  },

  password: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },

  role: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  }
}, {
  instanceMethods: {
    comparePassword: function(candidatePassword, cb) {
      bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if(err) return cb(err);
        cb(null, isMatch);
      });
    }
  }
});

function encryptPassword(user){
  //anti pattern but had trouble with nested callbacks
  var def = Promise.pending();

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if(err) { return Promise.reject(err); }
    bcrypt.hash(user.password, salt, function(err, hash) {
      user.password = hash;
      def.resolve();
    });
  });

  return def.promise;
}

User.hook('beforeCreate', encryptPassword);
User.hook('beforeUpdate', encryptPassword);

module.exports = User;

passport.serializeUser(function(user, done) {
  //serialize the id to the session
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id).then(function (user) {
    done(null, user);
  });
});
