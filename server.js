var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var https = require('https');
var fs = require('fs');
var crypto = require('crypto');
var models = require('./models');
var app = express();
var session= require('express-session');
const bcrypt = require('bcrypt');


app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({   // to support URL-encoded bodies
    extended: true
}));

app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
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
    var password = request.body.password;
    console.log("post received: %s %s", user_name, password);
    
    models.User.findOne({
                where: {
                    username: user_name,                    
                }
            }).then(function(login) {
              if(login !== null)
               {
                    bcrypt.compare(password, login.credentials, function(err, res) {
                        if (res) {
                            
                            var token=generateToken();
                                              
                            models.session.create({
                                
                                sessionKey: token,
                                sessionUser: login.id,
                                
                            });
                            
                            request.session.userSession=token;
                            response.set('Set-Cookie',token);
                            response.redirect('/home'); 
                            console.log("Successfully logged into the website!");

                        } else {
                            console.log("The user credential do not match!");
                            response.redirect('/');
                            
                        }
                     });
               }
               else
               {
                        console.log("The user credential do not match!");
                        response.redirect('/');

               }
               
             
                
         });

});

// Authentication and Authorization Middleware
function checkAuth(req, res, next) {

  var userSession =req.session.userSession;
  models.session.findOne({
                where: {
                    sessionKey: userSession,
                }
            }).then(function(user_auth) {

              if (req.session && req.session.userSession === user_auth.sessionKey)
              {
                  return next();
              }else {

                  return res.sendStatus(401);

                }

            });
  
   
};


app.get('/home', checkAuth,function(request, response) {
  response.sendFile(path.join(__dirname, '/views/home.html'));
});

app.get('/leaderboards', checkAuth,function(request, response) {
  response.sendFile(path.join(__dirname, '/views/leaderboards.html'));
});

app.post('/recaptcha', checkAuth,function(request, response) {
        verifyRecaptcha(request.body["g-recaptcha-response"], function(success) {
                if (success) {
                        response.end("Success!");
                } else {
                        response.end("Captcha failed, sorry.");
                }
        });
});


// Logout endpoint
app.get('/logout', function (req, res) {
  //console.log(req);
  req.session.destroy();
  res.redirect('/');
 
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