module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Watch for changes; perform relevant task
    watch: {
      sass: {
        files: ['sass/**'],
        tasks: ['sass']
      },
      browserify: {
        files: ['react/**'],
        tasks: ['browserify']
      }
    },

    // Compile Sass into CSS
    sass: {
      dist: {
        options: {
          style: 'compressed',
          noCache: true
        },
        files: [{
          expand: true,
          cwd: 'sass',
          src: ['*.scss'],
          dest: 'public/styles',
          ext: '.css'
        }]
      }
    },
    browserify: {
      dist: {
        files: {
          'public/js/bundle.js': ['react/*.js']
        }
      }
    }
  });

  grunt.registerTask("compile", ['sass', 'browserify']);
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');
};