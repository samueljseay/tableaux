var Controller = require('../lib/controller'),
    View = require('../lib/view'),
    passport = require('passport');

var LoginController = new Controller({
  name: 'login',
  routes: [{
    urls: ['/'],
    requestType: 'GET',
    action: function(req, res) {
      if(req.user) {
        res.redirect('/dashboard');
      }
      new View(res, 'login').render();
    }
  }, {
    urls: ['/'],
    requestType: 'POST',
    authenticate: true,
    action: function(req, res) {
      res.redirect('/dashboard');
    }
  }]
});

module.exports = LoginController;
