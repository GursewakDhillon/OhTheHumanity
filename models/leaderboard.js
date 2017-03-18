"use strict";

module.exports = function(sequelize, DataTypes) {
  var Leaderboard = sequelize.define("Leaderboard", {
    points: 	    DataTypes.INTEGER,
    rankdate:       DataTypes.DATE
  }, {
      classMethods: {
      associate: function(models) {
        Leaderboard.hasOne(models.User)
      }
    }
  });
  return Leaderboard;
};