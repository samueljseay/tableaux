var _ = require('lodash'),
    viewDir = require('../app').get('views'),
    path = require('path');

module.exports = {
  options: {
    name: {
      display: 'display name',
      value: '',
      type: 'text'
    },

    defaultValue: {
      display: 'default value',
      value: 0,
      type: 'number'
    },

    required: {
      display: 'required',
      value: false,
      type: 'bool'
    }
  },

  meta: {
    type: 'number',
    partial: require('jade').compileFile(path.join(viewDir, 'field-types', 'number.jade')),
    description: 'A number field',
    valid: function() {
      return _.isNumber(this.value);
    },
    serialize: function(value) {
      return value
    }
  }
};