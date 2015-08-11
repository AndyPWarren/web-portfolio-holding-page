module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    config: {
      src: 'src',
      dist: 'dist'
    },

    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        hostname: '0.0.0.0'
      },
      livereload: {
        options: {
          open: 'http://localhost:9000',
          base: [
            './'
          ]
        }
      }
    },

    clean: {
      dev: ['<%= config.dist %>/**/*.{html,xml}', '<%= config.dist %>/assets/**/*.!(jpg)'],
      build: ['<%= config.dist %>/**/*']
    },

    less: {
      dev: {
        options: {
          paths: ['./styles','bower_components'],
        },
        files: {
          './styles/theme.css': 'styles/less/main.less'
        }
      },
      build: {
        options: {
          paths: ['./styles'],
          cleancss: true
        },
        files: {
            '<%= config.dist %>/styles/theme.css': 'styles/less/main.less'
        }
      }
    },

    copy: {
      assets: {
        files: [{
          expand: true,
          cwd: 'assets',
          src: ['**'],
          dest: '<%= config.dist %>/assets/'
        }]
      }
    },

    watch: {
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '*.html',
          'styles/less/*.less'
        ],
        tasks: ['less:dev']
      }
    },

    htmlmin: {
      build: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: [{
          expand: true,
          cwd: './',
          src: '*.html',
          dest: '<%= config.dist %>/'
        }]
      }
    }

  });

  // Default task(s).
  grunt.registerTask('default', ['dev']);

  grunt.registerTask('dev', [
    'connect:livereload',
    'watch'

  ]);

  grunt.registerTask('build', [
    'clean:build',
    'copy',
    'less:build',
    'htmlmin:build'
  ]);



};
