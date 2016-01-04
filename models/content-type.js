var db = require('../lib/db'),
    Sequelize = require('sequelize');

var ContentType = db.define('ContentType', {
  //fieldSchema contains a list of all the field types that make up this content type
  //something like:
  //{
  //fields: [{
  //  type: 'text',
  //  name: 'movie title',
  //  value: 'Tomorrow Never Dies'
  //}]
  //
  //}

  fieldSchema: {
    type: Sequelize.JSONB
  },

  name: {
    type: Sequelize.STRING
  }
});


module.exports = ContentType;

