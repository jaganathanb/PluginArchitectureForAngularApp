
var express = require("express");
var app = express();

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

/* serves main page */
app.get("/", function (req, res) {
	res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.sendFile(__dirname + '/dist/index.html')
});

/* serves all the static files */
app.get(/(.+)$/, function (req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Credentials', true);
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');

	console.log('static file request : ' + req.params);
	if (req.url.indexOf('.js') > -1) {
		res.sendFile(__dirname + '/dist/' + req.params[0]);
	} else {
		res.status(200).send(getData(req.url));
	}
});

app.post('/api/core/login', function (req, res) {
	var params = {username: req.body.username, password: req.body.password };
	res.status(200).send(getData(req.url, params));
})

function getData(url, params) {
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
			data = JSON.parse(require('fs').readFileSync("./shell/modules.json"));
			break;
		case '/api/core/login':
			data = {
				success: params.username === 'test' && params.password === 'test',
				message: '',
				locales: { 'en': 'English', 'ta': 'தமிழ்', 'kn': 'ಕನ್ನಡ', 'zh': '中文', 'de': 'Deutsche' },
				preferredLocale: 'en'
			};
			break;
		default:
			break;
	}
	return data;
}

var port = 4321;
app.listen(port, function () {
	console.log("Listening on " + port);
});
