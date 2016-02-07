var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    requireDir = require('require-dir'),
    cookieParser = require('cookie-parser'),
    flash = require('connect-flash'),
    keys = require('../config/keys'),
    Loader = require('./loader');

var app = express(),
    // for now this means the app needs to be run from the path of the project
    appPath = process.cwd(),
    loader = new Loader(appPath);

app.set('appPath', appPath);

app.db = require('./db');

// view engine setup
app.set('views', [path.join(appPath, 'views'), path.join(__dirname, 'views')]);
app.set('view options', { layout: false });
app.set('view engine', 'jade');

app.use(flash());
app.use(cookieParser());
app.use(session({ secret: keys.sessionSecret, resave: false, saveUninitialized: false }));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(appPath, 'public')));

app.tableaux = {
  appPath: app.get('appPath'),

  loader: loader,

  initialize: function() {
    var initializers = this.loader.load('initializers'),
        controllers = this.loader.load('controllers'),
        loginController = require('./controllers/login'),
        logoutController = require('./controllers/logout');

    for (var init in initializers) {
      initializers[init].init(app);
    }

    for(controller in controllers) {
      controllers[controller].mount(app);
    }

    // login and logout are baked in for the time being
    loginController.mount(app);
    logoutController.mount(app);

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
    });

    // error handlers

    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
      app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
          message: err.message,
          error: err
        });
      });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: {}
      });
    });
  },

  start: function() {
    var port = process.env.PORT || 3000;

    this.initialize();

    return app.db.sync({ force: app.get('env') === 'development' }).then(()=> {
      //load seeds
      if(app.get('env') !== 'production') {
        this.loader.load('seeds');
      }

      app.set('port', port);

      this.server = app.listen(app.get('port'), function() {
        console.log('app started on port: ' + app.get('port'));
      });

      this.server.on('error', this.onError);

      return this.server;
    });
  },

  onError: function(error) {
    /**
    * Event listener for HTTP server "error" event.
    */
    if (error.syscall !== 'listen') {
      throw error;
    }

    var bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

};

module.exports = app.tableaux;
