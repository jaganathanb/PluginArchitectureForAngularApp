var modules = [],
  glob = require("glob"),
  _ = require("lodash"),
  fs = require("fs");

var fileNames = glob.sync('./shell/**/modules.json', {});

for (var index = 0; index < fileNames.length; index++) {
  var moduleContent = fs.readFileSync(fileNames[index], 'utf-8');
  if (moduleContent) {
    var json = JSON.parse(moduleContent);
    if (json) {
      modules.push(json);
    }
  }
}

modules = _.flatten(modules);

var deps = [];
for (var i = 0; i < modules.length; i++) {
  deps = deps.concat(modules[i].dependencies);
}

module.exports = _.compact(_.uniq(deps));
