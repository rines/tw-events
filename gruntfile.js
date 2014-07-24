module.exports = function(grunt) {
  grunt.initConfig({
    express: {
      all: {
        options: {
          port: 9000,
          hostname: 'localhost',
          bases: ['www'],
          livereload: true
        }
      }
    },
    less: {
      development: {
        options: {
          paths: ['src/less'],
        },
        files: {
          'www/css/styles.css': 'src/less/*.less'
        }
      }
    },
    watch: {
      files: 'src/less/*.less',
      tasks: ['less']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express');

  grunt.registerTask('server', ['express', 'watch']);
};
