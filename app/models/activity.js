var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ActivitySchema = new Schema({

	// Target
	target: { type: Schema.Types.ObjectId },

	// Initiator
	initiator: { type: Schema.Types.ObjectId, ref: 'User' },

	// Event
	event: { 
		type: { type: String, required: true },
		success: { type: Boolean, default: true }
	},

	// Datetime
	date: { type: Date, required: true, default: Date.now },
});

ActivitySchema.virtual("success").set( function( success ) {
	if (!success) {
		this.event.success = false;
	}
});

module.exports = mongoose.model('Activity', ActivitySchema);