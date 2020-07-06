'use strict';
module.exports = (sequelize, DataTypes) => {
  const users_anime = sequelize.define('users_anime', {
    userId: DataTypes.INTEGER,
    animeId: DataTypes.INTEGER
  }, {});
  users_anime.associate = function(models) {
    // associations can be defined here
  };
  return users_anime;
};