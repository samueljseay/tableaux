var _ = require('lodash'),
    viewDir = require('../app').get('views'),
    path = require('path');

module.exports = {

  //options displayed when creating a content type and configuring the individual fields
  options: {
    name: {
      display: 'display name',
      value: '',
      type: 'text'
    },

    maxLength: {
      display: 'max length',
      value: 255,
      type: 'text'
    },

    required: {
      display: 'required',
      value: false,
      type: 'bool'
    }
  },

  meta: {
    type: 'text',
    partial: require('jade').compileFile(path.join(viewDir, 'field-types', 'text.jade')),
    description: 'A one line text field',
    valid: function() {
      return !(!this.value && this.required) || (this.value.length <= this.maxLength);
    },
    serialize: function(value) {
      return value;
    }
  }
};