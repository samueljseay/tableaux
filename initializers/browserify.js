var browserify = require('browserify-middleware'),
    path = require('path'),
    reactify = require('reactify'),
    cssify = require('browserify-css');

module.exports = {
  init: function(app) {
    var reactifyES6 = function(file) {
      return reactify(file, {'es6': true });
    };

    app.use('/js', browserify(path.join(app.get('root'), 'public/javascripts/app'), {
      transform: [reactifyES6, cssify],
      // grep: /\.jsx?$/,
      cache: 'dynamic',
      minify: true
    }));
  }
};
