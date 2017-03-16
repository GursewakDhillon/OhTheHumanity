var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({   // to support URL-encoded bodies
    extended: true
}));

app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, '/views/home.html'));
});

app.listen(3000, function () {
	console.log('Listening on port 3000!');
});