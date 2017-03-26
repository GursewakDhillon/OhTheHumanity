"use strict";

module.exports = function(sequelize, DataTypes) {
  var Session = sequelize.define("session", {
    id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	sessionKey: {
            type: DataTypes.STRING,
            field: 'sessionKey'
        
	}, 
  sessionUser: {
            type: DataTypes.STRING,
            field: 'sessionUser'
        }
  },{
    classMethods: {
      associate: function(models) {
       Session.belongsTo(models.User, {
          onDelete: "CASCADE",
		  //foreignKey: 'sessionUser'
		  });
		
      }
    }
  });

  return Session;
};