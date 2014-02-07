var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CompanySchema = new Schema({

	// Name
	name: { type: String, required: true },

	// Logo
	logo: {type: String }

});

module.exports = mongoose.model('Company', CompanySchema);