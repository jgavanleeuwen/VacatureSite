define([
	'underscore',
	'backbone'
	], function( _, Backbone) {
		var PositionModel = Backbone.Model.extend({

			idAttribute: '_id',

			urlRoot: '/positions'

		});
		
		return PositionModel;
	});