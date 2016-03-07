#!/usr/bin/env node

var https = require('https');
var fs = require('fs');

var options = {
	https: true,
	key: fs.readFileSync('./test-key.pem'),
	cert: fs.readFileSync('./test-csr.pem')
};

https.createServer(options, function (req, res){
	res.writeHead(200, {"Content-Type": "text/html"});
	var html = fs.readFileSync('./https.html');
	res.end(html);
}).listen(8000);