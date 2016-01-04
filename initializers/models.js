module.exports = {
  init: function(app) {
    var requireDir = require('require-dir');

    requireDir('../models');
  }
};