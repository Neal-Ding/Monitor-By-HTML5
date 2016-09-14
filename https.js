#!/usr/bin/env node

var https = require('https');
var fs = require('fs');

var options = {
	https: true,
	key: fs.readFileSync('./test-key.pem'),
	cert: fs.readFileSync('./test-csr.pem')
};

https.createServer(options, function (req, res){
	console.log(req.url)

	if (req.url.indexOf("png") > -1) {
		res.writeHead(200, {
			"Content-Type": "image/png",
			'Access-Control-Allow-Origin': '*',
			'Set-Cookie': 'SSID=Ap4GTEq; Expires=Wed, 13-Jan-2021 22:23:01 GMT;'
		});

		var src = fs.readFileSync("." + req.url);
		res.end(src);
	}
	else {
		res.writeHead(200, {
			"Content-Type": "text/html",
			'Access-Control-Allow-Origin': '*',
			'Set-Cookie': 'SSID=Ap4GTEq; Expires=Wed, 13-Jan-2021 22:23:01 GMT;'
		});
		var html = fs.readFileSync('./spdy_test.html');
		res.end(html);
	}

}).listen(8000);