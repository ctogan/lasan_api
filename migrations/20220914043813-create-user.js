'use strict';
const {faker} = require('@faker-js/faker')
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid:{
        type: Sequelize.STRING
      },
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      avatar: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      is_verified: {
        type: Sequelize.BOOLEAN
      },
      gender: {
        type: Sequelize.STRING
      },
      slug: {
        type: Sequelize.STRING
      },
      occupation: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.STRING
      },
      token: {
        type: Sequelize.TEXT
      },
      created_at: {
        type: Sequelize.DATE
      },
      updated_at: {
        type: Sequelize.DATE
      }
    });

    const item = fakeUsers(200);
    await queryInterface.bulkInsert("users" , item , {})
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};


function fakeUsers(count){
  const data = [];
  for (let i = 0; i < count; i++) {
    let names =  faker.name.firstName();
    const rowItem = {
            uuid: uuidv4(),
            first_name: names,
            last_name: faker.name.lastName(),
            avatar: faker.image.abstract(480, 480),
            username: names,
            email: faker.internet.email(),
            password: bcrypt.hashSync('test', 8),
            phone: faker.phone.number(),
            is_verified:false,
            slug: names,
            gender: "Male",
            occupation:faker.company.bs(),
            created_at        : faker.date.between(),
            updated_at        : faker.date.between()
    }
    data.push(rowItem)
  }
  return data;
}
