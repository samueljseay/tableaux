var _ = require('lodash');

module.exports = function(response, view, options) {
	this.response = response;
	this.view = view;
	this.options = options || {};

	this.render = function(data) {
		if (this.response && this.view) {
			this.response.render(this.view, _.extend(this.options,data));
		}
	}
}
