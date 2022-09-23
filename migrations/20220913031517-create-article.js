'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('articles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      topic_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      subtitle: {
        type: Sequelize.STRING
      },
      article: {
        type: Sequelize.TEXT
      },
      image: {
        type: Sequelize.STRING
      },
      status:{
        type: Sequelize.STRING
      },
      slug:{
        type: Sequelize.STRING
      },
      total_likes:{
        type: Sequelize.INTEGER
      },
      total_views:{
        type: Sequelize.INTEGER
      },
      total_whistlists:{
        type: Sequelize.INTEGER
      },
      total_comments:{
        type: Sequelize.INTEGER
      },
      reading_time:{
        type: Sequelize.INTEGER
      },
      created_at: {
        type: Sequelize.DATE
      },
      updated_at: {
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('articles');
  }
};