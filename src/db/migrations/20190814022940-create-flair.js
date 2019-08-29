'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Flairs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      color: {
        allowNull: false,
        type: Sequelize.STRING
      },
      postId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE", // delete post if parent topic is deleted
        allowNull: false,    // validation to prevent null value
        references: {        // association information
          model: "Posts",   // table name
          key: "id",         // attribute to use
          as: "postId"      // reference as topicId
        },
      }
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false, 
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Flairs');
  }
};