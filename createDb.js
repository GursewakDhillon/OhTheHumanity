var fs = require('fs');
var models = require('./models');
const bcrypt = require('bcrypt');

models.sequelize.sync().then(function() {
    console.log('Database models initialized');
    fs.readFile(__dirname + '/testdata/users.json', function(err, data) {
        var user_data = JSON.parse(data);
        var users = user_data.users;

        users.forEach(function(user) {
            console.log(user);
            bcrypt.hash(user.credentials, 10, function(err, hash) {
              
            
            models.User.create( {  fullname: user.fullname, 
                            id: user.id,
                            email: user.email, 
                            avatar: user.avatar, 
                            username: user.username, 
                            credentials: hash, 
                            validated: user.validated });
           
        });

        });            
           
           
        
        fs.readFile(__dirname + '/testdata/leaderboards.json', function(err, data) {
            var leaderboard_data = JSON.parse(data);
            var leaderboards = leaderboard_data.leaderboards;
            for (var i = 0; i < leaderboards.length; i++) {
                var leaderboard = leaderboards[i];
                models.Leaderboard.create( {  points: leaderboard.points,
                                              user: leaderboard.user,
                                              rankdate:  leaderboard.rankdate });            
            }
        });
    });
});
