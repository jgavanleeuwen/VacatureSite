define([
	'jquery',
	'underscore',
	'backbone',
	'events/dispatcher',
	'views/index/index',
	'views/search/search',
	'views/activity/activity',
	'views/position/position',
	'views/position/positions'
	], 
	function($, _, Backbone, Dispatcher, IndexView, SearchView, ActivityView, PositionView, PositionListView) {
		var AppRouter = Backbone.Router.extend({

			// Routes
			routes: {
				'search': 'search',
				'positions/:position/activities': 'activities',
				'positions/new': 'index',
				'positions/:position': 'position',
				'positions': 'positions',
				'_=_': 'index',
				'*actions' : 'index'
			},

			// Actions
			search: function() {
				SearchView.render();
			},

			activities: function(position_id) {
				ActivityView.render();
			},

			position: function(position_id) {
				PositionView.render();
			},

			positions: function() {
				PositionListView.render();
			},

			index: function() {
				IndexView.render();
			}

		});

		return AppRouter;
	});
