var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var findOrCreate = require('mongoose-findorcreate');
var _ = require('underscore');

var UserSchema = new Schema({
	// eMail address
	email: { type: String, unique: true },

	// Hash
	hash: { type: String, required: false },

	// Display name
	displayName: { type: String, required: false },

	// Authentication
	openauth : {
		provider: { type: String, required: false },
		id: { type: String, required: false}
	},

	// Name
	name: {
		first: { type: String, required: true },
		last: { type: String, required: true }
	},

	// Company
	company: { type: Schema.Types.ObjectId, ref: 'Company' }
});

UserSchema.plugin(findOrCreate);

UserSchema.method('checkPassword', function (password, callback) {
	bcrypt.compare(password, this.hash, callback);
});

UserSchema.static('authenticate', function (username, password, callback) {
	this.findOne({ email: username }).populate('company').exec( function(err, user) {
		if (err) {
			return callback(err);
		}

		if (!user) {
			return callback(null, false);
		}

		user.checkPassword(password, function(err, passwordCorrect) {
			if (err) {
				return callback(err);
			}
			
			if (!passwordCorrect) {
				return callback(null, false);
			}
			return callback(null, user);
		});
	});
});

UserSchema.virtual('password').set( function(password) {
  this.hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
});

UserSchema.static('openauthenticate', function (provider, profile, callback) {
	this.findOrCreate({ 
			openauth: {
				provider: provider,
				id: profile.id
			}
		}, {
			email: _.first(profile.emails).value,
			name: {
				first: profile.name.givenName,
				last: profile.name.familyName
			},
			displayName: profile.name.givenName + ' ' + profile.name.familyName
		}, function(err, user) {
			if (err) {
				return callback(err);
			}

			if (!user) {
				return callback(null, false);
			}

			return callback(null, user);
	});
});

module.exports = mongoose.model('User', UserSchema);