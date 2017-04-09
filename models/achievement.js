module.exports = function(sequelize, DataTypes) {
  var Achievement = sequelize.define("Achievement", {
    name: 	        DataTypes.STRING,
    description:    DataTypes.STRING
  }, {
      classMethods: {
      associate: function(models) {
        Achievement.belongsToMany(models.User, {through: 'UserAchievement'});
      }
    }
  });
  return Achievement;
};