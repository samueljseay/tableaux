var User = require('../models/user');

var users = [{
  username: 'user',
  email: 's@example.com',
  password: '1234',
  role: 'user'
}, {
  username: 'admin',
  email: 's2@example.com',
  password: '1234',
  role: 'user'
}];

users.forEach(function(u) {
  User.create(u);
});
