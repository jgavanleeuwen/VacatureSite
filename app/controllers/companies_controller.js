var locomotive = require('locomotive');
var Controller = locomotive.Controller;

var CompaniesController = new Controller();

var User = require('../models/user');
var Position = require('../models/position');
var Activity = require('../models/activity');
var Company = require('../models/company');

CompaniesController.before('*', function(next) {

	// Self
	var self = this;

	// Get user
	if (this.req.user) {
	}

});

CompaniesController.index = function() {

	// Helper
	var self = this;

	// Res and req
	this.user = this.req.user;
	this.message = this.req.flash();

	// Get data
	Company.find().exec( function(err, companies) {
		self.companies = companies;
		self.respond({
			'json': { template: 'index' },
			'html': { template: 'index' },
			default: { format: 'html' }
		});
	});

};

CompaniesController.show = function() {

	// Helper
	var self = this;

	// Res and req
	this.user = this.req.user;
	this.message = this.req.flash();

	// Get model
	Company.findById(self.params('id')).populate('company').exec( function(err, company) {
		self.company = company;
		self.render();
	});
};

CompaniesController.after('show', function(next) {

	// Helper
	var self = this;

	// Log
	Activity.create({ 
		target: self.params('id'), event: { type: 'view', success: true }, initiator: self.user._id }, function (err, model) {
		if (err) console.log(err);

		next();
	});

});


module.exports = CompaniesController;
