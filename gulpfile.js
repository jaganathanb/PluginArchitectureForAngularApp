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
    wpConfig = require('./webpack.config.js'),
    glob = require('glob');

// this tells gulp to take the index.js file and send it to Webpack along with the config and put the resulting files in dist/
gulp.task("build", ['copyIndex', 'routes'], function (cb) {
    gulp.src('./app/core.js')
        .pipe(webpack(wpConfig, webpackCore))
        .pipe(gulp.dest('dist/'));
    cb();
});

gulp.task("compile", function () {
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

gulp.task('routes', function (cb) {
    var fs = require('fs'),
        routeStream = fs.createWriteStream('./app/routes.js'),
        modulesStream = fs.createWriteStream('./app/modules.json'),
        modules = [],
        dependencies = [],
        _ = require('lodash'),
        content = '\'@ngInject\' \nlet Routes = function ($routeProvider, $provide) {' +
            '\n$routeProvider';

    glob('./app/**/modules.json', {}, function (err, fileNames) {
        for (var index = 0; index < fileNames.length; index++) {
            var moduleContent = fs.readFileSync(fileNames[index], 'utf-8'),
                obj = null;
            if (moduleContent) {
                obj= getRoutesJSFile(JSON.parse(moduleContent));
                content += obj.jsFileContent;
                modules= modules.concat(obj.modules);
                dependencies = dependencies.concat(getDependencies(obj.modules))
            }
        }
        
        wpConfig['entry']['vendor'] = _.compact(_.uniq(dependencies));

        content += '.otherwise({redirectTo: \'/unauthorized\'}); ' +
            '\n\'@ngInject\'\n$provide.decorator("$exceptionHandler", function($delegate, $injector) { ' +
            'return function(exception, cause) { ' +
            '/*$delegate(exception, cause);*/' +
            '$injector.get(\'toaster\').pop({ type: \'error\', title: exception.name, body: exception.message, showCloseButton: true}); };' +
            '});' +
            '};' +
            'Routes.$inject = [\'$routeProvider\', \'$provide\'];' +
            'export default Routes; ';

        routeStream.write(content);
        routeStream.end();
        routeStream.close();
        modulesStream.write(JSON.stringify(modules));
        modulesStream.end();
        modulesStream.close();
        cb();
    });

});

function getDependencies(moduels) {
    var deps = [];
    for (var index = 0; index < moduels.length; index++) {
       deps =  deps.concat(moduels[index].dependencies);
    }
    return deps;
}

function getRoutesJSFile(json) {
    var jsFileContent = '',
        modules = [];
    
    for (var moduleIndex = 0; json.length > moduleIndex; moduleIndex++) {
        var config = json[moduleIndex],
            name = config.name.toLowerCase();
            
        if(!config.isDev) {
            modules.push(config);
            jsFileContent += '\n.when(\'' + config.url + '\',\n' +
                '{ template: require(\'' + name + '/' + name + '.html\'),\n' +
                'controller: \'' + config.controller + '\',\n' +
                'controllerAs:\'' + config.controllerAs + '\',\n' +
                'resolve:  { loadHomeModule: [\'$q\', \'authService\', \'moduleProvider\', \'$location\', function ($q, authService, moduleProvider, $location) {\n' +
                'var defered = $q.defer();\n ' +
                'if (' + !!config.isPublicRoute + ' || authService.hasAccessToRoute($location.path())) {\n ' +
                'require.ensure([], function () { \n' +
                'require(\'' + name + '\');\n' +
                'moduleProvider.load({ name: \'' + config.namespace + '.' + config.name + '\', path: \'' + name + '\' });\n' +
                'defered.resolve();\n' +
                '}, \'' + name + '\');\n' +
                ' } else { \n' +
                ' defered.reject(); \n' +
                ' $location.path(\'/unauthorized\'); ' +
                ' } \n' +
                ' return defered.promise; \n' +
                ' }] } \n' +
                '})\n';
        }
    }

    return {
        jsFileContent: jsFileContent,
        modules: modules
    };
}


