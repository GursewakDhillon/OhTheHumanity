var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var https = require('https');

var app = express();
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({   // to support URL-encoded bodies
    extended: true
}));

app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, '/views/home.html'));
});

app.get('/leaderboards', function(request, response) {
  response.sendFile(path.join(__dirname, '/views/leaderboards.html'));
});

app.post('/recaptcha', function(request, response) {
        verifyRecaptcha(request.body["g-recaptcha-response"], function(success) {
                if (success) {
                        response.end("Success!");
                } else {
                        response.end("Captcha failed, sorry.");
                }
        });
});

app.listen(3000, function () {
	console.log('Listening on port 3000!');
});

var SECRET = "6LeuJxkUAAAAACoFh9JpxUULsuERs1OPvcdrlWRl";

// Helper function to make API call to recatpcha and check response
function verifyRecaptcha(key, callback) {
        https.get("https://www.google.com/recaptcha/api/siteverify?secret=" + SECRET + "&response=" + key, function(res) {
                var data = "";
                res.on('data', function (chunk) {
                        data += chunk.toString();
                });
                res.on('end', function() {
                        try {
                                var parsedData = JSON.parse(data);
                                callback(parsedData.success);
                        } catch (e) {
                                callback(false);
                        }
                });
        });
}