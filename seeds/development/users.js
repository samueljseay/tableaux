var User = require('../../models/user');

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

User.remove(function(err,p) {
  users.forEach(function(u) {
    User.find(u, function(err, res) {
      if(!res.length) {
        console.log('seeding user: ' + u.username);
        new User(u).save(function(err) {
          if (err) { throw err; }
        });
      }
    });
  });
});
