var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MailSchema = new Schema({

	// Subject
	subject: { type: String, required: true },

	// To
	to: { type: String, required: true },

	// Body
	html: { type: String },

	// Plain
	text: { type: String }

});

module.exports = mongoose.model('Mail', MailSchema);