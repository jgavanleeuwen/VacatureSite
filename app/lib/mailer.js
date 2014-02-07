var _ = require('underscore');
var nodemailer = require('nodemailer');
var smtp_config = require('../../config/config.json').smtp;

var Mail = require('../models/mail');


module.exports = {
		
	sendMail: function( mail, callback ) {

		var transport = nodemailer.createTransport("SMTP", smtp_config);

		var message = {
			from: 'Jeroen van Leeuwen <jgavanleeuwen@gmail.com>',
			to: '"Receiver Name" <jgavanleeuwen@outlook.com>',
			subject: 'Nodemailer is unicode friendly ✔',
			headers: {
					'X-Laziness-level': 1000
			},

			// plaintext body
			text: 'Hello to myself!',

			// HTML body
			html: mail.html,

			// An array of attachments
			attachments: []
		};

		transport.sendMail(message, function(error){
			if (error) {
				if( typeof callback === 'function') {
					return callback(error);
				}
			}

			Mail.create( message, function(err, model) {
				if( typeof callback === 'function') {
					return callback(error);
				}
			});
		});
	}

};