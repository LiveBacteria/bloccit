'use strict';
module.exports = (sequelize, DataTypes) => {
    var Flair = sequelize.define('Flair', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false
        },
        postId: {
            allowNull: false,
            type: DataTypes.INTEGER
        }
    }, {});
    Flair.associate = function(models) {
        Flair.belongsTo(models.Post, {
            foreignKey: "postId",
            onDelete: "CASCADE"
        });
    };
    return Flair;
};