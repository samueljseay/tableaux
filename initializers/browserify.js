var browserify = require('browserify-middleware');

module.exports = {
  init: function(app) {
    app.use('/js', browserify(app.get('root') + '/public/javascripts/'));
  }
};
