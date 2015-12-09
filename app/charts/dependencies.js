var modules = [],
  glob = require("glob"),
  _ = require("lodash"),
  fs = require("fs"),
  base = './',
  appName = 'charts';

var fileNames = glob.sync(base + '/**/modules.json', {});

for (var index = 0; index < fileNames.length; index++) {
  var moduleContent = fs.readFileSync(fileNames[index], 'utf-8');
  if (moduleContent) {
    var json = JSON.parse(moduleContent);
    if (json) {
      modules.push(json);
    }
  }
}

var deps = [];
for (var index = 0; index < modules.length; index++) {
  deps = deps.concat(modules[index].dependencies);
}

module.exports = _.compact(_.uniq(deps));
