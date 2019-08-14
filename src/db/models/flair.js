'use strict';
module.exports = (sequelize, DataTypes) => {
  var Flair = sequelize.define('Flair', {
    title: DataTypes.STRING,
    body: DataTypes.STRING,
    postId: DataTypes.INTEGER
  }, {});
  Flair.associate = function(models) {
    // associations can be defined here
  };
  return Flair;
};