var Controller = require('../lib/controller'),
    View = require('../lib/view'),
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
