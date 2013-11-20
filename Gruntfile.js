module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            all: ['build'],
            cache: ['build/cache'],
            release: ['build/releases'],
            generated: ['build/generated']
        },
        copy: {
            dev: {
                files: [{
                    expand: true,
                    cwd: 'libs/',
                    src: ['jquery/jquery.js', 'bootstrap/dist/js/bootstrap.js', 'angular/angular.js'],
                    dest: 'build/generated/libs/',
                    flatten: true
                }, {
                    expand: true,
                    cwd: 'libs/bootstrap/dist/',
                    src: ['fonts/*', 'css/*.css', '!css/*.min.css'],
                    dest: 'build/generated/'
                }, {
                    expand: true,
                    cwd: 'src/',
                    src: ['css/*', 'images/*', 'js/*'],
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
                        scripts: ['libs/jquery.js', 'libs/bootstrap.js', 'libs/angular.js'],
                        csss: ['css/bootstrap.css', 'css/bootstrap-theme.css']
                    }
                },
                files: {
                    'build/generated/index.html': ['src/html/index.html.tpl']
                }
            },
            dist: {
                options: {
                    data: {
                        scripts: ["apps/allInOne.min.js"],
                        csss: ['css/allInOne.min.css']
                    }
                },
                files: {
                    'build/generated/index.html': ['src/html/index.html.tpl']
                }
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
        }
    });

    grunt.loadNpmTasks('grunt-node-webkit-builder');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-template');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['clean:release', 'clean:generated', 'copy:dev', 'template:dev', 'nodewebkit:dev_internal']);
};