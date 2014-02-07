var locomotive = require('locomotive');
var Controller = locomotive.Controller;

var LoginController = new Controller();

LoginController.show = function() {

	this.user = this.req.user;
	this.message = this.req.flash();

  this.render();
};

module.exports = LoginController;
