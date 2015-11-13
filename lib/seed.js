var requireDir = require('require-dir'),
    app = require('../app'),
    _ = require('lodash'),
    Q = require('q');

//load seeds
var seeds = requireDir('../seeds/' + app.get('env'));

var orderedSeeds = _.sortBy(Object.keys(seeds).map(function(key) {
  return seeds[key];
}), 'order').map(function(s) { return s.seed; });

var initialSeed = orderedSeeds.shift();

module.exports = orderedSeeds.reduce(function (soFar, f) {
    return soFar().then(f);
}, initialSeed);
