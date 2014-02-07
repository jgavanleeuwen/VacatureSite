var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var findOrCreate = require('mongoose-findorcreate');


var TagSchema = new Schema({

	// Name
	name: { type: String, required: true },

});

TagSchema.plugin(findOrCreate);

module.exports = mongoose.model('Tag', TagSchema);