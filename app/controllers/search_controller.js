var locomotive = require('locomotive');
var Controller = locomotive.Controller;
var Faker = require('Faker');

var SearchController = new Controller();

// Show
SearchController.show = function() {
	this.user = this.req.user;
	this.message = this.req.flash();
  this.render();
};

module.exports = SearchController;
