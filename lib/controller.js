//TODO set up 404 routing
var _ = require('lodash'),
	express = require('express'),
	path = require('path'),
	passport = require('passport');

function Controller(config) {
	this.name = config.name || '';
	this.router = express.Router();
	this.auth = config.authStrategy || 'local';
	this.currentRes = null;

	if (config.routes) {
		config.routes.forEach(function(route) {
			route.urls.forEach(function(url) {
				this.generateRoute(route, url, route.authenticate);
			}, this);
		}, this);
	}
};

Controller.prototype.mount = function(app) {
	// Mount controller on an app
	app.use('/' + this.name, this.router);
};

//TODO add a this.render API, that stores the current req and res and creates a new View to simplify controller actions
// Controller.prototype.render = function(data, view) {
// 	//default to auto resolving a view name based on the controller/action
// 	new View(this.currentRes, view ? view : (this.name + '/' + this.actionName)).render(data);
// };

Controller.prototype.generateRoute = function(route, url, authenticate) {
	var auth = authenticate ? passport.authenticate(this.auth) : function(r,r,n){n();},
			//TODO clean up roles/redirect architecture
			verifyRole = function(req,res,next) {
				if(req.user && req.user.role === route.role) {
					//TODO use express logging
					console.log('verified');
					next();
				}
				else {
					res.redirect('/login');
				}
			},
			verify = route.role ? verifyRole : function(r,r,n){n();},
			reqType = route.requestType ? route.requestType.toLowerCase() : 'get';

	//TODO use express logging
	console.log('Creating route ' + route.requestType + ': ' + this.name + '/' + url);

	this.router[reqType](
		url,
		auth,
		verify,
		(function(req,res) {
			//store the current response and action for rendering
			this.currentRes = res;
			this.currentAction = url;

			route.action(req, res);
		}).bind(this)
	);
};

module.exports = Controller;
