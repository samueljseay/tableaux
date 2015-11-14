var Controller = require('../lib/controller'),
	  View = require('../lib/view'),
	  passport = require('passport'),
		Menu = require('../models/menu');

var MenuController = new Controller({
	name: 'menu',
	routes: [{
		urls: ['/'],
		requestType: 'GET',
		role: 'user',
		action: function(req, res) {
      Menu.find({ 'user.email': req.user.email }, function(err, menus) {
				console.log(err);
				new View(res, 'menu/menus').render({ menus: menus || [] });
			});
		}
	}, {
    urls: ['/create'],
    requestType: 'POST',
		role: 'user',
    action: function(req, response) {
			var menu = req.body.menu;
			menu.user = req.user;

			new Menu(menu).save(function(err, res) {
				response.redirect('/menu');
			});
    }
  }, {
		urls: ['/:id'],
		requestType: 'GET',
		role: 'user',
		action: function(req, res) {
			Menu.find({ _id: req.params.id }, function(err, menus) {
				new View(res, 'menu/menu').render({ menu: menus[0] });
			});
		}
	}]
});

module.exports = MenuController;
