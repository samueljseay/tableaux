var _ = require('lodash');

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
    partial: 'fields/number',
    description: 'A number field',
    valid: function() {
      return _.isNumber(this.value);
    },
    serialize: function(value) {
      return value
    }
  }
};