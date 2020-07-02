'use strict';
module.exports = (sequelize, DataTypes) => {
  const anime = sequelize.define('anime', {
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  anime.associate = function(models) {
    models.anime.belongsTo(models.user)
    models.anime.hasMany(models.comment)
    // associations can be defined here
  };
  return anime;
};