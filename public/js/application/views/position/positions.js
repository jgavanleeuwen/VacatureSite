define([
	'jquery',
	'underscore',
	'backbone',
	'getbootstrap',
	'modernizr',
	'collections/positions',
	'text!views/position/helpers/marker.html'
], function($, _, Backbone, GetBootstrap, Modernizr, PositionCollection, MarkerTemplate) {
		var positionView = Backbone.View.extend({
			el: 'body',

			events: {
				'click a#mapview': 'onTabMapViewHandler'
			},

			initialize: function() {
				_.bindAll(this, 'render', 'onTabMapViewHandler' );
			},

			render: function() {

				return this;
			},

			onTabMapViewHandler: _.once(function(event) {

				var self = this;

				this.mapOptions = {
					center: new google.maps.LatLng(52.082875, 5.099719),
					zoom: 8,
					mapTypeId: google.maps.MapTypeId.ROADMAP
				};

				this.map = new google.maps.Map( $('#mapper').get(0), self.mapOptions);
				this.collection = new PositionCollection(collection);
				this.geocoder = new google.maps.Geocoder();
				this.infowindow = new google.maps.InfoWindow({ width: '300px'});

				this.collection.each(function(m) {
					self.geocoder.geocode({address: m.get('location')}, function(results, status) {
						if (status == google.maps.GeocoderStatus.OK) {
							var tpl = _.template(MarkerTemplate, m.attributes);
							var marker = new google.maps.Marker({
								position: results[0].geometry.location,
								map: self.map,
								animation: google.maps.Animation.DROP,
								content: tpl
							});
							google.maps.event.addListener(marker, 'click', function() {
								self.infowindow.setContent(marker.content);
								self.infowindow.open(self.map, marker);
							});
						}
					});
				});

			})

		});
		
		return new positionView();
	});