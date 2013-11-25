module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            all: ['build'],
            cache: ['build/cache'],
            release: ['build/releases'],
            generated: ['build/generated']
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */'
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/core/',
                    src: ['BootLoader.js', '**/*.js'],
                    dest: 'build/generated/tmp/js/',
                    ext: '.min.js'
                }, {
                    expand: true,
                    cwd: 'src/apps/',
                    src: ['**/js/*.js'],
                    dest: 'build/generated/tmp/js/',
                    ext: '.min.js',
                    flatten: true
                }]
            }
        },
        sass: {
            dev: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['css/*.scss', 'apps/**/css/*.scss'],
                    dest: 'build/generated/tmp/css/',
                    ext: '.css',
                    flatten: true
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['css/*.scss', 'apps/**/css/*.scss'],
                    dest: 'build/generated/tmp/css/',
                    ext: '.css',
                    flatten: true
                }]
            }
        },
        cssmin: {
            dist: {
                files: {
                    'build/generated/css/allInOneCss.min.css': ['build/generated/tmp/css/*.css']
                }
            }
        },
        concat: {
            dev: {
                files: {
                    'build/generated/libs/allInOneJS.js': ['src/core/BootLoader.js', 'src/core/**/*.js', 'src/apps/**/js/**/*.js'],
                    'build/generated/css/allInOneCss.css': ['build/generated/tmp/css/*.css']
                }
            },
            dist: {
                files: {
                    'build/generated/libs/allInOneJS.min.js': ['build/generated/tmp/js/BootLoader.min.js', 'build/generated/tmp/js/*.min.js']
                }
            }
        },
        copy: {
            dev: {
                files: [{
                    expand: true,
                    cwd: 'libs/',
                    src: ['jquery/jquery.js', 'bootstrap/dist/js/bootstrap.js', 'angular/angular.js', 'angular-route/angular-route.js', 'ng-grid/ng-grid-2.0.7.debug.js'],
                    dest: 'build/generated/libs/',
                    flatten: true
                }, {
                    expand: true,
                    cwd: 'libs/',
                    src: ['bootstrap/dist/fonts/*'],
                    dest: 'build/generated/fonts/',
                    flatten: true
                }, {
                    expand: true,
                    cwd: 'libs/',
                    src: ['bootstrap/dist/css/*.css', '!bootstrap/dist/css/*.min.css', 'ng-grid/ng-grid.css'],
                    dest: 'build/generated/css/',
                    flatten: true
                }, {
                    expand: true,
                    cwd: 'src/',
                    src: ['images/*', 'apps/**/images/*'],
                    dest: 'build/generated/images/',
                    flatten: true
                }, {
                    src: 'src/config/package.json',
                    dest: 'build/generated/package.json'
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'libs/',
                    src: ['jquery/jquery.min.js', 'bootstrap/dist/js/bootstrap.min.js', 'angular/angular.min.js', 'angular-route/angular-route.min.js', 'ng-grid/ng-grid-2.0.7.min.js'],
                    dest: 'build/generated/libs/',
                    flatten: true
                }, {
                    expand: true,
                    cwd: 'libs/bootstrap/dist/',
                    src: ['fonts/*'],
                    dest: 'build/generated/'
                }, {
                    expand: true,
                    cwd: 'libs/',
                    src: ['bootstrap/dist/css/*.min.css', 'ng-grid/ng-grid.min.css'],
                    dest: 'build/generated/css/',
                    flatten: true
                }, {
                    expand: true,
                    cwd: 'src/',
                    src: ['images/*', 'apps/**/images/*'],
                    dest: 'build/generated/images/',
                    flatten: true
                }, {
                    src: 'src/config/package.json',
                    dest: 'build/generated/package.json'
                }]
            }
        },
        template: {
            dev: {
                options: {
                    data: {
                        scripts: ['libs/jquery.js', 'libs/bootstrap.js', 'libs/angular.js', 'libs/angular-route.js', 'libs/ng-grid-2.0.7.debug.js', 'libs/allInOneJS.js'],
                        csss: ['css/bootstrap.css', 'css/bootstrap-theme.css', 'css/ng-grid.css', 'css/allInOneCss.css']
                    }
                },
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['index.html.tpl'],
                    dest: 'build/generated/',
                    ext: '.html'
                }, {
                    expand: true,
                    cwd: 'src/apps/',
                    src: ['**/html/*.tpl'],
                    dest: 'build/generated/partials/',
                    ext: '.html'
                }]
            },
            dist: {
                options: {
                    data: {
                        scripts: ['libs/jquery.min.js', 'libs/bootstrap.min.js', 'libs/angular.min.js', 'libs/angular-route.min.js', 'libs/ng-grid-2.0.7.min.js', "libs/allInOneJS.min.js"],
                        csss: ['css/bootstrap.min.css', 'css/bootstrap-theme.min.css', 'css/ng-grid.min.css', 'css/allInOneCss.min.css']
                    }
                },
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['index.html.tpl'],
                    dest: 'build/generated/',
                    ext: '.html'
                }, {
                    expand: true,
                    cwd: 'src/apps/',
                    src: ['**/html/*.tpl'],
                    dest: 'build/generated/partials/',
                    ext: '.html'
                }]
            }
        },
        nodewebkit: {
            options: {
                version: '0.8.0',
                build_dir: 'build/',
                win: true,
                mac: false,
                linux32: false,
                linux64: false,
                keep_nw: false
            },
            dev_internal: {
                options: {
                    download_url: 'http://142.133.49.165/node-webkit/'
                },
                src: 'build/generated/**/*'
            },
            dev_external: {
                src: 'build/generated/**/*'
            }
        },
        watch: {
            dev: {
                files: ['src/index.html.tpl', 'src/apps/**/*', 'src/css/**/*', 'src/images/**/*', 'src/core/**/*'],
                tasks: ['clean:generated', 'sass:dev', 'concat:dev', 'copy:dev', 'template:dev'],
                options: {
                    livereload: true
                }
            }
        },
        connect: {
            server: {
                options: {
                    port: 9898,
                    base: 'build/generated/'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-node-webkit-builder');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-template');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['clean:generated', 'sass:dev', 'concat:dev', 'copy:dev', 'template:dev', 'connect:server', 'watch:dev']);
    grunt.registerTask('exei', ['clean:generated', 'sass:dev', 'concat:dev', 'copy:dev', 'template:dev', 'nodewebkit:dev_internal']);
    grunt.registerTask('exee', ['clean:generated', 'sass:dev', 'concat:dev', 'copy:dev', 'template:dev', 'nodewebkit:dev_external']);

    grunt.registerTask('dist', ['clean:release', 'clean:generated', 'uglify:dist', 'sass:dist', 'cssmin:dist', 'concat:dist', 'copy:dist', 'template:dist', 'connect:server', 'watch:dev']);
    grunt.registerTask('disti', ['clean:release', 'clean:generated', 'uglify:dist', 'sass:dist', 'cssmin:dist', 'concat:dist', 'copy:dist', 'template:dist', 'nodewebkit:dev_internal']);
    grunt.registerTask('diste', ['clean:release', 'clean:generated', 'uglify:dist', 'sass:dist', 'cssmin:dist', 'concat:dist', 'copy:dist', 'template:dist', 'nodewebkit:dev_external']);
};