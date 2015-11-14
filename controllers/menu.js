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
	}, {
		urls: ['/update'],
		requestType: 'POST',
		role: 'user',
		action: function(req, res) {
			var menu = req.body.menu;

			Menu.findByIdAndUpdate(menu._id, menu, function(err, men) {
				res.redirect('/menu/' + men.id);
			});
		}
	}, {
		urls: ['/preview/:id'],
		requestType: 'GET',
		role: 'user',
		action: function(req, res) {
			Menu.find({ _id: req.params.id }, function(err, menus) {
				new View(res, 'menu/preview').render({ menu: menus[0] });
			});
		}
	}]
});

module.exports = MenuController;
