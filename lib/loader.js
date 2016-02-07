var path = require('path'),
    requireDir = require('require-dir');

var Loader = function(basePath) {
  this.basePath = basePath;
}

Loader.prototype.load = function(type) {
  return requireDir(path.join(this.basePath, type));
}

module.exports = Loader;