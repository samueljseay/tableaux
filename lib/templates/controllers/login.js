var Controller = require('../controller'),
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
        this.render({ message: message });
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
