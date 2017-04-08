module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    fullname:  	 DataTypes.STRING,
    email: 	     DataTypes.STRING,
    avatar:      DataTypes.INTEGER,
    username:    DataTypes.STRING,
    credentials: DataTypes.STRING,
    validated:   DataTypes.BOOLEAN,
	Scores:      DataTypes.INTEGER
  });
  return User;
};

