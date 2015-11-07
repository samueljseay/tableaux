module.exports = {
  init: function(app) {
    var requireDir = require('require-dir'),
        controllers = requireDir('../controllers');

    for(controller in controllers) {
      controllers[controller].mount(app);
    }
  }
};
