module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		// Task: Lint all JS files
		jshint: {
			files: ['public/js/**/*.js', 'app/**/*.js', 'config/**/*.js'],
			options: {
				jshintrc: ".jshintrc"
			}
		},

		// Task: Lint all HTML files
		htmllint: {
			all: ["app/views/**/*.html.ejs"]
		},

		// Task: Compile SASS to CSS
		less: {
			compile: {
				files: {
					'public/styles/style.css': 'public/styles/style.less'
				}
			}
		},

		// Task: Lint CSS
		csslint: {
			strict: {
				options: {
			    csslintrc: '.csslintrc'
			  },
				src: ['public/styles/style.css']
			}
		},

		// Task: Scaffold
		mkdir: {
			all: {
				options: {
					create: [
						'app/views/' + grunt.option('resource'),
						'app/views/' + grunt.option('resource') + '/mixins'
					]
				}
			}
		},

		'file-creator': {
			basic: {
				"app/controllers/<%= grunt.option('resource') %>_controller.js": function(fs, fd, done) {
					fs.writeSync(fd, '// Test');
					done();
				},
				"app/views/<%= grunt.option('resource') %>/index.html.jade": function(fs, fd, done) {
					fs.writeSync(fd, '// Index');
					done();
				},
				"app/views/<%= grunt.option('resource') %>/show.html.jade": function(fs, fd, done) {
					fs.writeSync(fd, '// Show');
					done();
				},
				"app/views/<%= grunt.option('resource') %>/edit.html.jade": function(fs, fd, done) {
					fs.writeSync(fd, '// Edit');
					done();
				},
				"app/views/<%= grunt.option('resource') %>/new.html.jade": function(fs, fd, done) {
					fs.writeSync(fd, '// New');
					done();
				},
				"app/views/mixins/<%= grunt.option('resource') %>/mixins.html.jade": function(fs, fd, done) {
					fs.writeSync(fd, '// Mixins');
					done();
				}
			}
		},

		// Task: Uglify build JS
		requirejs: {
			production: {
				options: {
					name: 'app',
					baseUrl: "public/js/application",
					mainConfigFile: "public/js/application/bootstrap.js",
					out: "public/js/build/build.js"
				}
			}
		},

		// Task: Restart Node
		nodemon: {
			dev: {
				options: {
					file: 'app/server.js'
				}
			}
		},

		// Task: Concurrent
		concurrent: {
			dev: {
				options: {
					logConcurrentOutput: true
				},
				tasks: ['watch', 'nodemon']
			}
		},

		// Task: Mocha
		mochaTest: {
			src: ['test/**/*.js']
		},

		// Task: Watch
		watch: {
			jshint: {
				files: ['public/js/**/*.js', 'Gruntfile.js', 'app/**/*.js', 'config/**/*.js'],
				tasks: ['jshint'],
				options: {
					livereload: true
				}
			},
			less: {
				files: ['public/styles/*.less'],
				tasks: ['less']
			},
			csslint: {
				files: ['public/styles/style.css'],
				tasks: ['csslint'],
				options: {
					livereload: true
				}
			},
			html: {
				files: ['app/views/**/*.html.jade', 'public/js/application/views/**/*.html'],
				options: {
					livereload: true
				}
			}
		}

	});

	// Load the plugin for watch
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Load the plugin for JSHint
	grunt.loadNpmTasks('grunt-contrib-jshint');

	// Load the plugin for HTML lint
	grunt.loadNpmTasks('grunt-html');

	// Load the plugin for HTML lint
	grunt.loadNpmTasks('grunt-contrib-csslint');

	// Load the plugin for LESS
	grunt.loadNpmTasks('grunt-contrib-less');

	 // Load the plugin for RequireJS
	grunt.loadNpmTasks('grunt-contrib-requirejs');

	// Load the plugin for develop
	grunt.loadNpmTasks('grunt-nodemon');

	// Load the plugin for parrallel tasks
	grunt.loadNpmTasks('grunt-concurrent');

	// Load the plugin for mocha tests
	grunt.loadNpmTasks('grunt-mocha-test');

	// Load the plugin for scaffolding (dirs)
	grunt.loadNpmTasks('grunt-mkdir');
	
	// Load the plugin for scaffolding (files)
	grunt.loadNpmTasks('grunt-file-creator');

	// Default task(s)
	grunt.registerTask('default', ['jshint']);
};