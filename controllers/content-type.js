var Controller = require('../lib/controller'),
    View = require('../lib/view'),
    requireDir = require('require-dir'),
    ContentType = require('../models/content-type');

var ContentTypeController = new Controller({
  name: 'content-type',
  routes: [{
    urls: ['/'],
    role: 'user',
    requestType: 'GET',
    action: function(req, res) {
      new View(res, 'content-type/form').render({
        fields: requireDir('../field-types')
      });
    }
  }, {
    urls: ['/:id'],
    role: 'user',
    requestType: 'GET',
    action: function(req, res) {
      ContentType.findById(req.params.id).then(function(c) {
        new View(res, 'content-type/show').render({
          ctype: c
        });
      })
    }
  }, {
    urls: ['/create'],
    role: 'user',
    requestType: 'POST',
    action: function(req, res) {
      var ctype = req.body.ctype,
          saved;

      ContentType.create({
        fieldSchema: ctype.fields,
        name: ctype.name
      }).then(function(record) {
        res.redirect('/content-type/' + record.id);
      });
    }
  }]
});

module.exports = ContentTypeController;
