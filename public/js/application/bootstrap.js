require.config({
	paths: {
		// Libs
		jquery: 'http://code.jquery.com/jquery-latest.min',
		underscore: '../libs/underscore/underscore.min',
		backbone: '../libs/backbone/backbone.min',

		// Plugins
		scrollto: '../plugins/scrollto/scrollto.min',

		// Twitter Bootstrap
		getbootstrap: '../plugins/bootstrap/bootstrap.min',

		// Modernizr
		modernizr: 'http://modernizr.com/downloads/modernizr-latest',

		// TypeAhead
		typeahead: '../plugins/typeahead/typeahead.min',

		// Tinyeditor
		tinyeditor: '../plugins/tinyeditor/tiny.editor',

		// D3
		d3: '../libs/d3/d3.min',

		// Moment
		moment: '../plugins/moment/moment.min'
	},
	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},
		getbootstrap: {
			deps: ['jquery']
		},
		typeahead: {
			deps: ['jquery']
		}
	},
	deps: ["main"]
});