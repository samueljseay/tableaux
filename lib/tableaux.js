var requireDir = require('require-dir'),
    initializers = requireDir('../initializers');

module.exports = {
  initialize: function(app) {
    for (var init in initializers) {
      initializers[init].init(app);
    }
  }
};
