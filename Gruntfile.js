module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            all: ['build'],
            cache: ['build/cache'],
            release: ['build/releases'],
            generated: ['build/generated']
        },
        exec: {
            dev: {
                cmd: 'npm install',
                cwd: 'src/'
            },
            dist: {
                cmd: 'npm install',
                cwd: 'src/'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */'
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['core/BootLoader.js', 'core/*.js'],
                    dest: 'build/generated/tmp/js/',
                    ext: '.min.js'
                }, {
                    expand: true,
                    cwd: 'src/apps/',
                    src: ['**/js/*.js'],
                    dest: 'build/generated/tmp/js/',
                    ext: '.min.js'
                }]
            }
        },
        sass: {
            options: {
                trace: true,
                check: true
            },
            dev: {
                files: [{
                    expand: true,
                    cwd: 'src/css/',
                    src: ['style.scss'],
                    dest: 'build/generated/tmp/css/',
                    ext: '.css'
                }, {
                    expand: true,
                    cwd: 'src/apps/',
                    src: ['**/css/*.scss'],
                    dest: 'build/generated/tmp/css/',
                    ext: '.css'
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/css/',
                    src: ['style.scss'],
                    dest: 'build/generated/tmp/css/',
                    ext: '.css'
                }, {
                    expand: true,
                    cwd: 'src/apps/',
                    src: ['**/css/*.scss'],
                    dest: 'build/generated/tmp/css/',
                    ext: '.css'
                }]
            }
        },
        cssmin: {
            dist: {
                files: {
                    'build/generated/css/allInOneCss.min.css': ['build/generated/tmp/css/style.min.css', 'build/generated/tmp/css/**/css/*.min.css']
                }
            }
        },
        concat: {
            dev: {
                files: {
                    'build/generated/libs/allInOneJS.js': ['src/core/BootLoader.js', 'src/core/**/*.js', 'src/apps/**/js/**/*.js'],
                    'build/generated/css/allInOneCss.css': ['build/generated/tmp/css/style.css', 'build/generated/tmp/css/**/css/*.css']
                }
            },
            dist: {
                files: {
                    'build/generated/libs/allInOneJS.min.js': ['build/generated/tmp/js/core/BootLoader.min.js', 'build/generated/tmp/js/core/*.min.js', 'build/generated/tmp/js/**/js/*.min.js']
                }
            }
        },
        copy: {
            dev: {
                files: [{
                    expand: true,
                    cwd: 'libs/',
                    src: ['jquery/jquery.js', 'bootstrap/dist/js/bootstrap.js', 'angular/angular.js', 'angular-route/angular-route.js', 'angular-resource/angular-resource.js', 'angular-animate/angular-animate.js', 'angular-local-storage/angular-local-storage.js', 'ng-grid/ng-grid-2.0.7.debug.js'],
                    dest: 'build/generated/libs/',
                    flatten: true
                }, {
                    expand: true,
                    cwd: 'libs/',
                    src: ['bootstrap/dist/fonts/*', 'font-awesome/fonts/*'],
                    dest: 'build/generated/fonts/',
                    flatten: true
                }, {
                    expand: true,
                    cwd: 'libs/',
                    src: ['bootstrap/dist/css/*.css', '!bootstrap/dist/css/*.min.css', 'ng-grid/ng-grid.css', 'font-awesome/css/font-awesome.css'],
                    dest: 'build/generated/css/',
                    flatten: true
                }, {
                    expand: true,
                    cwd: 'src/',
                    src: ['images/*', 'apps/**/images/*'],
                    dest: 'build/generated/images/',
                    flatten: true
                }, {
                    expand: true,
                    cwd: 'src/',
                    src: ['apps/**/data/*'],
                    dest: 'build/generated/data/',
                    flatten: true
                }, {
                    src: 'src/package.json',
                    dest: 'build/generated/package.json'
                }, {
                    expand: true,
                    cwd: 'src/',
                    src: ['node_modules/**/*'],
                    dest: 'build/generated/'
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'libs/',
                    src: ['jquery/jquery.min.js', 'bootstrap/dist/js/bootstrap.min.js', 'angular/angular.min.js', 'angular-route/angular-route.min.js', 'angular-resource/angular-resource.min.js', 'angular-animate/angular-animate.min.js', 'angular-local-storage/angular-local-storage.min.js', 'ng-grid/ng-grid-2.0.7.min.js'],
                    dest: 'build/generated/libs/',
                    flatten: true
                }, {
                    expand: true,
                    cwd: 'libs/',
                    src: ['bootstrap/dist/fonts/*', 'font-awesome/fonts/*'],
                    dest: 'build/generated/fonts/',
                    flatten: true
                }, {
                    expand: true,
                    cwd: 'libs/',
                    src: ['bootstrap/dist/css/*.min.css', 'ng-grid/ng-grid.min.css', 'font-awesome/css/font-awesome.min.css'],
                    dest: 'build/generated/css/',
                    flatten: true
                }, {
                    expand: true,
                    cwd: 'src/',
                    src: ['images/*', 'apps/**/images/*'],
                    dest: 'build/generated/images/',
                    flatten: true
                }, {
                    expand: true,
                    cwd: 'src/',
                    src: ['apps/**/data/*'],
                    dest: 'build/generated/data/',
                    flatten: true
                }, {
                    src: 'src/package.json',
                    dest: 'build/generated/package.json'
                }, {
                    expand: true,
                    cwd: 'src/',
                    src: ['node_modules/**/*'],
                    dest: 'build/generated/'
                }]
            }
        },
        template: {
            dev: {
                options: {
                    data: {
                        scripts: ['libs/jquery.js', 'libs/bootstrap.js', 'libs/angular.js', 'libs/angular-route.js', 'libs/angular-resource.js', 'libs/angular-animate.js', 'libs/angular-local-storage.js', 'libs/ng-grid-2.0.7.debug.js', 'libs/allInOneJS.js'],
                        csss: ['css/bootstrap.css', 'css/bootstrap-theme.css', 'css/ng-grid.css', 'css/font-awesome.css', 'css/allInOneCss.css']
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
                        scripts: ['libs/jquery.min.js', 'libs/bootstrap.min.js', 'libs/angular.min.js', 'libs/angular-route.min.js', 'libs/angular-resource.min.js', 'libs/angular-animate.min.js', 'libs/angular-local-storage.min.js', 'libs/ng-grid-2.0.7.min.js', "libs/allInOneJS.min.js"],
                        csss: ['css/bootstrap.min.css', 'css/bootstrap-theme.min.css', 'css/ng-grid.min.css', 'css/font-awesome.min.css', 'css/allInOneCss.min.css']
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
            dev: {
                src: 'build/generated/**/*'
            }
        },
        watch: {
            dev: {
                files: ['src/index.html.tpl', 'src/core/**/*', 'src/css/**/*.scss', 'src/images/*', 'src/apps/**/css/**/*.scss', 'src/apps/**/images/**/*', 'src/apps/**/js/**/*.js', 'src/apps/**/html/**/*.html.tpl'],
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
        },
        jshint: {
            all: ['Gruntfile.js', 'src/**/*.js', '!src/node_modules/**/*']
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
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('default', ['clean:generated', 'jshint', 'sass:dev', 'concat:dev', 'copy:dev', 'template:dev', 'connect:server', 'watch:dev']);
    grunt.registerTask('devexe', ['clean:generated', 'clean:release', 'jshint', 'sass:dev', 'concat:dev', 'exec:dev', 'copy:dev', 'template:dev', 'nodewebkit:dev']);

    grunt.registerTask('dist', ['clean:release', 'clean:generated', 'jshint', 'uglify:dist', 'sass:dist', 'cssmin:dist', 'concat:dist', 'copy:dist', 'template:dist', 'connect:server', 'watch:dev']);
    grunt.registerTask('distexe', ['clean:release', 'clean:generated', 'jshint', 'uglify:dist', 'sass:dist', 'cssmin:dist', 'concat:dist', 'exec:dist', 'copy:dist', 'template:dist', 'nodewebkit:dev']);
};