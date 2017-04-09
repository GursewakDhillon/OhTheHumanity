module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    email: 	     DataTypes.STRING,
    avatar:      DataTypes.INTEGER,
    username:    DataTypes.STRING,
    credentials: DataTypes.STRING,
    validated:   DataTypes.BOOLEAN,
	Scores:      DataTypes.INTEGER

  }, {
    classMethods: {
      associate: function(models) {
        User.belongsToMany(models.Achievement, {through: 'UserAchievement'});
      }
    }

  });
  return User;
};

