var ContentType = require('./content-type'),
    Sequelize = require('sequelize'),
    db = require('../lib/db');

var Content = db.define('Content', {
  //array of field id / field value pairs
  fieldValues: {
    type: Sequelize.JSONB
  }
});

Content.hasOne(ContentType);