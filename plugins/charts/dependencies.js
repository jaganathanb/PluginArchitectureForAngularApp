var modules = [],
    glob = require("glob"),
    _ = require("lodash"),
    fs = require("fs");

var fileNames = glob.sync('./**/modules.json', {});
for (var index = 0; index < fileNames.length; index++) {
    var moduleContent = fs.readFileSync(fileNames[index], 'utf-8');
    if (moduleContent) {
        var json = JSON.parse(moduleContent);
        if (json) {
            modules.push(json);
        }
    } else {
        console.log(fileNames[index] + ' file is empty!');
    }
}
modules = _.flatten(modules); // flattening the dependencies
var deps = [];
for (var index = 0; index < modules.length; index++) {
    deps = deps.concat(modules[index].dependencies);
}

module.exports = _.compact(_.uniq(deps));
