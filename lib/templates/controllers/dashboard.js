var Controller = require('../lib/controller');

var DashboardController = new Controller({
  name: 'dashboard',
  routes: [{
    urls: ['/'],
    role: 'user',
    requestType: 'GET',
    action: function(req, res) {
      this.render();
    }
  }]
});

module.exports = DashboardController;
