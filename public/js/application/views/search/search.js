define([
	'jquery',
	'underscore',
	'backbone',
	'getbootstrap',
	'modernizr',
	'typeahead',
	'text!views/search/helpers/suggest.html',
	'text!views/search/helpers/suggestUser.html',
	'text!views/search/helpers/suggestTag.html'
], function($, _, Backbone, GetBootstrap, Modernizr, Typeahead, SuggestTemplate, SuggestUserTemplate, SuggestTagTemplate) {
		var searchView = Backbone.View.extend({
			el: 'body',

			initialize: function() {
				_.bindAll(this);

				$('input[name="query"]').typeahead([
						{
							name: 'companies',
							template: SuggestTemplate,
							header: '<span class="tt-header">Companies</span>',
							valueKey: 'name',
							engine: {
								compile: function(template) {
									var compiled = _.template(template);

									return {
										render: function(context) { return compiled(context); }
									};
								}
							},
							remote: {
								url: '/companies.json',
							}
						},
						{
							name: 'users',
							template: SuggestUserTemplate,
							header: '<span class="tt-header">Users</span>',
							valueKey: 'name',
							limit: 3,
							engine: {
								compile: function(template) {
									var compiled = _.template(template);

									return {
										render: function(context) { return compiled(context); }
									};
								}
							},
							remote: {
								url: '/search/results.json',
							}
						},
						{
							name: 'skills',
							template: SuggestTagTemplate,
							header: '<span class="tt-header">Skills</span>',
							valueKey: 'name',
							engine: {
								compile: function(template) {
									var compiled = _.template(template);

									return {
										render: function(context) { return compiled(context); }
									};
								}
							},
							remote: {
								url: '/tags?q=%QUERY'
							}
						}
				]);
			},

			render: function() {
				return this;
			}
		});
		
		return new searchView();
	});