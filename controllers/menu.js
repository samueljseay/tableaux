var Controller = require('../lib/controller'),
	  View = require('../lib/view'),
	  passport = require('passport'),
		Menu = require('../models/menu');

var MenuController = new Controller({
	name: 'menu',
	routes: [{
		urls: ['/'],
		requestType: 'GET',
		action: function(req, res) {
      Menu.find({}, function(err, menus) {
				new View(res, 'menu/menus').render({ menus: menus });
			});
		}
	}, {
    urls: ['/create'],
    requestType: 'POST',
    action: function(req, res) {
			console.log(req.body.menu.sections);

			Menu.find({}, function(err, menus) {
				new View(res, 'menu/menus').render({ menus: menus });
			});
    }
  }]
});

module.exports = MenuController;
