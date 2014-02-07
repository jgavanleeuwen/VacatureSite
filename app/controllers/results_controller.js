var locomotive = require('locomotive');
var Controller = locomotive.Controller;
var Faker = require('Faker');

var ResultsController = new Controller();

var Activity = require('../models/activity');
var User = require('../models/user');

// Index
ResultsController.index = function() {

	// Settings
	this.collection = [];

	// Params
	this.query = this.param('query') || '';
	this.queries = this.query.split(' ');

	// Res and req
	this.user = this.req.user;
	this.message = this.req.flash();

	// Create data
	for(var i = 0; i < 9; i++) {
		this.collection.push(Faker.Helpers.createCard());
	}

  this.respond({
		'json': { template: 'index' },
		'html': { template: 'index' },
		default: { format: 'html' }
	});
};

// Index
ResultsController.show = function() {

	// Log

	// Settings
	this.collection = [];

	// Params
	this.query = this.param('query') || '';
	this.queries = this.query.split(' ');

	// Res and req
	this.user = this.req.user;
	this.message = this.req.flash();

	// Create data
	for(var i = 0; i < 9; i++) {
		this.collection.push(Faker.Helpers.createCard());
	}
  this.render();
};


module.exports = ResultsController;
