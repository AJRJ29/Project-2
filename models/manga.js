'use strict';
module.exports = (sequelize, DataTypes) => {
  const manga = sequelize.define('manga', {
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  manga.associate = function(models) {
     models.manga.belongsTo(models.user)
    //  models.manga.belongsToMany(models.user, {through: 'users_manga'})
    //  models.manga.hasMany(models.comment)
    // associations can be defined here
  };
  return manga;
};