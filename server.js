var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var https = require('https');
var fs = require('fs');
var crypto = require('crypto');
var models = require('./models');
var app = express();
var session= require('express-session');
var pug = require('pug');
//var firebase = require('firebase');


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
  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/css');
  response.setHeader("Cache-Control","max-age=1800");
  response.sendFile(__dirname + '/style.css');
});

app.get('/login.css', function(request, response) {
  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/css');
  response.setHeader("Cache-Control","max-age=1800");
  response.sendFile(__dirname + '/login.css');
});

app.get('/regi.css', function(request, response) {
  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/css');
  response.setHeader("Cache-Control","max-age=1800");
  response.sendFile(__dirname + '/regi.css');
});

app.get('/intro.jpg', function(request, response) {
  response.statusCode = 200;
  response.setHeader('Content-Type', 'img/png');
  response.setHeader("Cache-Control","max-age=1800");
  response.sendFile(__dirname + '/intro.jpg');
});



app.get('/signup', function(request, response) {
  response.sendFile(path.join(__dirname, './views/registration.html'));
});

app.get('/validation.js', function(request, response) {
  response.writeHead(200, {'Content-type' : 'application/javascript'});
     
    var fileContents = fs.readFileSync('./views/validation.js', {encoding: 'utf8'});
    response.write(fileContents);
  response.end();
  
});

app.get('/login.js', function(request, response) {
  response.writeHead(200, {'Content-type' : 'application/javascript'});
     
    var fileContents = fs.readFileSync('./views/login.js', {encoding: 'utf8'});
    response.write(fileContents);
  response.end();
  
});


app.get('/recaptcha.js', function(request, response) {
  response.writeHead(200, {'Content-type' : 'application/javascript'});

    var fileContents = fs.readFileSync('./views/recaptcha.js', {encoding: 'utf8'});
    response.write(fileContents);
  response.end();
  
});

app.get('/logout.js', function(request, response) {
  response.writeHead(200, {'Content-type' : 'application/javascript'});
     
    var fileContents = fs.readFileSync('./views/logout.js', {encoding: 'utf8'});
    response.write(fileContents);
  response.end();
  
});

app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, '/views/login.html'));
});

app.post('/', function(request, response) {
  
    var loginemail = request.body.email;
    //var password = request.body.password;
    console.log("post received: %s", loginemail);
    
    models.User.findOne({
                where: {
                    email: loginemail,                    
                }
            }).then(function(login) {
              if(login !== null)
               {
                    //bcrypt.compare(password, login.credentials, function(err, res) {
                    //    if (res) {
                            
                            var token=generateToken();
                                              
                            models.session.create({
                                
                                sessionKey: token,
                                sessionUser: login.id,
                                
                            });
                            
                            request.session.user=login.id;
                            response.set('Set-Cookie',token);
                            response.redirect('/home'); 
                            console.log("Successfully logged into the website!");

                     //   } else {
                     //       console.log("The user credential do not match!");
                     //       response.redirect('/');
                            
                     //   }
                     //});
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

  var userSession =req.session.user;
  //console.log(userSession);
 if (req.session.user)
    {
        return next();
    }else {
			return res.sendStatus(401);
     }
  
   
};


app.get('/home', checkAuth,function(request, response) {
  response.sendFile(path.join(__dirname, '/views/home.html'));
});
app.get('/classic', checkAuth,function(request, response) {
  response.sendFile(path.join(__dirname, '/views/classicMode.html'));
});
app.get('/time', checkAuth,function(request, response) {
  response.sendFile(path.join(__dirname, '/views/timeMode.html'));
});

app.get('/leaderboards', checkAuth,function(request, response) {
  response.sendFile(path.join(__dirname, '/views/leaderboards.html'));
});

app.get('/profile', checkAuth,function(req, response) {
  console.log(req.session.user);

  models.User.findOne({
                where: {
                    id: req.session.user                    
                }
  }).then(function(login) {
    if(login !== null)
      {
        response.render(path.join(__dirname, '/views/profile.pug'), 
          { 
            username: login.username,
            avatar: login.avatar,
            email: login.email
            });
      }
  });
});

app.post('/recaptcha', checkAuth,function(request, response) {
	console.log(request.body["g-recaptcha-response"]);
	response.end();
        // verifyRecaptcha(request.body["g-recaptcha-response"], function(success) {
                // if (success) {
                        // response.end("Success!");
                // } else {
                        // response.end("Captcha failed, sorry.");
                // }
        // });
});

app.post('/classic', checkAuth,function(request, response) {
	console.log(request.body["g-recaptcha-response"]);
	
        verifyRecaptcha(request.body["g-recaptcha-response"], function(success) {
                if (success) {
                        response.redirect('/classic');
                } else {
                        response.end("Captcha failed, sorry.");
                }
        });
});



// registration endpoint
app.post('/registration', function (req, res) {
  
  //bcrypt.hash(req.body.password, 10, function(err, hash)  {

      models.User.create({
        email:       req.body.email,
        avatar:      req.body.avatar,
        username:    req.body.username,
        validated:   1


      }).then(function(user_register) {

        res.redirect('/');    

      });

  //});
 
});

// Logout endpoint
app.get('/logout', function (req, res) {
  console.log(req);
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

app.get('/test', checkAuth,function(request, response) {
  response.sendFile(path.join(__dirname, '/views/test_login.html'));
});