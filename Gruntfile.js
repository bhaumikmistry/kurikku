module.exports = function (grunt) {

	// Project confirguration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jade:{
			compile:{
				options:{
					pretty: true,
				},
				files:{
					"index.html":"build/index.jade"
				}
			}
		},
		sass: {
			dist: {
				files: {
					"css/style.css":"build/style.sass"
				}
			}
		},
		watch:{
			grunt:{ files:['Gruntfile.js'] },
			jade:{
				files: ['build/*.jade'],
				tasks: ['jade']
			},
			sass:{
				files: ['build/*.sass'],
				tasks: ['sass']
			}
		}
	});

	//Tasks
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-sass');
	//default
	grunt.registerTask('default',['jade','sass','watch']);


};