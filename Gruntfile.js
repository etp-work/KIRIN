module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            all: ['build'],
            cache: ['build/cache'],
            release: ['build/releases'],
            generated: ['build/generated']
        },
        concat: {
            dev: {
                src: ['src/js/core/BootLoader.js', 'src/js/controllers/*.js'],
                dest: 'build/generated/js/allInOneJS.js'
            },
            dist: {
                src: ['libs/jquery/jquery.min.js', 'libs/bootstrap/dist/js/bootstrap.min.js', 'libs/angular/angular.min.js', 'libs/angular-route/angular-route.min.js', 'libs/ng-grid/ng-grid-2.0.7.min.js', 'src/js/core/BootLoader.js', 'src/js/controllers/*.js'],
                dest: 'build/generated/js/allInOneJS.min.js'
            }
        },
        sass: {
            dev: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['css/**/*.scss'],
                    dest: 'build/generated/',
                    ext: '.css'
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['css/**/*.scss'],
                    dest: 'build/generated/',
                    ext: '.css'
                }]
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
                    src: ['images/**/*'],
                    dest: 'build/generated/'
                }, {
                    src: 'src/config/package.json',
                    dest: 'build/generated/package.json'
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'libs/bootstrap/dist/',
                    src: ['fonts/*'],
                    dest: 'build/generated/'
                }, {
                    expand: true,
                    cwd: 'src/',
                    src: ['images/*'],
                    dest: 'build/generated/'
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
                        scripts: ['libs/jquery.js', 'libs/bootstrap.js', 'libs/angular.js', 'libs/angular-route.js', 'libs/ng-grid-2.0.7.debug.js', 'js/allInOneJS.js'],
                        csss: ['css/bootstrap.css', 'css/bootstrap-theme.css', 'css/ng-grid.css', 'css/style.css']
                    }
                },
                files: [{
                    expand: true,
                    cwd: 'src/html/',
                    src: ['**/*.tpl'],
                    dest: 'build/generated/',
                    ext: '.html'
                }]
            },
            dist: {
                options: {
                    data: {
                        scripts: ["js/allInOneJS.min.js"],
                        csss: ['css/allInOne.min.css']
                    }
                },
                files: [{
                    expand: true,
                    cwd: 'src/html/',
                    src: ['**/*.tpl'],
                    dest: 'build/generated/',
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
                files: ['src/html/**/*', 'src/js/**/*', 'src/css/**/*', 'src/images/**/*'],
                tasks: ['clean:generated', 'sass:dev', 'copy:dev', 'template:dev'],
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

    grunt.registerTask('default', ['clean:generated', 'concat:dev', 'sass:dev', 'copy:dev', 'template:dev', 'connect:server', 'watch:dev']);
    grunt.registerTask('dev', ['clean:release', 'clean:generated', 'concat:dev', 'sass:dev', 'copy:dev', 'template:dev', 'nodewebkit:dev_internal']);
};