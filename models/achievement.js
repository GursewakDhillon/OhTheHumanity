"use strict";

module.exports = function(sequelize, DataTypes) {
  var Achievement = sequelize.define("Achievement", {
    name: 	        DataTypes.STRING,
    description:    DataTypes.STRING
  }, {
      classMethods: {
      associate: function(models) {
        Achievement.hasOne(models.User)
      }
    }
  });
  return Achievement;
};