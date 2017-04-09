var fs = require('fs');
var models = require('./models');

models.sequelize.sync().then(function() {
    console.log('Database models initialized');
    fs.readFile(__dirname + '/testdata/users.json', function(err, data) {
        var user_data = JSON.parse(data);
        var users = user_data.users;

        users.forEach(function(user) {
            //console.log(user);
            
            models.User.create( {  fullname: user.fullname, 
                            id: user.id,
                            email: user.email, 
                            avatar: user.avatar, 
                            username: user.username, 
                            validated: user.validated,
							Scores: user.scores});           
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
	
	fs.readFile(__dirname + '/testdata/achievements.json', function(err, data) {
        var achievement_data = JSON.parse(data);
        var achievements = achievement_data.achievements;
        for (var i = 0; i < achievements.length; i++) {
            var achievement = achievements[i];
            models.Achievement.create( {  name: achievement.name,
                                            description: achievement.description });            
        }
    });
});
