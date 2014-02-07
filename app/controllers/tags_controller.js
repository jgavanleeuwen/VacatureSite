var locomotive = require('locomotive');
var Controller = locomotive.Controller;
var _ = require('underscore');

var TagsController = new Controller();

var Tag = require('../models/tag');

// Index
TagsController.index = function() {

	var self = this;
	var queries = this.params('q').split(' ');
	var r = new RegExp(queries.pop(), "i");

	// Settings
	Tag.find({ name: r }, 'name', function(err, tags) {
		self.output = _.map(tags, function(val) {
			return queries.join(' ') + ' ' + val.name;
		});
		self.respond({
			'json': { template: 'index' },
			default: { format: 'json' }
		});
	});
};


module.exports = TagsController;
