define([
	'jquery',
	'underscore',
	'backbone',
	'tinyeditor',
	'getbootstrap',
	'modernizr'
], function($, _, Backbone, TinyEditor, GetBootstrap, Modernizr) {
		var indexView = Backbone.View.extend({
			el: 'body',

			events: {
				"dragover .droparea": "onFileDragOverHandler",
				"dragenter .droparea": "onFileDragEnterHandler",
				"dragleave .droparea": "onFileDragLeaveHandler",
				"drop .droparea": "onFileDropHandler"
			},

			initialize: function() {

				_.bindAll(this);
				
			},

			render: function() {

				if ($('#textarea').length) {
					this.editor = new TINY.editor.edit('body', {
						id: 'textarea',
						width: '100%',
						css:'body{ padding: 10px; font-family: Arial; color: #444; line-height: 1.8em; }',
						controlclass: 'tinyeditor-control',
						controls: ['bold', 'italic', 'underline', 'strikethrough', '|', 'orderedlist', 'unorderedlist', '|' ,'outdent' ,'indent', '|', 'leftalign', 'centeralign', 'rightalign', 'blockjustify', '|', 'unformat', '|', 'undo', 'redo', '|', 'cut', 'copy', 'paste']
					});
				}

				$('input[name="location"]').typeahead({
					name: 'locations',
					remote: {
						url: 'http://api.pro6pp.nl/v1/suggest?auth_key=Br8V1gpxRTaHMnqO&per_page=5&nl_city=%QUERY',
						filter: function(response) {
							return _.map(response.results, function(result) {
								return result.city + ', ' + result.province;
							});
						}
					}
				});

				$('input[name="name"]').typeahead({
					name: 'accounts',
					remote: {
						url: '/tags?q=%QUERY'
					}
				});

				return this;
			},

			onFileDragEnterHandler: function(event) {
				event.stopPropagation();
				event.preventDefault();
			},

			onFileDragOverHandler: function(event) {
				event.stopPropagation();
				event.preventDefault();
			},

			onFileDragLeaveHandler: function(event) {
			},

			onFileDropHandler: function(event) {
				event.stopPropagation();
				event.preventDefault();


				var fileReader = new FileReader();
				var file = event.originalEvent.dataTransfer.files[0];
				var self = this;

				fileReader.onloadstart = function(event) {
				};

				fileReader.onload = function(event) {
					$('.droparea').html('<img src="' + fileReader.result + '" height="80" />');
				};

				fileReader.onprogress = function(event) {
					// PROGRESS
				};

				fileReader.readAsDataURL(file);
			}


		});
		
		return new indexView();
	});