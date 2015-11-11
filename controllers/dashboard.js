var _ = require('lodash'),
	Controller = require('../lib/controller'),
	View = require('../lib/view'),
	Menu = require('../models/menu');

var DashboardController = new Controller({
	name: 'dashboard',
	routes: [{
		urls: ['/'],
		role: 'user',
		requestType: 'GET',
		action: function(req, res) {
			new View(res, 'dashboard').render({ user: req.user });
		}
	}, {
		urls: ['/menus'],
		role: 'user',
		requestType: 'GET',
		action: function(req, res) {
			Menu.find({}, function(err, menus) {
				new View(res, 'menus').render({ menus: menus });
			});
		}
	}]
});

module.exports = DashboardController;
