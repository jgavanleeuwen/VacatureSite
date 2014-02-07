var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PositionSchema = new Schema({
	// eMail address
	name: { type: String },

	// Description
	description: { type: String },

	// Location
	location: { type: String },

	// Company
	company: { type: Schema.Types.ObjectId, ref: 'Company' },

	// Skills
	skills: { type: Array }
});

module.exports = mongoose.model('Position', PositionSchema);