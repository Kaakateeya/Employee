// Gruntfile.js

// our wrapper function (required by grunt and its plugins)
// all configuration goes inside this function
var fs = require('fs');
var packageJson = JSON.parse(fs.readFileSync('./package.json'));
var plugins = packageJson.buildSettings.plugins;
var css = packageJson.buildSettings.css;
module.exports = function(grunt) {
    console.log(plugins);
    // ===========================================================================
    // CONFIGURE GRUNT ===========================================================
    // ===========================================================================
    grunt.initConfig({

        // get the configuration info from package.json ----------------------------
        // this way we can use things like name and version (pkg.name)
        pkg: grunt.file.readJSON('package.json'),

        // all of our configuration will go here
        jshint: {
            options: {
                reporter: require('jshint-stylish') // use jshint-stylish to make our errors look and read good
            },

            // when this task is run, lint the Gruntfile and all js files in src
            build: ['Grunfile.js', 'app/**/*.js']
        },
        uglify: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n',
                report: 'min',
                mangle: false
            },
            build: {
                files: {

                    'dist/js/main.min.js': ['dist/src/main.js']
                }
            }
        },
        cssmin: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            build: {
                files: [{
                        'dist/css/main.min.css': 'dist/src/main.css'
                    }

                ]

            }
        },
        dev_prod_switch: {
            options: {
                // Can be ran as `grunt --env=dev` or `grunt --env=prod`
                environment: grunt.option('env') || 'dev',
                env_char: '#',
                env_block_dev: 'env:dev',
                env_block_dev: 'SCRIPTS DATA',
                env_block_prod: 'SCRIPTSP DATA',
                env_block_test: 'env:test'
            },
            all: {
                files: {
                    'index.html': 'index.html',
                    'index.js': 'index.js'
                }
            }
        },
        scriptlinker: {
            dev: {
                options: {
                    startTag: '<!-- SCRIPTS DATA -->',
                    endTag: '<!--SCRIPTS END-->',
                    fileTmpl: '<script src="%s"></script>',
                    appRoot: ''
                },
                files: [{
                    // Target-specific file lists and/or options go here. 
                    'index.html': [
                        plugins, 'index.js', 'app/**/*.js'
                    ]
                }],
            },
            prod: {
                options: {
                    startTag: '<!-- SCRIPTSP DATA -->',
                    endTag: '<!--SCRIPTSP END-->',
                    fileTmpl: '<script src="%s"></script>',
                    appRoot: ''
                },
                files: {
                    // Target-specific file lists and/or options go here. 
                    'index.html': [plugins, 'index.js', 'dist/js/*.js']
                },
            },
        },
        concat: {
            options: {
                stripBanners: true,
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %> */',
                banner: "'use strict';\n",
                // process: function(src, filepath) {
                //     return '// Source: ' + filepath + '\n' +
                //         src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
                // },
                // separator: ';'
            },
            js: { //target
                src: ['app/**/*.js'],
                dest: 'dist/src/main.js'
            },
            css: {
                src: css,
                dest: 'dist/src/main.css'
            }
        },
        copy: {
            images: {
                expand: true,
                cwd: 'src/images/',
                src: ['**/*'],
                dest: 'dist/images/',
                filter: 'isFile',
                flatten: true
            }
        },

        imagemin: { // Task            
            dynamic: { // Another target
                files: [{
                    expand: true, // Enable dynamic expansion
                    cwd: 'src/images', // Src matches are relative to this path
                    src: ['**/*.{png,jpg,gif}'], // Actual patterns to match
                    dest: 'dist/images' // Destination path prefix
                }]
            }
        },


        //grunt  Robot --option-path=testgruntttt

        mkdir: {
            all: {
                options: {
                    create: [grunt.option('option-path')]
                },
            },
        },
        "file-creator": {
            "option": {
                files: [{
                        file: ((grunt.option('option-path') + '/controller/') + (grunt.option('option-path') + "ctrl.js")),
                        method: function(fs, fd, done) {
                            done();
                        }
                    },
                    {
                        file: ((grunt.option('option-path') + '/model/') + (grunt.option('option-path') + "Mdl.js")),
                        method: function(fs, fd, done) {
                            done();
                        }
                    },
                    {
                        file: ((grunt.option('option-path') + '/service/') + (grunt.option('option-path') + "service.js")),
                        method: function(fs, fd, done) {
                            done();
                        }
                    },
                    {
                        file: ((grunt.option('option-path') + '/') + ("index.html")),
                        method: function(fs, fd, done) {
                            done();
                        }
                    }
                ]
            },
            options: {
                replacements: [{
                    pattern: 'parametervalue',
                    replacement: grunt.option('option-path')
                }]
            }
        },

        'string-replace': {
            dist: {
                files: [{
                        src: './PageCode/ctrlFormat.js',
                        dest: ((grunt.option('option-path') + '/controller/') + (grunt.option('option-path') + "ctrl.js"))
                    },
                    {
                        src: './PageCode/mdlFormat.js',
                        dest: ((grunt.option('option-path') + '/model/') + (grunt.option('option-path') + "Mdl.js"))
                    },
                    {
                        src: './PageCode/serviceFormat.js',
                        dest: ((grunt.option('option-path') + '/service/') + (grunt.option('option-path') + "service.js")),
                    },
                    {
                        src: './PageCode/viewFormat.html',
                        dest: ((grunt.option('option-path') + '/') + ("index.html"))
                    }
                ],
                options: {
                    replacements: [{
                        pattern: 'parametervalue',
                        replacement: grunt.option('option-path')
                    }]
                }
            }
        }

    });
    grunt.registerTask('default', ['jshint', 'cssmin', 'concat', 'scriptlinker:dev', 'imagemin']);

    // this task will only run the dev configuration 
    grunt.registerTask('dev', ['jshint', 'cssmin', 'concat', 'scriptlinker:dev', 'imagemin']);

    // only run production configuration 
    grunt.registerTask('prod', ['jshint', 'concat', 'uglify', 'cssmin', 'scriptlinker:prod', 'imagemin']);
    grunt.registerTask('Robot', ['mkdir', 'file-creator', 'string-replace']);

    // ===========================================================================
    // LOAD GRUNT PLUGINS ========================================================
    // ===========================================================================
    // we can only load these if they are in our package.json
    // make sure you have run npm install so our app can find these
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-dev-prod-switch');
    grunt.loadNpmTasks('grunt-scriptlinker');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-mkdir');
    grunt.loadNpmTasks('grunt-file-creator');
    grunt.loadNpmTasks('grunt-string-replace');

};