'use strict';

var gulp = require('gulp');

// load plugins
var webpackCore = require('webpack'),
    webpack = require('gulp-webpack'),
    sourceMaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    babel = require('gulp-babel'),
    inject = require('gulp-inject'),
    replace = require('gulp-replace'),
    gutil = require('gulp-util'),
    file = require('gulp-file'),
    wpConfig = require('./webpack.config.js');

// this tells gulp to take the index.js file and send it to Webpack along with the config and put the resulting files in dist/
gulp.task("build", ['copyIndex', 'routes'], function (cb) {
    gulp.src('./app/core.js')
        .pipe(webpack(wpConfig, webpackCore))
        .pipe(gulp.dest('dist/'));
    cb();
});

gulp.task("compile", function() {
    return gulp.src(['./app/**/*.js'])
                .pipe(babel())
                .pipe(gulp.dest('build/'))
});

gulp.task("copyIndex", function (cb) {
    return gulp.src(['index.html'])
        .pipe(gulp.dest('dist/'));
        cb();
});

gulp.task("default", ['build'], function (cb) {
    return gulp.src(['index.html'])
        .pipe(gulp.dest('dist/'));
        cb();
});


gulp.task("watch", function (cb) {
    return gulp.watch('*', ['default']);
});

gulp.task('routes', function(){
  var fs = require('fs'),
    stream = fs.createWriteStream('./app/core/routes.js');
    
    stream.write(getRoutesJSFile(require('./app/modules.json')));  
    stream.end();
    stream.close();
});

function getRoutesJSFile(json) {
    var jsFileContent = '\'@ngInject\' \nlet Routes = function ($routeProvider, $provide) {' +
                        '\n$routeProvider';
                        
    for (var moduleIndex = 0; json[moduleIndex]; moduleIndex++) {
        var config = json[moduleIndex];
        jsFileContent += '\n.when(\'' + config.url + '\',\n' +
                                '{ template: require(\'' + config.templateUrl + '\'),\n' +
                                   'controller: \'' + config.controller + '\',\n' +
                                   'controllerAs:\'' + config.controllerAs + '\',\n' +
                                   'resolve:  { loadHomeModule: [\'$q\', \'authService\', \'moduleProvider\', \'$location\', function ($q, authService, moduleProvider, $location) {\n' +
                                                'var defered = $q.defer();\n ' +
                                                    'if (' + !!config.isPublicRoute + ' || authService.hasAccessToRoute($location.path())) {\n ' +
                                                        'require.ensure([], function () { \n' +
                                                            'require(\'' + config.path + '\');\n' +
                                                            'moduleProvider.load({ name: \'' + config.namespace + '.' + config.name + '\', path: \'' + config.path + '\' });\n' +
                                                        'defered.resolve();\n' +
                                                    '}, \'' + config.name.toLowerCase() + '\');\n' +
                                               ' } else { \n' +
                                                   ' defered.reject(); \n' +
                                                   ' $location.path(\'/unauthorized\'); '+
                                              ' } \n' +
                                              ' return defered.promise; \n' +
                                          ' }] } \n' +
			                     '})\n';
    }
    
    jsFileContent += '.otherwise({redirectTo: \'/unauthorized\'}); ' +
                        '\n\'@ngInject\'\n$provide.decorator("$exceptionHandler", function($delegate, $injector) { ' +
                                        'return function(exception, cause) { ' +
                                        '/*$delegate(exception, cause);*/' +
                                            '$injector.get(\'toaster\').pop({ type: \'error\', title: exception.name, body: exception.message, showCloseButton: true}); };' +
                                    '});' +
                                    '};' +
                                    'Routes.$inject = [\'$routeProvider\', \'$provide\'];' +
                                    'export default Routes; ';
    
    return jsFileContent;
}


