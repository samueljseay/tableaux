//TODO set up 404 routing
//TODO split into separate node module
var express = require('express'),
    path = require('path'),
    passport = require('passport');

function Controller(config) {
  this.name = config.name || '';
  this.router = express.Router();
  this.auth = config.authStrategy || 'local';
  this.generateRoutes(config.routes);
};

Controller.prototype.mount = function(app) {
  // Mount controller on an app
  app.use('/' + this.name, this.router);
};

Controller.prototype.generateRoutes = function(routes) {
  routes.forEach((route) => {
    route.urls.forEach((url) => {
      this.generateRoute(route, url, route.authenticate);
    });
  });
}

Controller.prototype.generateRoute = function(route, url, authenticate) {
  var auth = authenticate ? passport.authenticate(this.auth, {failureRedirect: '/login', failureFlash: true}) : function(r,r,n){n();},
      verifyRole = function(req,res,next) {
        if(req.user && req.user.role === route.role) {
          //TODO use express logging
          console.log('verified');
          next();
        }
        else {
          //TODO this should perhaps be a permission error instead of a redirect?
          res.redirect('login');
        }
      },
      verify = route.role ? verifyRole : function(r,r,n){n();};

  //TODO use express logging
  console.log('Creating route ' + route.requestType + ': ' + this.name + url);

  this.router[route.requestType.toLowerCase()](
    url,
    auth,
    verify,
    (function(req,res) {
      route.action(req, res);
    }).bind(this)
  );
};

module.exports = Controller;
