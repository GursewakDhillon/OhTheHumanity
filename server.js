var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var https = require('https');
var fs = require('fs');
var crypto = require('crypto');
var models = require('./models');
var app = express();
var session= require('express-session');

var server = require('http').Server(app);
var io = require('socket.io')(server);
var pug = require('pug');


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

app.get('/man.png', function(request, response) {
  response.writeHead(200, {'Content-type' : 'image/png'});
    var img = fs.readFileSync('./images/man.png');
    response.end(img, 'binary');
});
app.get('/guy.png', function(request, response) {
  response.writeHead(200, {'Content-type' : 'image/png'});
    var img = fs.readFileSync('./images/guy.png');
    response.end(img, 'binary');
});
app.get('/teacher.png', function(request, response) {
  response.writeHead(200, {'Content-type' : 'image/png'});
    var img = fs.readFileSync('./images/teacher.png');
    response.end(img, 'binary');
});
app.get('/woman.png', function(request, response) {
  response.writeHead(200, {'Content-type' : 'image/png'});
    var img = fs.readFileSync('./images/woman.png');
    response.end(img, 'binary');
});
app.get('/woman2.png', function(request, response) {
  response.writeHead(200, {'Content-type' : 'image/png'});
    var img = fs.readFileSync('./images/woman2.png');
    response.end(img, 'binary');
});
app.get('/woman3.png', function(request, response) {
  response.writeHead(200, {'Content-type' : 'image/png'});
    var img = fs.readFileSync('./images/woman3.png');
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
io.on('connection', function(socket){
  socket.on('chat message', function(){
	  var reformat ={};
	  var userformat=[];
	   models.User.findAll({attributes: ['username','Scores']
            }).then(function(user) {
				
				//var u_scores = JSON.stringify(user);
				reformat.userformat = user.map(function(obj){
					var rObj = {};
					rObj["username"]=obj.username;
					rObj["Scores"]=obj.Scores;
					return rObj;
				});
				//console.log(reformat);
				var removeNull=JSON.stringify(reformat, function(key, value) {
					// if value is null, return "" as a replacement
					if(value === null) {
						return 0;
					}

					// otherwise, leave the value unchanged
					return value;
				});
				
				
				function predicateBy(prop){
				   return function(a,b){
					  if( a[prop] < b[prop]){
						  return 1;
					  }else if( a[prop] > b[prop] ){
						  return -1;
					  }
					  return 0;
				   }
				}
				
				var sortScores =JSON.parse(removeNull);
				sortScores.userformat.sort( predicateBy("Scores") );
							
				
				
				console.log(sortScores);
				
				for (var i = 0; i < sortScores.userformat.length; i++)
				{
					var empty=" has a score of: ";
					var nameQuotation=JSON.stringify(sortScores.userformat[i].username);
					var name=nameQuotation.replace(/['"]+/g, '')
					var scores=JSON.stringify(sortScores.userformat[i].Scores);
					var message=name+empty+scores;
					//console.log(message);
					io.emit('chat message', message);	
					
							
				}
				
				
			});
				
    
	
  });
  
});

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

function addScore(request,num){
								models.User.findOne({
									where: {
										id: request.session.user                    
									}
					  }).then(function(user) {
						if(user !== null)
						  {
							user.increment('Scores', {by: num});
						  }
					  });
}

app.post('/classic', checkAuth,function(request, response) {
	console.log(request.body);
	
        verifyRecaptcha(request.body["g-recaptcha-response"], function(success) {
                if (success) {
									addScore(request,5);
                    response.redirect('/classic');
                } else {
                        response.end("Captcha failed, sorry.");
                }
        });
});

app.post('/time', checkAuth,function(request, response) {
	console.log(request.body);
	var score = request.body["finalScore"];
        verifyRecaptcha(request.body["g-recaptcha-response"], function(success) {
                if (success) {
									addScore(request,score);
                    response.redirect('/time');
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

server.listen(3000, function () {
      console.log('Example app listening on port 3000!');
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
