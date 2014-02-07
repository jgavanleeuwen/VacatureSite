define([
	'jquery',
	'underscore',
	'backbone',
	'getbootstrap',
	'modernizr',
	'models/position'
], function($, _, Backbone, GetBootstrap, Modernizr, PositionModel) {
		var positionView = Backbone.View.extend({
			el: 'body',

			events: {
				'click #print': 'onClickPrintHandler',
				'click #delete': 'onClickDeleteHandler'
			},

			initialize: function() {
				_.bindAll(this, 'render', 'onClickPrintHandler', 'onClickDeleteHandler');
			},

			render: function() {
				var self = this;

				this.model = new PositionModel(model);

				this.mapOptions = {
					center: new google.maps.LatLng(52.082875, 5.099719),
					zoom: 12,
					mapTypeId: google.maps.MapTypeId.ROADMAP
				};
				this.geocoder = new google.maps.Geocoder();
				this.map = new google.maps.Map( $('#map').get(0), self.mapOptions);

				this.directionsService = new google.maps.DirectionsService();
				this.directionsDisplay = new google.maps.DirectionsRenderer();
				this.directionsDisplay.setMap(self.map);

				this.request = {
					origin: 'Boslaan 13 Zeist',
					destination: this.model.get('location'),
					travelMode: google.maps.TravelMode.DRIVING
				};

				this.directionsService.route(self.request, function(response, status) {
					if (status == google.maps.DirectionsStatus.OK) {
						self.directionsDisplay.setDirections(response);
						$(self.el).find('#duration').text(_.first(_.first(response.routes).legs).duration.text + " | " + _.first(_.first(response.routes).legs).distance.text);
					}
				});


				return this;
			},

			onClickPrintHandler: function(event) {
				var printSettings = $('#printsettings').serializeArray();

				_.each(printSettings, function(value) {
					if (value.name === 'directions') {
						$('#map').removeClass('noprint');
					}
				});

				window.print();
			},

			onClickDeleteHandler: function(event) {
				this.model.destroy({
					success: function(model, response, options) {
						$(location).attr('href', 'http://localhost:3000/positions');
					}
				});
			}

		});
		
		return new positionView();
	});