var locomotive = require('locomotive');
var Controller = locomotive.Controller;
var _ = require('underscore');

var ActivitiesController = new Controller();

var Activity = require('../models/activity');
var Position = require('../models/position');

ActivitiesController.index = function() {

	var self = this;

	// Res and req
	this.user = this.req.user;
	this.message = this.req.flash();

	// Parent settings
	Position.findOne(self.params('position_id'), function(err, position) {
		self.parent = position;
		self.parent.url = self.positionURL(position.id);
	});

	// Get data
	Activity.find({ target: this.params('position_id') }).populate('initiator', 'displayName pictureUrl').exec( function(err, activities) {
		self.output = activities;
		self.activities = _.first(activities, 10);
		self.respond({
			'json': { template: 'index' },
			'html': { template: 'index' },
			default: { format: 'html' }
		});
	});

};

module.exports = ActivitiesController;