/* global process */
/* global __dirname */

var express = require("express");
var app = express(),
	path = require('path');

/* serves main page */
app.get("/", function (req, res) {
	res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.sendFile(path.resolve('dist/index.html'));
});

/* serves all the static files */
app.get(/(.+)$/, function (req, res) {
	res.setHeader('Access-Control-Allow-Origin','*');
	res.setHeader('Access-Control-Allow-Credentials', true);
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');

	console.log('static file request : ' + req.params);
	if (req.url.indexOf('.js') > -1) {
		res.sendFile(path.resolve('dist/' + req.params[0]));
	} else {
		res.status(200).send(getData(req.url));
	}
});

function getData(url) {
	var data = {};
	switch (url) {
		case '/api/home/usage':
			data = {
				usage: {
					details: [1, 2, 3]
				}
			};
			break;
		case '/api/core/modules':
			data = JSON.parse(require('fs').readFileSync("./charts/modules.json"));
			break;
		default:
			break;
	}
	return data;
}

var minimist = require('minimist');
var connect = require('connect');
var serveStatic = require('serve-static');


// var PORT = 8080;
// var TARGET_PATH_MAPPING = {
//     BUILD: './build',
//     DIST: './dist'
// };
//
// var TARGET = minimist(process.argv.slice(2)).TARGET || 'BUILD';
//
// connect()
//     .use(serveStatic(TARGET_PATH_MAPPING[TARGET]))
//     .listen(PORT);
//
// console.log('Created server for: ' + TARGET + ', listening on port ' + PORT);

var port = process.env.PORT || 1234;
app.listen(port, function () {
	console.log("Listening on " + port);
});
