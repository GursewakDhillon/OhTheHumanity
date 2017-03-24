var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var https = require('https');
var fs = require('fs');
var crypto = require('crypto');
var models = require('./models');
var app = express();
const bcrypt = require('bcrypt');


app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({   // to support URL-encoded bodies
    extended: true
}));

var generateToken = function() {
     var sha = crypto.createHash('sha256');
    sha.update(Math.random().toString());
    return sha.digest('hex');
};


app.get('/images/user_photo.png', function(request, response) {
  response.writeHead(200, {'Content-type' : 'image/gif'});
    var img = fs.readFileSync('./images/user_photo.png');
    response.end(img, 'binary');
});

app.get('/style.css', function(request, response) {
  response.writeHead(200, {'Content-type' : 'text/css'});
    var fileContents = fs.readFileSync('./stylesheets/style.css', {encoding: 'utf8'});
    response.write(fileContents);
    response.end();
});


app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, '/views/login.html'));
});

app.post('/', function(request, response) {
  
    var user_name = request.body.username;
    var password = request.body.credential;
    console.log("post received: %s %s", user_name, password);
    //bcrypt.compare(password, hash, function(err, res) {
     models.User.findOne({
                where: {
                    username: user_name,
                    
                }
            }).then(function(login) {
                console.log("Your are successfully login");
               response.redirect('/home');   
                
            });

});

app.get('/home', function(request, response) {
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