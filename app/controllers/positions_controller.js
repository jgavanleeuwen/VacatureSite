var locomotive = require('locomotive');
var _ = require('underscore');
var Controller = locomotive.Controller;

var PositionsController = new Controller();

var User = require('../models/user');
var Position = require('../models/position');
var Activity = require('../models/activity');

var Mailer = require('../lib/mailer');

PositionsController.before('*', function(next) {

	// Self
	var self = this;

	// Get user
	if (this.req.user) {
	}

});

PositionsController.before('index', function( next ) {

	// Helper
	var self = this;

	// Res and req
	this.user = this.req.user;
	this.message = this.req.flash();

	// Go
	next();

});

PositionsController.index = function() {

	// Helper
	var self = this;

	// Res and req
	this.user = this.req.user;
	this.message = this.req.flash();
	
	// Output
	this.positions = [];

	// Get data
	Position.find().populate('company', 'name logo').exec( function(err, positions) {

		self.positions = JSON.parse(JSON.stringify(positions));

		_.map( self.positions, function(item) {
			_.extend(item, { level: 1 - _.difference(item.skills, [ 
        "PHP", 
        "JavaScript", 
        "CSS", 
        "Node", 
        "Ruby on Rails"
    ]).length / item.skills.length });
			return item;
		});

		self.render();
	});
};

PositionsController.new = function() {
	this.render();
};

PositionsController.create = function() {

	// Helper
	var self = this;

	// Res and req
	this.user = this.req.user;
	this.message = this.req.flash();

	// Add model
	Position.create({
		name: self.param('name'),
		description: self.param('description'),
		location: self.param('location'),
		company: self.user.company._id
	}, function(err, model) {
		if (err) {
			return self.redirect('new');
		}

		// Create mail
		self.render('emails/welcome', { user: self.req.user }, function(err, html) {
			Mailer.sendMail({ 
				html: html,
				subject: 'Welkom!'
			}, function(err) {
				if (err) {
					return console.log(err);
				}
			});
		});

		return self.redirect('positions');
	});
};

PositionsController.show = function() {

	// Helper
	var self = this;

	// Res and req
	this.user = this.req.user;
	this.message = this.req.flash();

	// Get model
	Position.findById(self.params('id')).populate('company').exec( function(err, position) {
		self.position = position;
		self.render();
	});
};

PositionsController.after('show', function(next) {

	// Helper
	var self = this;

	// Log
	Activity.create({ 
		target: self.params('id'), event: { type: 'view', success: true }, initiator: self.user._id }, function (err, model) {
		if (err) console.log(err);

		next();
	});

});

PositionsController.edit = function() {
	
	// Helper
	var self = this;

	// Res and req
	this.user = this.req.user;
	this.message = this.req.flash();

	// Get model
	Position.findById(self.params('id')).populate('company').exec( function(err, position) {
		self.position = position;
		self.render();
	});

};

PositionsController.destroy = function() {
	
	// Helper
	var self = this;

	// Res and req
	this.user = this.req.user;
	this.message = this.req.flash();

	// Remove
	Position.remove({ _id: self.params('id') }).exec( function(err) {

		if (err) return err;
		
		self.output = {
			'status': 'OK'
		};

		self.respond({
			'json': { template: 'destroy' },
			default: { format: 'html' }
		});

	});


};

PositionsController.after('destroy', function(next) {

	this.req.flash('info', 'Model was removed successfully');

	next();
});


module.exports = PositionsController;
