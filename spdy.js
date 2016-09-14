var spdy = require('spdy'),
    fs = require('fs');

var options = {
  // Private key
  key: fs.readFileSync(__dirname + '/keys/test-key.pem'),

  // Fullchain file or cert file (prefer the former)
  cert: fs.readFileSync(__dirname + '/keys/test-csr.pem'),

  // **optional** SPDY-specific options
  spdy: {
    protocols: [ 'h2', 'spdy/3.1', 'http/1.1' ],
    plain: false,

    // **optional**
    // Parse first incoming X_FORWARDED_FOR frame and put it to the
    // headers of every request.
    // NOTE: Use with care! This should not be used without some proxy that
    // will *always* send X_FORWARDED_FOR
    'x-forwarded-for': true,

    connection: {
      windowSize: 1024 * 1024, // Server's window size

      // **optional** if true - server will send 3.1 frames on 3.0 *plain* spdy
      autoSpdy31: false
    }
  }
};

var server = spdy.createServer(options, function(req, res) {
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
});

server.listen(3000);