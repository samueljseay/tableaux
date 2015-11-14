var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var User = require('./user').schema;

var MenuSectionItem = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: String, required: true }
});

var MenuSection = new Schema({
  name: { type: String, required: true },
  items: [MenuSectionItem]
});

var MenuSchema = new Schema({
	name: { type: String, required: true },
  user: { type: User, required: true },
  sections: [MenuSection]
});

module.exports = mongoose.model('Menu', MenuSchema);
