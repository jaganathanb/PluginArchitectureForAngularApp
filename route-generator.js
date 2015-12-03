var fs = require('fs'),
  glob = require('glob'),
  routeStream = fs.createWriteStream('./app/routes.js'),
  modulesStream = fs.createWriteStream('./app/modules.json'),
  modules = [],
  content = '\'@ngInject\' \nlet Routes = function ($routeProvider, $provide) {' +
  '\n$routeProvider';

glob('./app/**/modules.json', {}, function(err, fileNames) {
    var obj = {};
  for (var index = 0; index < fileNames.length; index++) {
    var moduleContent = fs.readFileSync(fileNames[index], 'utf-8');
    if (moduleContent) {
        obj = getRoutesJSFile(JSON.parse(moduleContent));
        content += obj.jsFileContent;
        modules = modules.concat(obj.modules);
    }
  }

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
  console.log('route.js is generated..');
});

function getRoutesJSFile(json) {
  var jsFileContent = '',
      modules = [];

  for (var moduleIndex = 0; json.routes.length > moduleIndex; moduleIndex++) {
    var route = json.routes[moduleIndex],
      name = json.name.toLowerCase();

    if (!route.isDev) {
        modules.push(json);
      jsFileContent += '\n.when(\'' + route.url + '\',\n' +
        '{ template: require(\'./' + name + '/' + name + '.html\'),\n' +
        'controller: \'' + route.controller + '\',\n' +
        'controllerAs:\'' + route.controllerAs + '\',\n';

      if (route.lazyLoad) {
        jsFileContent += 'resolve:  { loadHomeModule: [\'$q\', \'authService\', \'moduleProvider\', \'$location\', function ($q, authService, moduleProvider, $location) {\n' +
          'var defered = $q.defer();\n ' +
          'if (' + !route.isPublic + ' || authService.hasAccessToRoute($location.path())) {\n ' +
          'require.ensure([], function () { \n' +
          'require(\'./' + name + '\');\n' +
          'moduleProvider.load({ name: \'' + json.namespace + '.' + json.name + '\', path: \'./' + name + '\' });\n' +
          'defered.resolve();\n' +
          '}, \'' + name + '\');\n' +
          ' } else { \n' +
          ' defered.reject(); \n' +
          ' $location.path(\'/unauthorized\'); ' +
          ' } \n' +
          ' return defered.promise; \n' +
          ' }] } \n';
      }

      jsFileContent += '})\n';

      if (route.isDefault) {
        jsFileContent += '.when(\'/\', { redirectTo: \'' + route.url + '\' })';
      }
    }
  }

  return {
      jsFileContent: jsFileContent,
      modules: modules
  };
}
