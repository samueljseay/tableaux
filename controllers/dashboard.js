var _ = require('lodash'),
  Controller = require('../lib/controller'),
  View = require('../lib/view');

var DashboardController = new Controller({
  name: 'dashboard',
  routes: [{
    urls: ['/'],
    role: 'user',
    requestType: 'GET',
    action: function(req, res) {
      new View(res, 'dashboard').render();
    }
  }]
});

module.exports = DashboardController;
