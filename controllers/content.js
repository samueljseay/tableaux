var Controller = require('../lib/controller'),
    View = require('../lib/view'),
    requireDir = require('require-dir'),
    ContentType = require('../models/content-type');

var ContentController = new Controller({
  name: 'content',
  routes: [{
    urls: ['/'],
    role: 'user',
    requestType: 'GET',
    action: function(req, res) {

      ContentType.findAll().then(function(ctypes) {
        new View(res, 'content/index').render({
          ctypes: ctypes
        });
      });
    }
  }, {
    urls: ['/:id/create'],
    role: 'user',
    requestType: 'GET',
    action: function(req, res) {
      ContentType.findById(req.params.id).then(function(ctype) {
        console.dir(ctype.fieldSchema);
        new View(res, 'content/form').render({
          ctype: ctype,
          fields: requireDir('../field-types')
        });
      });
    }
  }]
});

module.exports = ContentController;
