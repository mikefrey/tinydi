
module.exports = function(grunt) {

  grunt.initConfig({

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'tinydi.js',
        'test/**/*.js'
      ]
    },

    uglify: {
      build: {
        options: {
          mangle: true,
          compress: true
        },
        files: {
          'tinydi.min.js': ['tinydi.js']
        }
      }
    }

  })

  grunt.registerTask('default', ['jshint', 'uglify'])

  grunt.loadNpmTasks('grunt-contrib-jshint')
  grunt.loadNpmTasks('grunt-contrib-uglify')

}