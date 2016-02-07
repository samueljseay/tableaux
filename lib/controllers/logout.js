var Controller = require('../controller'),
    passport = require('passport');

var LogoutController = new Controller({
  name: 'logout',
  routes: [{
    urls: ['/'],
    requestType: 'GET',
    action: function(req, res) {
      req.logout();
      res.redirect('/dashboard');
    }
  }]
});

module.exports = LogoutController;
