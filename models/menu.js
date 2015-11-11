var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MenuSectionItem = new Schema({
  name: { type: String, required: true },
  description: { type: String }
});

var MenuSection = new Schema({
  name: { type: String, required: true },
  items: [MenuSectionItem]
});

var MenuSchema = new Schema({
	name: { type: String, required: true },
  sections: [MenuSection]
});

module.exports = mongoose.model('Menu', MenuSchema);
