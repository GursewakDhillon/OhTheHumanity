
var models = require('./models');

models.sequelize.sync().then(function() {
    console.log('Database models initialized');
});