'use strict';
const { faker } =  require("@faker-js/faker")
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('topics', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      topic: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      created_at: {
        type: Sequelize.DATE
      },
      updated_at: {
        type: Sequelize.DATE
      }
    });
    const item = fakeTopic(50);
    await queryInterface.bulkInsert("topics" , item , {})
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('topics');
  }
};

function fakeTopic(count){
  const data = [];
  for (let i = 0; i < count; i++) {
    const rowItem = {
        topic : faker.word.adjective(20),
        status : 'active',
        created_at        : faker.date.between(),
        updated_at        : faker.date.between()
    }
    data.push(rowItem)
  }
  return data;
}