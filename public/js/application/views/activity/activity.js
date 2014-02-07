define([
	'jquery',
	'underscore',
	'backbone',
	'tinyeditor',
	'getbootstrap',
	'modernizr',
	'd3',
	'collections/activities'
], function($, _, Backbone, TinyEditor, GetBootstrap, Modernizr, d3, ActivityCollection) {
		var activityView = Backbone.View.extend({
			el: 'body',

			initialize: function() {

				_.bindAll(this);
				
			},

			events: {
				"click #loadmore": 'onClickLoadMoreHandler'
			},

			drawGraph: function( data ) {

				var w = $('#graph').width();
				var h = $('#graph').height();

				var x = d3.scale.linear().domain([0, _.size(data)]).range([0, w]);
				var y = d3.scale.linear().domain([0, _.max(data)]).range([0, h - 10]);

				var svg = d3.select('#graph')
					.append('svg')
						.attr('width', '100%')
						.attr('height', h);

				svg.selectAll("rect")
						.data(data)
					.enter().append("rect")
						.attr("x", function(d, i) { return x(i) + 4; })
						.attr("y", function(d, i) { return h - y(d); })
						.attr("width", 3)
						.attr("height", function(d, i) { return y(d); })
						.style("fill", "#CCC");

				svg.selectAll("circle") 
						.data(data)
					.enter().append("circle")
						.attr("cx", function(d, i) { return x(i) + 5.5; }) 
						.attr("cy", function(d) { return h - y(d); }) 
						.attr("r", 3)
						.attr("fill", "#FFF")
						.style("stroke", "#CCC")
						.style("stroke-width", 3);

			},

			render: function() {

				this.activityCollection = new ActivityCollection();
				this.activityCollection.set(data);

				var self = this;

				var da = _.map(_.pluck(_.pluck(self.activityCollection.models, 'attributes'), 'date'), function(d) {
					return new Date(d).getMinutes();
				});

				var time = [];
				for(var i = 0; i < 60; i++) {
					time.push(0);

					var x = 0;
					for(var y = 0; y < da.length; y++) {
						if (da[y] === i) x ++;
					}
					time[i] = x;
				}

				this.drawGraph(time);

				return this;
			},

			onClickLoadMoreHandler: function(event) {
				console.log('LOAD MOFO');
			}

		});
		
		return new activityView();
	});