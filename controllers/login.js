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
      } else {
        var message = (req.session.flash && req.session.flash.error) ? req.session.flash.error : '';
        new View(res, 'login').render({ message: message });
      }
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
