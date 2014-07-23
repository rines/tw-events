module.exports = function(grunt) {
  grunt.initConfig({
    less: {
      development: {
        options: {
          paths: ["src/less"],
        },
        files: {
          "www/css/styles.css": "src/less/*.less"
        }
      }
    },
    watch: {
      files: "src/less/*.less",
      tasks: ["less"]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['watch']);
};
