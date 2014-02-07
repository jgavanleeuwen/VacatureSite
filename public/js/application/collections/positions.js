define([
	'underscore',
	'backbone',
	'models/position'
	], function( _, Backbone, PositionModel ) {

		var PositionCollection = Backbone.Collection.extend({

			model: PositionModel

		});

		return PositionCollection;

});